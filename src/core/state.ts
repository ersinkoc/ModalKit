/**
 * State management for ModalKit
 */

import type { ModalState, AnimationState, StateManager } from '../types'
import { createSubscriptionManager } from '../utils/events'

/**
 * Create initial modal state
 */
export function createInitialState(defaultOpen: boolean = false): ModalState {
  return {
    open: defaultOpen,
    animationState: defaultOpen ? 'entered' : 'idle',
    stackOrder: 0,
    isTopMost: false,
    mounted: defaultOpen,
  }
}

/**
 * Create a state manager
 */
export function createStateManager(
  initialState: ModalState
): StateManager<ModalState> {
  let state = { ...initialState }
  const { subscribe, notify } = createSubscriptionManager<ModalState>()

  function getState(): ModalState {
    return { ...state }
  }

  function setState(partial: Partial<ModalState>): void {
    const prevState = state
    state = { ...state, ...partial }

    // Only notify if state actually changed
    if (hasStateChanged(prevState, state)) {
      notify(state)
    }
  }

  return {
    getState,
    setState,
    subscribe,
  }
}

/**
 * Check if state has changed
 */
function hasStateChanged(prev: ModalState, next: ModalState): boolean {
  return (
    prev.open !== next.open ||
    prev.animationState !== next.animationState ||
    prev.stackOrder !== next.stackOrder ||
    prev.isTopMost !== next.isTopMost ||
    prev.mounted !== next.mounted
  )
}

/**
 * Derive mounted state from open and animation state
 */
export function shouldBeMounted(
  open: boolean,
  animationState: AnimationState
): boolean {
  // Mounted when open or during exit animation
  return open || animationState === 'exiting' || animationState === 'exited'
}

/**
 * Get the next animation state based on current state and action
 */
export function getNextAnimationState(
  currentState: AnimationState,
  action: 'open' | 'close',
  animated: boolean
): AnimationState {
  if (!animated) {
    return action === 'open' ? 'entered' : 'idle'
  }

  if (action === 'open') {
    return 'entering'
  }

  // Close action
  if (currentState === 'entered' || currentState === 'entering') {
    return 'exiting'
  }

  return 'idle'
}
