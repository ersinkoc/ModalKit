import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  createAnimationController,
  createNoopAnimationController,
} from '../../../src/features/animation'

describe('animation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createAnimationController', () => {
    it('should create controller with idle state', () => {
      const controller = createAnimationController({ duration: 200 })
      expect(controller.getState()).toBe('idle')
    })

    it('should not be animating initially', () => {
      const controller = createAnimationController({ duration: 200 })
      expect(controller.isAnimating()).toBe(false)
    })
  })

  describe('startEnter', () => {
    it('should transition to entering state', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startEnter()
      expect(controller.getState()).toBe('entering')
    })

    it('should be animating during enter', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startEnter()
      expect(controller.isAnimating()).toBe(true)
    })

    it('should call onAnimationStart', () => {
      const onAnimationStart = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationStart,
      })
      controller.startEnter()
      expect(onAnimationStart).toHaveBeenCalledWith('enter')
    })

    it('should transition to entered after duration', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startEnter()

      vi.advanceTimersByTime(200)
      expect(controller.getState()).toBe('entered')
    })

    it('should call onAnimationEnd after duration', () => {
      const onAnimationEnd = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationEnd,
      })
      controller.startEnter()

      vi.advanceTimersByTime(200)
      expect(onAnimationEnd).toHaveBeenCalledWith('enter')
    })

    it('should call onStateChange', () => {
      const onStateChange = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onStateChange,
      })
      controller.startEnter()

      expect(onStateChange).toHaveBeenCalledWith('entering')

      vi.advanceTimersByTime(200)
      expect(onStateChange).toHaveBeenCalledWith('entered')
    })
  })

  describe('startExit', () => {
    it('should transition to exiting state', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startEnter()
      vi.advanceTimersByTime(200)

      controller.startExit()
      expect(controller.getState()).toBe('exiting')
    })

    it('should be animating during exit', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startExit()
      expect(controller.isAnimating()).toBe(true)
    })

    it('should call onAnimationStart', () => {
      const onAnimationStart = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationStart,
      })
      controller.startExit()
      expect(onAnimationStart).toHaveBeenCalledWith('exit')
    })

    it('should transition to exited after duration', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startExit()

      vi.advanceTimersByTime(200)
      expect(controller.getState()).toBe('exited')
    })

    it('should transition to idle after exited', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startExit()

      // First timeout: exiting -> exited
      vi.advanceTimersByTime(200)
      expect(controller.getState()).toBe('exited')

      // Second timeout (nested): exited -> idle
      vi.runAllTimers()

      expect(controller.getState()).toBe('idle')
    })

    it('should call onAnimationEnd after duration', () => {
      const onAnimationEnd = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationEnd,
      })
      controller.startExit()

      vi.advanceTimersByTime(200)
      expect(onAnimationEnd).toHaveBeenCalledWith('exit')
    })
  })

  describe('skipTo', () => {
    it('should skip to entered state', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.skipTo('entered')
      expect(controller.getState()).toBe('entered')
    })

    it('should skip to idle state from exited', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.skipTo('exited')
      expect(controller.getState()).toBe('exited')

      vi.advanceTimersByTime(0)
      expect(controller.getState()).toBe('idle')
    })

    it('should cancel pending animation', () => {
      const onAnimationEnd = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationEnd,
      })
      controller.startEnter()
      controller.skipTo('entered')

      vi.advanceTimersByTime(200)
      // onAnimationEnd should not be called since we skipped
      expect(onAnimationEnd).not.toHaveBeenCalled()
    })
  })

  describe('destroy', () => {
    it('should clear timers', () => {
      const onAnimationEnd = vi.fn()
      const controller = createAnimationController({
        duration: 200,
        onAnimationEnd,
      })
      controller.startEnter()
      controller.destroy()

      vi.advanceTimersByTime(200)
      expect(onAnimationEnd).not.toHaveBeenCalled()
    })

    it('should reset to idle state', () => {
      const controller = createAnimationController({ duration: 200 })
      controller.startEnter()
      controller.destroy()
      expect(controller.getState()).toBe('idle')
    })
  })

  describe('createNoopAnimationController', () => {
    it('should start in idle state', () => {
      const controller = createNoopAnimationController()
      expect(controller.getState()).toBe('idle')
    })

    it('should never be animating', () => {
      const controller = createNoopAnimationController()
      controller.startEnter()
      expect(controller.isAnimating()).toBe(false)
    })

    it('should immediately set entered on startEnter', () => {
      const controller = createNoopAnimationController()
      controller.startEnter()
      expect(controller.getState()).toBe('entered')
    })

    it('should immediately set idle on startExit', () => {
      const controller = createNoopAnimationController()
      controller.startEnter()
      controller.startExit()
      expect(controller.getState()).toBe('idle')
    })

    it('should handle skipTo', () => {
      const controller = createNoopAnimationController()
      controller.skipTo('entered')
      expect(controller.getState()).toBe('entered')

      controller.skipTo('exited')
      expect(controller.getState()).toBe('idle')
    })

    it('should reset on destroy', () => {
      const controller = createNoopAnimationController()
      controller.startEnter()
      controller.destroy()
      expect(controller.getState()).toBe('idle')
    })
  })
})
