/**
 * Animation controller for ModalKit
 */

import type { AnimationState, AnimationType, AnimationController } from '../types'

/**
 * Configuration for animation controller
 */
export interface AnimationControllerConfig {
  /** Animation duration in ms */
  duration: number
  /** Called when animation state changes */
  onStateChange?: (state: AnimationState) => void
  /** Called when animation starts */
  onAnimationStart?: (type: AnimationType) => void
  /** Called when animation ends */
  onAnimationEnd?: (type: AnimationType) => void
}

/**
 * Create an animation controller
 */
export function createAnimationController(
  config: AnimationControllerConfig
): AnimationController {
  const { duration, onStateChange, onAnimationStart, onAnimationEnd } = config

  let state: AnimationState = 'idle'
  let timerId: ReturnType<typeof setTimeout> | null = null

  function clearTimer(): void {
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  function setState(newState: AnimationState): void {
    if (state !== newState) {
      state = newState
      onStateChange?.(state)
    }
  }

  function startEnter(): void {
    clearTimer()
    setState('entering')
    onAnimationStart?.('enter')

    timerId = setTimeout(() => {
      setState('entered')
      onAnimationEnd?.('enter')
      timerId = null
    }, duration)
  }

  function startExit(): void {
    clearTimer()
    setState('exiting')
    onAnimationStart?.('exit')

    timerId = setTimeout(() => {
      setState('exited')
      onAnimationEnd?.('exit')

      // Transition to idle after exited
      timerId = setTimeout(() => {
        setState('idle')
        timerId = null
      }, 0)
    }, duration)
  }

  function skipTo(targetState: 'entered' | 'exited'): void {
    clearTimer()

    if (targetState === 'entered') {
      setState('entered')
    } else {
      setState('exited')
      // Transition to idle
      timerId = setTimeout(() => {
        setState('idle')
        timerId = null
      }, 0)
    }
  }

  function getState(): AnimationState {
    return state
  }

  function isAnimating(): boolean {
    return state === 'entering' || state === 'exiting'
  }

  function destroy(): void {
    clearTimer()
    state = 'idle'
  }

  return {
    startEnter,
    startExit,
    skipTo,
    getState,
    isAnimating,
    destroy,
  }
}

/**
 * Create a no-op animation controller (for when animations are disabled)
 */
export function createNoopAnimationController(): AnimationController {
  let state: AnimationState = 'idle'

  return {
    startEnter() {
      state = 'entered'
    },
    startExit() {
      state = 'idle'
    },
    skipTo(targetState: 'entered' | 'exited') {
      state = targetState === 'entered' ? 'entered' : 'idle'
    },
    getState() {
      return state
    },
    isAnimating() {
      return false
    },
    destroy() {
      state = 'idle'
    },
  }
}
