/**
 * Modal stack management for ModalKit
 */

import type { Modal, ModalStack, ModalInternal, StackEvent } from '../types'
import { createEventEmitter } from '../utils/events'

/**
 * Stack event types
 */
interface StackEvents extends Record<string, unknown[]> {
  push: [Modal]
  pop: [Modal]
  change: [Modal[]]
}

/**
 * Base z-index for modals
 */
export const BASE_Z_INDEX = 1000

/**
 * Z-index increment per stacked modal
 */
export const Z_INDEX_INCREMENT = 10

/**
 * Calculate z-index for a modal at given stack position
 */
export function calculateZIndex(stackOrder: number): number {
  return BASE_Z_INDEX + (stackOrder - 1) * Z_INDEX_INCREMENT
}

/**
 * Create the modal stack manager
 */
function createModalStack(): ModalStack & {
  push: (modal: ModalInternal) => void
  remove: (modal: ModalInternal) => void
} {
  const stack: ModalInternal[] = []
  const events = createEventEmitter<StackEvents>()

  function updateStackState(): void {
    stack.forEach((modal, index) => {
      const order = index + 1
      const isTopMost = index === stack.length - 1
      modal._setStackOrder(order)
      modal._setIsTopMost(isTopMost)
    })
  }

  function push(modal: ModalInternal): void {
    // Check if modal is already in stack
    const existingIndex = stack.indexOf(modal)
    if (existingIndex !== -1) {
      return
    }

    stack.push(modal)
    updateStackState()
    events.emit('push', modal)
    events.emit('change', [...stack])
  }

  function remove(modal: ModalInternal): void {
    const index = stack.indexOf(modal)
    if (index === -1) return

    stack.splice(index, 1)
    updateStackState()
    events.emit('pop', modal)
    events.emit('change', [...stack])
  }

  function count(): number {
    return stack.length
  }

  function isEmpty(): boolean {
    return stack.length === 0
  }

  function getAll(): Modal[] {
    return [...stack]
  }

  function getTopMost(): Modal | null {
    return stack[stack.length - 1] ?? null
  }

  function getByOrder(order: number): Modal | null {
    return stack[order - 1] ?? null
  }

  function closeAll(): void {
    // Close from top to bottom
    const modalsToClose = [...stack].reverse()
    modalsToClose.forEach((modal) => modal.close())
  }

  function closeTopMost(): void {
    const topMost = getTopMost()
    if (topMost) {
      topMost.close()
    }
  }

  function on<K extends StackEvent>(
    event: K,
    handler: K extends 'change'
      ? (modals: Modal[]) => void
      : (modal: Modal) => void
  ): () => void {
    return events.on(event, handler as (...args: StackEvents[K]) => void)
  }

  function off<K extends StackEvent>(
    event: K,
    handler: K extends 'change'
      ? (modals: Modal[]) => void
      : (modal: Modal) => void
  ): void {
    events.off(event, handler as (...args: StackEvents[K]) => void)
  }

  return {
    count,
    isEmpty,
    getAll,
    getTopMost,
    getByOrder,
    closeAll,
    closeTopMost,
    on,
    off,
    push,
    remove,
  }
}

/**
 * Global modal stack singleton
 */
export const modalStack = createModalStack()

/**
 * Internal stack methods for modal instances
 * @internal
 */
export const stackInternal = {
  push: modalStack.push,
  remove: modalStack.remove,
}
