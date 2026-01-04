/**
 * Confirm dialog implementation
 */

import type { ConfirmOptions, ConfirmOptionsAdvanced, ConfirmButton } from '../types'
import {
  createDialogModal,
  createDialogElements,
  createTitleElement,
  createMessageElement,
  createButtonContainer,
  styleButton,
} from './base'

/**
 * Default confirm options
 */
const DEFAULT_OPTIONS: Required<Omit<ConfirmOptions, 'title'>> = {
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  closeOnOverlayClick: false,
  closeOnEscape: true,
}

/**
 * Show a confirm dialog
 */
export function confirm(message: string): Promise<boolean>
export function confirm(options: ConfirmOptions): Promise<boolean>
export function confirm(options: ConfirmOptionsAdvanced): Promise<string | boolean>
export function confirm(
  messageOrOptions: string | ConfirmOptions | ConfirmOptionsAdvanced
): Promise<boolean | string> {
  return new Promise((resolve) => {
    // Normalize options
    const options: ConfirmOptionsAdvanced =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions }
        : messageOrOptions

    const {
      title,
      message,
      confirmText = DEFAULT_OPTIONS.confirmText,
      cancelText = DEFAULT_OPTIONS.cancelText,
      variant = DEFAULT_OPTIONS.variant,
      closeOnOverlayClick = DEFAULT_OPTIONS.closeOnOverlayClick,
      closeOnEscape = DEFAULT_OPTIONS.closeOnEscape,
      buttons,
    } = options

    // Track if resolved
    let resolved = false

    // Create modal
    const modal = createDialogModal({
      closeOnOverlayClick,
      closeOnEscape,
      onClose: () => {
        if (!resolved) {
          resolved = true
          resolve(false)
        }
        cleanup()
      },
    })

    // Create elements
    const { portal, content } = createDialogElements(modal)

    // Add title if provided
    if (title) {
      content.appendChild(createTitleElement(title, modal))
    }

    // Add message
    content.appendChild(createMessageElement(message, modal))

    // Create button container
    const buttonContainer = createButtonContainer()

    // Determine buttons to show
    const buttonsToRender: ConfirmButton[] = buttons ?? [
      { text: cancelText, value: false, variant: 'default' },
      { text: confirmText, value: true, variant: variant === 'default' ? 'primary' : variant, autoFocus: true },
    ]

    // Create buttons
    let autoFocusButton: HTMLButtonElement | null = null

    buttonsToRender.forEach((btnConfig) => {
      const button = document.createElement('button')
      button.textContent = btnConfig.text
      button.type = 'button'
      styleButton(button, btnConfig.variant)

      button.addEventListener('click', () => {
        if (resolved) return // Prevent double resolution
        resolved = true
        modal.close() // Will trigger cleanup via onClose
        resolve(btnConfig.value)
      })

      if (btnConfig.autoFocus) {
        autoFocusButton = button
      }

      buttonContainer.appendChild(button)
    })

    content.appendChild(buttonContainer)

    // Cleanup function
    function cleanup(): void {
      modal.destroy()
      portal.remove()
    }

    // Mount and open
    document.body.appendChild(portal)
    modal.open()

    // Focus the auto-focus button
    if (autoFocusButton) {
      requestAnimationFrame(() => {
        autoFocusButton?.focus()
      })
    }
  })
}
