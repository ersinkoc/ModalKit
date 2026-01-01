/**
 * Focus utility functions for ModalKit
 */

/**
 * Selector for focusable elements
 */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
  'audio[controls]',
  'video[controls]',
  'details > summary:first-of-type',
].join(',')

/**
 * Check if an element is visible
 */
function isVisible(element: HTMLElement): boolean {
  // Check if element is hidden
  if (
    element.offsetWidth === 0 &&
    element.offsetHeight === 0 &&
    element.getClientRects().length === 0
  ) {
    return false
  }

  // Check computed styles
  const style = getComputedStyle(element)
  if (style.visibility === 'hidden' || style.display === 'none') {
    return false
  }

  return true
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false
  if (!element.matches(FOCUSABLE_SELECTOR)) return false
  if (!isVisible(element)) return false

  return true
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  return Array.from(elements).filter(isFocusable)
}

/**
 * Get the first focusable element in a container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const focusables = getFocusableElements(container)
  return focusables[0] ?? null
}

/**
 * Get the last focusable element in a container
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const focusables = getFocusableElements(container)
  return focusables[focusables.length - 1] ?? null
}

/**
 * Get the currently focused element
 */
export function getActiveElement(doc: Document = document): Element | null {
  let activeElement = doc.activeElement

  // Handle shadow DOM
  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement
  }

  return activeElement
}

/**
 * Focus an element safely
 */
export function focusElement(
  element: HTMLElement | null | undefined,
  options?: FocusOptions
): boolean {
  if (!element) return false

  try {
    element.focus(options)
    return getActiveElement() === element
  } catch {
    return false
  }
}

/**
 * Storage for saved focus state
 */
interface FocusState {
  element: HTMLElement | null
  scrollX: number
  scrollY: number
}

let savedFocus: FocusState | null = null

/**
 * Save the current focus state
 */
export function saveFocus(): void {
  const activeElement = getActiveElement()
  savedFocus = {
    element: activeElement instanceof HTMLElement ? activeElement : null,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }
}

/**
 * Restore previously saved focus state
 */
export function restoreFocus(preventScroll: boolean = true): void {
  if (!savedFocus) return

  const { element, scrollX, scrollY } = savedFocus

  if (element && document.body.contains(element)) {
    focusElement(element, { preventScroll })

    // Restore scroll position if needed
    if (preventScroll) {
      window.scrollTo(scrollX, scrollY)
    }
  }

  savedFocus = null
}

/**
 * Clear saved focus without restoring
 */
export function clearSavedFocus(): void {
  savedFocus = null
}

/**
 * Check if focus is within a container
 */
export function isFocusWithin(container: HTMLElement): boolean {
  const activeElement = getActiveElement()
  if (!activeElement) return false
  return container.contains(activeElement)
}
