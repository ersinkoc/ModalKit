import { describe, it, expect, vi } from 'vitest'
import {
  isEscapeKey,
  isTabKey,
  isEnterKey,
  isSpaceKey,
  createKeyboardHandler,
  stopEvent,
} from '../../../src/features/keyboard'

describe('keyboard', () => {
  describe('isEscapeKey', () => {
    it('should return true for Escape key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      expect(isEscapeKey(event)).toBe(true)
    })

    it('should return true for Esc key (legacy)', () => {
      const event = new KeyboardEvent('keydown', { key: 'Esc' })
      expect(isEscapeKey(event)).toBe(true)
    })

    it('should return true for keyCode 27', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 27 })
      expect(isEscapeKey(event)).toBe(true)
    })

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      expect(isEscapeKey(event)).toBe(false)
    })
  })

  describe('isTabKey', () => {
    it('should return true for Tab key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      expect(isTabKey(event)).toBe(true)
    })

    it('should return true for keyCode 9', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 9 })
      expect(isTabKey(event)).toBe(true)
    })

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      expect(isTabKey(event)).toBe(false)
    })
  })

  describe('isEnterKey', () => {
    it('should return true for Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      expect(isEnterKey(event)).toBe(true)
    })

    it('should return true for keyCode 13', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 13 })
      expect(isEnterKey(event)).toBe(true)
    })

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      expect(isEnterKey(event)).toBe(false)
    })
  })

  describe('isSpaceKey', () => {
    it('should return true for Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' })
      expect(isSpaceKey(event)).toBe(true)
    })

    it('should return true for Spacebar key (legacy)', () => {
      const event = new KeyboardEvent('keydown', { key: 'Spacebar' })
      expect(isSpaceKey(event)).toBe(true)
    })

    it('should return true for keyCode 32', () => {
      const event = new KeyboardEvent('keydown', { keyCode: 32 })
      expect(isSpaceKey(event)).toBe(true)
    })

    it('should return false for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      expect(isSpaceKey(event)).toBe(false)
    })
  })

  describe('createKeyboardHandler', () => {
    it('should create a keyboard handler', () => {
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onClose: vi.fn(),
        isTopMost: () => true,
      })
      expect(typeof handler).toBe('function')
    })

    it('should call onClose on Escape when enabled', () => {
      const onClose = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onClose,
        isTopMost: () => true,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onClose).toHaveBeenCalled()
    })

    it('should not call onClose on Escape when disabled', () => {
      const onClose = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: false,
        onClose,
        isTopMost: () => true,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should call onEscapeKeyDown callback', () => {
      const onEscapeKeyDown = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onEscapeKeyDown,
        onClose: vi.fn(),
        isTopMost: () => true,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onEscapeKeyDown).toHaveBeenCalledWith(event)
    })

    it('should not close if onEscapeKeyDown prevents default', () => {
      const onClose = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onEscapeKeyDown: (e) => e.preventDefault(),
        onClose,
        isTopMost: () => true,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should not handle events if not top-most', () => {
      const onClose = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onClose,
        isTopMost: () => false,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should ignore non-Escape keys', () => {
      const onClose = vi.fn()
      const handler = createKeyboardHandler({
        closeOnEscape: true,
        onClose,
        isTopMost: () => true,
      })

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      })
      handler(event)

      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('stopEvent', () => {
    it('should prevent default and stop propagation', () => {
      const event = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
      })

      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation')
      stopEvent(event)

      expect(event.defaultPrevented).toBe(true)
      expect(stopPropagationSpy).toHaveBeenCalled()
    })
  })
})
