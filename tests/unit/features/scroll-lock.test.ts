import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { scrollLock, resetScrollLock } from '../../../src/features/scroll-lock'

describe('scroll-lock', () => {
  beforeEach(() => {
    resetScrollLock()
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  afterEach(() => {
    resetScrollLock()
  })

  describe('lock', () => {
    it('should lock body scroll', () => {
      scrollLock.lock()
      expect(document.body.style.overflow).toBe('hidden')
      scrollLock.unlock()
    })

    it('should mark as locked', () => {
      scrollLock.lock()
      expect(scrollLock.isLocked()).toBe(true)
      scrollLock.unlock()
    })

    it('should handle multiple lock calls', () => {
      scrollLock.lock()
      scrollLock.lock()
      expect(scrollLock.isLocked()).toBe(true)

      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(true) // Still locked

      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(false)
    })
  })

  describe('unlock', () => {
    it('should unlock body scroll', () => {
      scrollLock.lock()
      scrollLock.unlock()
      expect(document.body.style.overflow).not.toBe('hidden')
    })

    it('should mark as unlocked', () => {
      scrollLock.lock()
      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(false)
    })

    it('should not fail if not locked', () => {
      expect(() => scrollLock.unlock()).not.toThrow()
    })

    it('should restore original styles', () => {
      document.body.style.overflow = 'auto'
      scrollLock.lock()
      scrollLock.unlock()
      expect(document.body.style.overflow).toBe('auto')
    })
  })

  describe('isLocked', () => {
    it('should return false when not locked', () => {
      expect(scrollLock.isLocked()).toBe(false)
    })

    it('should return true when locked', () => {
      scrollLock.lock()
      expect(scrollLock.isLocked()).toBe(true)
      scrollLock.unlock()
    })
  })

  describe('reference counting', () => {
    it('should only unlock on last unlock call', () => {
      scrollLock.lock()
      scrollLock.lock()
      scrollLock.lock()

      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(true)

      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(true)

      scrollLock.unlock()
      expect(scrollLock.isLocked()).toBe(false)
    })
  })

  describe('resetScrollLock', () => {
    it('should restore original styles when locked', () => {
      document.body.style.overflow = 'auto'
      scrollLock.lock()

      // Reset should restore styles
      resetScrollLock()

      expect(scrollLock.isLocked()).toBe(false)
      expect(document.body.style.overflow).toBe('auto')
    })

    it('should work even when not locked', () => {
      expect(() => resetScrollLock()).not.toThrow()
      expect(scrollLock.isLocked()).toBe(false)
    })
  })
})
