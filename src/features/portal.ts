/**
 * Portal utilities for ModalKit
 */

import { getElement, createPortalContainer, removeElement } from '../utils/dom'

// Default portal container ID
const DEFAULT_PORTAL_ID = 'modalkit-portal-root'

/**
 * Get or create the default portal container
 */
export function getPortalContainer(
  target?: HTMLElement | string | null
): HTMLElement {
  // If a specific target is provided, use it
  if (target) {
    const element = getElement(target)
    if (element) return element
  }

  // Try to find existing default container
  let container = document.getElementById(DEFAULT_PORTAL_ID)

  // Create new container if doesn't exist
  if (!container) {
    container = createPortalContainer(DEFAULT_PORTAL_ID)
    document.body.appendChild(container)
  }

  return container
}

/**
 * Create a new portal element
 */
export function createPortal(id?: string): HTMLDivElement {
  return createPortalContainer(id)
}

/**
 * Append a portal element to a target
 */
export function appendPortal(
  portal: HTMLElement,
  target?: HTMLElement | string | null
): void {
  const container = getPortalContainer(target)
  container.appendChild(portal)
}

/**
 * Remove a portal element from the DOM
 */
export function removePortal(portal: HTMLElement | null): void {
  removeElement(portal)
}

/**
 * Clean up all modalkit portals from the DOM
 */
export function cleanupPortals(): void {
  const portals = document.querySelectorAll('[data-modalkit-portal]')
  portals.forEach((portal) => portal.remove())

  // Also remove the default container if empty
  const defaultContainer = document.getElementById(DEFAULT_PORTAL_ID)
  if (defaultContainer && defaultContainer.children.length === 0) {
    defaultContainer.remove()
  }
}
