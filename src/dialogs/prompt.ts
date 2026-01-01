/**
 * Prompt dialog implementation
 */

import type { PromptOptions } from '../types'
import {
  createDialogModal,
  createDialogElements,
  createTitleElement,
  createMessageElement,
  createButtonContainer,
  styleButton,
} from './base'

/**
 * Default prompt options
 */
const DEFAULT_OPTIONS: Required<
  Omit<PromptOptions, 'title' | 'message' | 'validate'>
> = {
  placeholder: '',
  defaultValue: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  type: 'text',
  required: false,
  minLength: 0,
  maxLength: Infinity,
}

/**
 * Show a prompt dialog
 */
export function prompt(message: string): Promise<string | null>
export function prompt(options: PromptOptions): Promise<string | null>
export function prompt(
  messageOrOptions: string | PromptOptions
): Promise<string | null> {
  return new Promise((resolve) => {
    // Normalize options
    const options: PromptOptions =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions }
        : messageOrOptions

    const {
      title,
      message,
      placeholder = DEFAULT_OPTIONS.placeholder,
      defaultValue = DEFAULT_OPTIONS.defaultValue,
      confirmText = DEFAULT_OPTIONS.confirmText,
      cancelText = DEFAULT_OPTIONS.cancelText,
      type = DEFAULT_OPTIONS.type,
      validate,
      required = DEFAULT_OPTIONS.required,
      minLength = DEFAULT_OPTIONS.minLength,
      maxLength = DEFAULT_OPTIONS.maxLength,
    } = options

    // Track if resolved
    let resolved = false

    // Create modal
    const modal = createDialogModal({
      closeOnOverlayClick: false,
      closeOnEscape: true,
      onClose: () => {
        if (!resolved) {
          resolved = true
          resolve(null)
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

    // Add message if provided
    if (message) {
      content.appendChild(createMessageElement(message, modal))
    }

    // Create input container
    const inputContainer = document.createElement('div')
    inputContainer.style.marginBottom = '16px'

    // Create input
    const input = document.createElement('input')
    input.type = type
    input.value = defaultValue
    if (placeholder) input.placeholder = placeholder
    if (required) input.required = true
    if (minLength > 0) input.minLength = minLength
    if (maxLength < Infinity) input.maxLength = maxLength

    input.style.width = '100%'
    input.style.padding = '8px 12px'
    input.style.border = '1px solid #d1d5db'
    input.style.borderRadius = '6px'
    input.style.fontSize = '14px'
    input.style.outline = 'none'
    input.style.boxSizing = 'border-box'

    input.addEventListener('focus', () => {
      input.style.borderColor = '#3b82f6'
      input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
    })

    input.addEventListener('blur', () => {
      input.style.borderColor = '#d1d5db'
      input.style.boxShadow = 'none'
    })

    // Create error message element
    const errorEl = document.createElement('p')
    errorEl.style.color = '#ef4444'
    errorEl.style.fontSize = '12px'
    errorEl.style.marginTop = '4px'
    errorEl.style.marginBottom = '0'
    errorEl.style.display = 'none'

    inputContainer.appendChild(input)
    inputContainer.appendChild(errorEl)
    content.appendChild(inputContainer)

    // Validation function
    function validateInput(): boolean | string {
      const value = input.value

      // Required check
      if (required && !value.trim()) {
        return 'This field is required'
      }

      // Min length check
      if (minLength > 0 && value.length < minLength) {
        return `Minimum ${minLength} characters required`
      }

      // Max length check
      if (maxLength < Infinity && value.length > maxLength) {
        return `Maximum ${maxLength} characters allowed`
      }

      // Custom validation
      if (validate) {
        return validate(value)
      }

      return true
    }

    function showError(message: string): void {
      errorEl.textContent = message
      errorEl.style.display = 'block'
      input.style.borderColor = '#ef4444'
    }

    function clearError(): void {
      errorEl.style.display = 'none'
      input.style.borderColor = '#d1d5db'
    }

    function handleSubmit(): void {
      clearError()
      const validationResult = validateInput()

      if (validationResult !== true) {
        const errorMessage =
          typeof validationResult === 'string'
            ? validationResult
            : 'Invalid input'
        showError(errorMessage)
        input.focus()
        return
      }

      resolved = true
      modal.close()
      resolve(input.value)
    }

    // Handle Enter key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    })

    // Clear error on input
    input.addEventListener('input', clearError)

    // Create button container
    const buttonContainer = createButtonContainer()

    // Cancel button
    const cancelButton = document.createElement('button')
    cancelButton.textContent = cancelText
    cancelButton.type = 'button'
    styleButton(cancelButton, 'default')

    cancelButton.addEventListener('click', () => {
      resolved = true
      modal.close()
      resolve(null)
    })

    // Confirm button
    const confirmButton = document.createElement('button')
    confirmButton.textContent = confirmText
    confirmButton.type = 'button'
    styleButton(confirmButton, 'primary')

    confirmButton.addEventListener('click', handleSubmit)

    buttonContainer.appendChild(cancelButton)
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

    // Focus the input
    requestAnimationFrame(() => {
      input.focus()
      // Select default value
      if (defaultValue) {
        input.select()
      }
    })
  })
}
