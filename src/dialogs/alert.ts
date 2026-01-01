/**
 * Alert dialog implementation
 */

import type { AlertOptions } from '../types'
import {
  createDialogModal,
  createDialogElements,
  createTitleElement,
  createMessageElement,
  createButtonContainer,
  styleButton,
  type DialogVariant,
} from './base'

/**
 * Default alert options
 */
const DEFAULT_OPTIONS: Required<Omit<AlertOptions, 'title'>> = {
  message: '',
  confirmText: 'OK',
  variant: 'default',
}

/**
 * Map alert variants to button variants
 */
function getButtonVariant(alertVariant: AlertOptions['variant']): DialogVariant {
  switch (alertVariant) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'error':
      return 'danger'
    case 'info':
      return 'info'
    default:
      return 'primary'
  }
}

/**
 * Show an alert dialog
 */
export function alert(message: string): Promise<void>
export function alert(options: AlertOptions): Promise<void>
export function alert(messageOrOptions: string | AlertOptions): Promise<void> {
  return new Promise((resolve) => {
    // Normalize options
    const options: AlertOptions =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions }
        : messageOrOptions

    const {
      title,
      message,
      confirmText = DEFAULT_OPTIONS.confirmText,
      variant = DEFAULT_OPTIONS.variant,
    } = options

    // Create modal
    const modal = createDialogModal({
      closeOnOverlayClick: false,
      closeOnEscape: true,
      onClose: () => {
        resolve()
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

    // Create confirm button
    const confirmButton = document.createElement('button')
    confirmButton.textContent = confirmText
    confirmButton.type = 'button'
    styleButton(confirmButton, getButtonVariant(variant))

    confirmButton.addEventListener('click', () => {
      modal.close()
    })

    buttonContainer.appendChild(confirmButton)
    content.appendChild(buttonContainer)

    // Cleanup function
    function cleanup(): void {
      modal.destroy()
      portal.remove()
    }

    // Mount and open
    document.body.appendChild(portal)
    modal.open()

    // Focus the confirm button
    requestAnimationFrame(() => {
      confirmButton.focus()
    })
  })
}
