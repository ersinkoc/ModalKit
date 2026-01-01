/**
 * Base utilities for dialog implementations
 */

import { createModal } from '../core/modal'
import type { ModalConfig } from '../types'

/**
 * Dialog variant types
 */
export type DialogVariant =
  | 'default'
  | 'primary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'error'
  | 'info'

/**
 * Create dialog container elements
 */
export function createDialogElements(modal: ReturnType<typeof createModal>): {
  portal: HTMLDivElement
  overlay: HTMLDivElement
  container: HTMLDivElement
  content: HTMLDivElement
} {
  const portal = document.createElement('div')
  const portalProps = modal.getPortalProps()
  portal.setAttribute('data-modalkit-portal', portalProps['data-modalkit-portal'])
  portal.setAttribute('data-state', portalProps['data-state'])

  const overlay = document.createElement('div')
  const overlayProps = modal.getOverlayProps()
  overlay.setAttribute('data-modalkit-overlay', '')
  overlay.setAttribute('data-state', overlayProps['data-state'])
  Object.assign(overlay.style, overlayProps.style)
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  overlayProps.ref(overlay)

  const container = document.createElement('div')
  const containerProps = modal.getContainerProps()
  container.setAttribute('data-modalkit-container', '')
  container.setAttribute('data-state', containerProps['data-state'])
  Object.assign(container.style, containerProps.style)
  containerProps.ref(container)

  const content = document.createElement('div')
  const contentProps = modal.getContentProps()
  content.setAttribute('role', contentProps.role)
  content.setAttribute('aria-modal', 'true')
  if (contentProps['aria-labelledby']) {
    content.setAttribute('aria-labelledby', contentProps['aria-labelledby'])
  }
  if (contentProps['aria-describedby']) {
    content.setAttribute('aria-describedby', contentProps['aria-describedby'])
  }
  content.setAttribute('data-modalkit-content', '')
  content.setAttribute('data-state', contentProps['data-state'])
  content.setAttribute('tabindex', '-1')
  content.style.backgroundColor = 'white'
  content.style.borderRadius = '8px'
  content.style.padding = '24px'
  content.style.maxWidth = '400px'
  content.style.width = '100%'
  content.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  contentProps.ref(content)

  // Add keyboard handler
  content.addEventListener('keydown', (e) => {
    contentProps.onKeyDown(e)
  })

  // Assemble
  container.appendChild(content)
  overlay.appendChild(container)
  portal.appendChild(overlay)

  return { portal, overlay, container, content }
}

/**
 * Create a dialog modal with common configuration
 */
export function createDialogModal(
  customConfig?: Partial<ModalConfig>
): ReturnType<typeof createModal> {
  return createModal({
    closeOnOverlayClick: false,
    closeOnEscape: true,
    trapFocus: true,
    preventScroll: true,
    role: 'alertdialog',
    animated: false,
    ...customConfig,
  })
}

/**
 * Apply styles for a button
 */
export function styleButton(
  button: HTMLButtonElement,
  variant: DialogVariant = 'default'
): void {
  button.style.padding = '8px 16px'
  button.style.borderRadius = '6px'
  button.style.border = 'none'
  button.style.cursor = 'pointer'
  button.style.fontWeight = '500'
  button.style.fontSize = '14px'
  button.style.transition = 'background-color 0.2s'

  switch (variant) {
    case 'primary':
      button.style.backgroundColor = '#3b82f6'
      button.style.color = 'white'
      break
    case 'danger':
    case 'error':
      button.style.backgroundColor = '#ef4444'
      button.style.color = 'white'
      break
    case 'warning':
      button.style.backgroundColor = '#f59e0b'
      button.style.color = 'white'
      break
    case 'success':
      button.style.backgroundColor = '#10b981'
      button.style.color = 'white'
      break
    case 'info':
      button.style.backgroundColor = '#3b82f6'
      button.style.color = 'white'
      break
    default:
      button.style.backgroundColor = '#e5e7eb'
      button.style.color = '#374151'
  }
}

/**
 * Create dialog title element
 */
export function createTitleElement(
  title: string,
  modal: ReturnType<typeof createModal>
): HTMLHeadingElement {
  const titleProps = modal.getTitleProps()
  const titleEl = document.createElement('h2')
  titleEl.id = titleProps.id
  titleEl.setAttribute('data-modalkit-title', '')
  titleEl.textContent = title
  titleEl.style.margin = '0 0 8px 0'
  titleEl.style.fontSize = '18px'
  titleEl.style.fontWeight = '600'
  titleEl.style.color = '#111827'
  return titleEl
}

/**
 * Create dialog message element
 */
export function createMessageElement(
  message: string,
  modal: ReturnType<typeof createModal>
): HTMLParagraphElement {
  const descProps = modal.getDescriptionProps()
  const messageEl = document.createElement('p')
  messageEl.id = descProps.id
  messageEl.setAttribute('data-modalkit-description', '')
  messageEl.textContent = message
  messageEl.style.margin = '0 0 24px 0'
  messageEl.style.fontSize = '14px'
  messageEl.style.color = '#6b7280'
  messageEl.style.lineHeight = '1.5'
  return messageEl
}

/**
 * Create button container
 */
export function createButtonContainer(): HTMLDivElement {
  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.justifyContent = 'flex-end'
  container.style.gap = '8px'
  return container
}
