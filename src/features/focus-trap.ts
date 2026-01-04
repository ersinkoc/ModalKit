/**
 * Focus trap implementation for ModalKit
 */

import type { FocusTrap, FocusTrapConfig } from '../types'
import {
  getFocusableElements,
  getFirstFocusable,
  focusElement,
  getActiveElement,
  saveFocus,
  restoreFocus,
} from '../utils/focus'

/**
 * Create a focus trap instance
 */
export function createFocusTrap(config: FocusTrapConfig): FocusTrap {
  const {
    container,
    initialFocus,
    fallbackFocus,
    returnFocus,
    escapeDeactivates = true,
    clickOutsideDeactivates = false,
    allowOutsideClick = false,
    onActivate,
    onDeactivate,
  } = config

  let active = false
  let paused = false
  let focusing = false // Guard against re-entrancy in handleFocusIn

  // Resolve element from ref
  function resolveElement(
    ref: HTMLElement | (() => HTMLElement | null) | null | undefined
  ): HTMLElement | null {
    if (!ref) return null
    if (typeof ref === 'function') return ref()
    return ref
  }

  // Handle Tab key navigation
  function handleKeyDown(event: KeyboardEvent): void {
    if (!active || paused) return
    if (event.key !== 'Tab') return

    const focusables = getFocusableElements(container)
    if (focusables.length === 0) return

    const firstFocusable = focusables[0]
    const lastFocusable = focusables[focusables.length - 1]
    const activeElement = getActiveElement()

    // Handle Shift+Tab (backwards)
    if (event.shiftKey) {
      if (activeElement === firstFocusable || !container.contains(activeElement as Node)) {
        event.preventDefault()
        focusElement(lastFocusable)
      }
    } else {
      // Handle Tab (forwards)
      if (activeElement === lastFocusable || !container.contains(activeElement as Node)) {
        event.preventDefault()
        focusElement(firstFocusable)
      }
    }
  }

  // Handle Escape key
  function handleEscapeKey(event: KeyboardEvent): void {
    if (!active || paused) return
    if (event.key !== 'Escape') return

    if (escapeDeactivates) {
      event.preventDefault()
      deactivate()
    }
  }

  // Handle clicks outside the container
  function handleClick(event: MouseEvent): void {
    if (!active || paused) return

    const target = event.target as Node
    if (!container.contains(target)) {
      // Check if outside click is allowed
      const shouldAllowClick =
        typeof allowOutsideClick === 'function'
          ? allowOutsideClick(event)
          : allowOutsideClick

      if (!shouldAllowClick) {
        event.preventDefault()
        event.stopPropagation()
      }

      if (clickOutsideDeactivates) {
        deactivate()
      }
    }
  }

  // Handle focus leaving the container
  function handleFocusIn(event: FocusEvent): void {
    if (!active || paused || focusing) return

    const target = event.target as Node
    if (!container.contains(target)) {
      // Focus has left the trap, bring it back
      focusing = true
      event.preventDefault()
      const firstFocusable = getFirstFocusable(container)
      if (firstFocusable) {
        focusElement(firstFocusable)
      } else {
        // Fallback to container itself
        container.focus()
      }
      // Use setTimeout to reset the guard after focus event completes
      setTimeout(() => { focusing = false }, 0)
    }
  }

  function activate(): void {
    if (active) return

    // Save current focus for restoration
    saveFocus()

    active = true
    paused = false

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('keydown', handleEscapeKey, true)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('focusin', handleFocusIn, true)

    // Set initial focus
    const initialElement = resolveElement(initialFocus)
    const fallbackElement = resolveElement(fallbackFocus)
    const firstFocusable = getFirstFocusable(container)

    const elementToFocus =
      initialElement ??
      fallbackElement ??
      firstFocusable ??
      container

    // Make container focusable as fallback
    if (!container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1')
    }

    focusElement(elementToFocus as HTMLElement, { preventScroll: true })

    onActivate?.()
  }

  function deactivate(): void {
    if (!active) return

    active = false
    paused = false

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown, true)
    document.removeEventListener('keydown', handleEscapeKey, true)
    document.removeEventListener('click', handleClick, true)
    document.removeEventListener('focusin', handleFocusIn, true)

    // Restore focus
    const returnElement = resolveElement(returnFocus)
    if (returnElement) {
      focusElement(returnElement, { preventScroll: true })
    } else {
      restoreFocus(true)
    }

    onDeactivate?.()
  }

  function pause(): void {
    if (!active) return
    paused = true
  }

  function unpause(): void {
    if (!active) return
    paused = false
  }

  function isActive(): boolean {
    return active
  }

  function isPaused(): boolean {
    return paused
  }

  return {
    activate,
    deactivate,
    pause,
    unpause,
    isActive,
    isPaused,
  }
}
