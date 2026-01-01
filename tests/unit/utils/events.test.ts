import { describe, it, expect, vi } from 'vitest'
import {
  createEventEmitter,
  createSubscriptionManager,
} from '../../../src/utils/events'

describe('events utilities', () => {
  describe('createEventEmitter', () => {
    it('should emit events to subscribers', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const handler = vi.fn()

      emitter.on('test', handler)
      emitter.emit('test', 'hello')

      expect(handler).toHaveBeenCalledWith('hello')
    })

    it('should support multiple handlers', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      emitter.on('test', handler1)
      emitter.on('test', handler2)
      emitter.emit('test', 'hello')

      expect(handler1).toHaveBeenCalledWith('hello')
      expect(handler2).toHaveBeenCalledWith('hello')
    })

    it('should return unsubscribe function', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const handler = vi.fn()

      const unsubscribe = emitter.on('test', handler)
      unsubscribe()
      emitter.emit('test', 'hello')

      expect(handler).not.toHaveBeenCalled()
    })

    it('should remove handler with off', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const handler = vi.fn()

      emitter.on('test', handler)
      emitter.off('test', handler)
      emitter.emit('test', 'hello')

      expect(handler).not.toHaveBeenCalled()
    })

    it('should clear all handlers', () => {
      const emitter = createEventEmitter<{ test: [string]; other: [number] }>()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      emitter.on('test', handler1)
      emitter.on('other', handler2)
      emitter.clear()
      emitter.emit('test', 'hello')
      emitter.emit('other', 42)

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it('should handle errors in handlers gracefully', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const errorHandler = vi.fn(() => {
        throw new Error('Test error')
      })
      const normalHandler = vi.fn()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      emitter.on('test', errorHandler)
      emitter.on('test', normalHandler)
      emitter.emit('test', 'hello')

      expect(consoleSpy).toHaveBeenCalled()
      expect(normalHandler).toHaveBeenCalledWith('hello')

      consoleSpy.mockRestore()
    })

    it('should support multiple event types', () => {
      const emitter = createEventEmitter<{
        stringEvent: [string]
        numberEvent: [number]
      }>()
      const stringHandler = vi.fn()
      const numberHandler = vi.fn()

      emitter.on('stringEvent', stringHandler)
      emitter.on('numberEvent', numberHandler)

      emitter.emit('stringEvent', 'hello')
      emitter.emit('numberEvent', 42)

      expect(stringHandler).toHaveBeenCalledWith('hello')
      expect(numberHandler).toHaveBeenCalledWith(42)
    })

    it('should handle emitting event with no handlers', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      expect(() => emitter.emit('test', 'hello')).not.toThrow()
    })

    it('should handle removing non-existent handler', () => {
      const emitter = createEventEmitter<{ test: [string] }>()
      const handler = vi.fn()
      expect(() => emitter.off('test', handler)).not.toThrow()
    })
  })

  describe('createSubscriptionManager', () => {
    it('should notify subscribers', () => {
      const manager = createSubscriptionManager<number>()
      const callback = vi.fn()

      manager.subscribe(callback)
      manager.notify(42)

      expect(callback).toHaveBeenCalledWith(42)
    })

    it('should return unsubscribe function', () => {
      const manager = createSubscriptionManager<number>()
      const callback = vi.fn()

      const unsubscribe = manager.subscribe(callback)
      unsubscribe()
      manager.notify(42)

      expect(callback).not.toHaveBeenCalled()
    })

    it('should clear all subscribers', () => {
      const manager = createSubscriptionManager<number>()
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      manager.subscribe(callback1)
      manager.subscribe(callback2)
      manager.clear()
      manager.notify(42)

      expect(callback1).not.toHaveBeenCalled()
      expect(callback2).not.toHaveBeenCalled()
    })

    it('should handle errors in subscribers gracefully', () => {
      const manager = createSubscriptionManager<number>()
      const errorCallback = vi.fn(() => {
        throw new Error('Test error')
      })
      const normalCallback = vi.fn()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      manager.subscribe(errorCallback)
      manager.subscribe(normalCallback)
      manager.notify(42)

      expect(consoleSpy).toHaveBeenCalled()
      expect(normalCallback).toHaveBeenCalledWith(42)

      consoleSpy.mockRestore()
    })
  })
})
