/**
 * Keyboard handling for ModalKit
 */

/**
 * Check if event is Escape key
 */
export function isEscapeKey(event: KeyboardEvent): boolean {
  return event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27
}

/**
 * Check if event is Tab key
 */
export function isTabKey(event: KeyboardEvent): boolean {
  return event.key === 'Tab' || event.keyCode === 9
}

/**
 * Check if event is Enter key
 */
export function isEnterKey(event: KeyboardEvent): boolean {
  return event.key === 'Enter' || event.keyCode === 13
}

/**
 * Check if event is Space key
 */
export function isSpaceKey(event: KeyboardEvent): boolean {
  return event.key === ' ' || event.key === 'Spacebar' || event.keyCode === 32
}

/**
 * Configuration for keyboard handler
 */
export interface KeyboardHandlerConfig {
  /** Close modal on Escape */
  closeOnEscape: boolean
  /** Callback when Escape is pressed */
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  /** Close callback */
  onClose: () => void
  /** Whether this is the top-most modal */
  isTopMost: () => boolean
}

/**
 * Create a keyboard event handler for modals
 */
export function createKeyboardHandler(
  config: KeyboardHandlerConfig
): (event: KeyboardEvent) => void {
  const { closeOnEscape, onEscapeKeyDown, onClose, isTopMost } = config

  return function handleKeyDown(event: KeyboardEvent): void {
    // Only handle events for top-most modal
    if (!isTopMost()) return

    if (isEscapeKey(event)) {
      // Call user callback first
      onEscapeKeyDown?.(event)

      // Close if enabled and event not prevented
      if (closeOnEscape && !event.defaultPrevented) {
        event.preventDefault()
        event.stopPropagation()
        onClose()
      }
    }
  }
}

/**
 * Prevent default and stop propagation
 */
export function stopEvent(event: Event): void {
  event.preventDefault()
  event.stopPropagation()
}
