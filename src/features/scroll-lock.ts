/**
 * Scroll lock implementation for ModalKit
 */

import type { ScrollLock } from '../types'
import { getScrollbarWidth } from '../utils/dom'

// Reference counting for multiple modals
let lockCount = 0

// Store original body styles
let originalStyles: {
  overflow: string
  paddingRight: string
} | null = null

/**
 * Check if iOS Safari
 * @internal
 */
/* c8 ignore start */
function isIOS(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  )
}

/**
 * Get current scroll position
 * @internal
 */
function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset ?? document.documentElement.scrollLeft,
    y: window.pageYOffset ?? document.documentElement.scrollTop,
  }
}
/* c8 ignore stop */

// Store scroll position for iOS fix
let scrollPosition: { x: number; y: number } | null = null

/**
 * Lock body scroll
 */
function lock(): void {
  lockCount++

  // Only apply lock on first call
  if (lockCount > 1) return

  const scrollbarWidth = getScrollbarWidth()
  const hasScrollbar = window.innerWidth > document.documentElement.clientWidth

  // Save original styles
  originalStyles = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  }

  // Apply lock styles
  document.body.style.overflow = 'hidden'

  // Add padding to prevent layout shift from scrollbar disappearing
  if (hasScrollbar && scrollbarWidth > 0) {
    const currentPadding = parseInt(
      getComputedStyle(document.body).paddingRight,
      10
    ) || 0
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
  }

  // iOS Safari fix
  /* c8 ignore start */
  if (isIOS()) {
    scrollPosition = getScrollPosition()
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.y}px`
    document.body.style.left = `-${scrollPosition.x}px`
    document.body.style.width = '100%'
  }
  /* c8 ignore stop */
}

/**
 * Unlock body scroll
 */
/* c8 ignore start */
function unlock(): void {
  if (lockCount === 0) return

  lockCount--

  // Only remove lock on last call
  if (lockCount > 0) return

  // Restore original styles
  if (originalStyles) {
    document.body.style.overflow = originalStyles.overflow
    document.body.style.paddingRight = originalStyles.paddingRight
    originalStyles = null
  }

  // iOS Safari fix - restore scroll position
  if (isIOS() && scrollPosition) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.width = ''
    window.scrollTo(scrollPosition.x, scrollPosition.y)
    scrollPosition = null
  }
}
/* c8 ignore stop */

/**
 * Check if scroll is locked
 */
function isLocked(): boolean {
  return lockCount > 0
}

/**
 * Force reset scroll lock (useful for testing)
 * @internal
 */
export function resetScrollLock(): void {
  if (originalStyles) {
    document.body.style.overflow = originalStyles.overflow
    document.body.style.paddingRight = originalStyles.paddingRight
    originalStyles = null
  }

  /* c8 ignore start */
  if (isIOS()) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.width = ''
  }
  /* c8 ignore stop */

  lockCount = 0
  scrollPosition = null
}

/**
 * Scroll lock singleton
 */
export const scrollLock: ScrollLock = {
  lock,
  unlock,
  isLocked,
}
