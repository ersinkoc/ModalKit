/**
 * ID generation utilities for ModalKit
 */

let counter = 0

/**
 * Generate a unique ID with optional prefix
 */
export function generateId(prefix: string = 'modalkit'): string {
  counter++
  return `${prefix}-${counter}`
}

/**
 * Create a namespaced ID generator
 */
export function createIdGenerator(namespace: string): () => string {
  let localCounter = 0

  return function generateNamespacedId(): string {
    localCounter++
    return `${namespace}-${localCounter}`
  }
}

/**
 * Reset the global counter (useful for testing)
 */
export function resetIdCounter(): void {
  counter = 0
}

/**
 * Create modal-specific IDs
 */
export function createModalIds(baseId: string): {
  modalId: string
  titleId: string
  descriptionId: string
} {
  return {
    modalId: baseId,
    titleId: `${baseId}-title`,
    descriptionId: `${baseId}-description`,
  }
}
