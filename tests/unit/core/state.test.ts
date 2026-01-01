import { describe, it, expect, vi } from 'vitest'
import {
  createInitialState,
  createStateManager,
  shouldBeMounted,
  getNextAnimationState,
} from '../../../src/core/state'

describe('state', () => {
  describe('createInitialState', () => {
    it('should create state with defaultOpen false', () => {
      const state = createInitialState(false)
      expect(state.open).toBe(false)
      expect(state.animationState).toBe('idle')
      expect(state.mounted).toBe(false)
    })

    it('should create state with defaultOpen true', () => {
      const state = createInitialState(true)
      expect(state.open).toBe(true)
      expect(state.animationState).toBe('entered')
      expect(state.mounted).toBe(true)
    })

    it('should have zero stack order', () => {
      const state = createInitialState()
      expect(state.stackOrder).toBe(0)
    })

    it('should not be top-most initially', () => {
      const state = createInitialState()
      expect(state.isTopMost).toBe(false)
    })
  })

  describe('createStateManager', () => {
    it('should get current state', () => {
      const initial = createInitialState()
      const manager = createStateManager(initial)
      expect(manager.getState()).toEqual(initial)
    })

    it('should return a copy of state', () => {
      const initial = createInitialState()
      const manager = createStateManager(initial)
      const state = manager.getState()
      state.open = true
      expect(manager.getState().open).toBe(false)
    })

    it('should update state', () => {
      const manager = createStateManager(createInitialState())
      manager.setState({ open: true })
      expect(manager.getState().open).toBe(true)
    })

    it('should merge state updates', () => {
      const manager = createStateManager(createInitialState())
      manager.setState({ open: true })
      manager.setState({ stackOrder: 1 })
      const state = manager.getState()
      expect(state.open).toBe(true)
      expect(state.stackOrder).toBe(1)
    })

    it('should notify subscribers on state change', () => {
      const manager = createStateManager(createInitialState())
      const callback = vi.fn()
      manager.subscribe(callback)

      manager.setState({ open: true })
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({ open: true }))
    })

    it('should not notify if state unchanged', () => {
      const initial = createInitialState()
      const manager = createStateManager(initial)
      const callback = vi.fn()
      manager.subscribe(callback)

      manager.setState({ open: false }) // Same as initial
      expect(callback).not.toHaveBeenCalled()
    })

    it('should return unsubscribe function', () => {
      const manager = createStateManager(createInitialState())
      const callback = vi.fn()
      const unsubscribe = manager.subscribe(callback)

      unsubscribe()
      manager.setState({ open: true })
      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('shouldBeMounted', () => {
    it('should return true when open', () => {
      expect(shouldBeMounted(true, 'entered')).toBe(true)
    })

    it('should return true when exiting', () => {
      expect(shouldBeMounted(false, 'exiting')).toBe(true)
    })

    it('should return true when exited', () => {
      expect(shouldBeMounted(false, 'exited')).toBe(true)
    })

    it('should return false when idle and closed', () => {
      expect(shouldBeMounted(false, 'idle')).toBe(false)
    })

    it('should return true when entering', () => {
      expect(shouldBeMounted(true, 'entering')).toBe(true)
    })
  })

  describe('getNextAnimationState', () => {
    describe('when animated is true', () => {
      it('should return entering on open', () => {
        expect(getNextAnimationState('idle', 'open', true)).toBe('entering')
      })

      it('should return exiting on close from entered', () => {
        expect(getNextAnimationState('entered', 'close', true)).toBe('exiting')
      })

      it('should return exiting on close from entering', () => {
        expect(getNextAnimationState('entering', 'close', true)).toBe('exiting')
      })

      it('should return idle on close from idle', () => {
        expect(getNextAnimationState('idle', 'close', true)).toBe('idle')
      })
    })

    describe('when animated is false', () => {
      it('should return entered on open', () => {
        expect(getNextAnimationState('idle', 'open', false)).toBe('entered')
      })

      it('should return idle on close', () => {
        expect(getNextAnimationState('entered', 'close', false)).toBe('idle')
      })
    })
  })
})
