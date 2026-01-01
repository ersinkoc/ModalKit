/**
 * DOM utility functions for ModalKit
 */

/**
 * Get an element by selector string or return the element itself
 */
export function getElement(
  target: HTMLElement | string | null | undefined
): HTMLElement | null {
  if (!target) return null
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  return target
}

/**
 * Create a portal container element
 */
export function createPortalContainer(id?: string): HTMLDivElement {
  const container = document.createElement('div')
  if (id) {
    container.id = id
  }
  container.setAttribute('data-modalkit-portal', '')
  return container
}

/**
 * Safely remove an element from the DOM
 */
export function removeElement(element: HTMLElement | null): void {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element)
  }
}

/**
 * Check if an element is in the document
 */
export function isInDocument(element: HTMLElement | null): boolean {
  if (!element) return false
  return document.body.contains(element)
}

/**
 * Get the document's scrollbar width
 */
export function getScrollbarWidth(): number {
  // Create outer element
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  // Create inner element
  const inner = document.createElement('div')
  outer.appendChild(inner)

  // Calculate scrollbar width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // Cleanup
  removeElement(outer)

  return scrollbarWidth
}

/**
 * Check if the element or its descendants contain another element
 */
export function contains(parent: Element | null, child: Element | null): boolean {
  if (!parent || !child) return false
  return parent === child || parent.contains(child)
}

/**
 * Set multiple styles on an element
 */
export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  Object.assign(element.style, styles)
}

/**
 * Get the owner document of an element
 */
export function getOwnerDocument(element: Element | null): Document {
  return element?.ownerDocument ?? document
}

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
