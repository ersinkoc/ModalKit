import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getElement,
  createPortalContainer,
  removeElement,
  isInDocument,
  getScrollbarWidth,
  contains,
  setStyles,
  getOwnerDocument,
  isBrowser,
} from '../../../src/utils/dom'

describe('dom utilities', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('getElement', () => {
    it('should return null for null input', () => {
      expect(getElement(null)).toBeNull()
    })

    it('should return null for undefined input', () => {
      expect(getElement(undefined)).toBeNull()
    })

    it('should return element when passed an element', () => {
      expect(getElement(container)).toBe(container)
    })

    it('should query element by selector', () => {
      expect(getElement('#test-container')).toBe(container)
    })

    it('should return null for non-existent selector', () => {
      expect(getElement('#non-existent')).toBeNull()
    })
  })

  describe('createPortalContainer', () => {
    it('should create a div element', () => {
      const portal = createPortalContainer()
      expect(portal.tagName).toBe('DIV')
    })

    it('should set id if provided', () => {
      const portal = createPortalContainer('my-portal')
      expect(portal.id).toBe('my-portal')
    })

    it('should set data-modalkit-portal attribute', () => {
      const portal = createPortalContainer()
      expect(portal.hasAttribute('data-modalkit-portal')).toBe(true)
    })
  })

  describe('removeElement', () => {
    it('should remove element from DOM', () => {
      const child = document.createElement('div')
      container.appendChild(child)
      expect(container.contains(child)).toBe(true)

      removeElement(child)
      expect(container.contains(child)).toBe(false)
    })

    it('should handle null element', () => {
      expect(() => removeElement(null)).not.toThrow()
    })

    it('should handle element not in DOM', () => {
      const orphan = document.createElement('div')
      expect(() => removeElement(orphan)).not.toThrow()
    })
  })

  describe('isInDocument', () => {
    it('should return true for element in document', () => {
      expect(isInDocument(container)).toBe(true)
    })

    it('should return false for element not in document', () => {
      const orphan = document.createElement('div')
      expect(isInDocument(orphan)).toBe(false)
    })

    it('should return false for null', () => {
      expect(isInDocument(null)).toBe(false)
    })
  })

  describe('getScrollbarWidth', () => {
    it('should return a number', () => {
      const width = getScrollbarWidth()
      expect(typeof width).toBe('number')
    })

    it('should return non-negative value', () => {
      const width = getScrollbarWidth()
      expect(width).toBeGreaterThanOrEqual(0)
    })
  })

  describe('contains', () => {
    it('should return true if parent contains child', () => {
      const child = document.createElement('div')
      container.appendChild(child)
      expect(contains(container, child)).toBe(true)
    })

    it('should return true if same element', () => {
      expect(contains(container, container)).toBe(true)
    })

    it('should return false if parent does not contain child', () => {
      const other = document.createElement('div')
      expect(contains(container, other)).toBe(false)
    })

    it('should return false for null parent', () => {
      expect(contains(null, container)).toBe(false)
    })

    it('should return false for null child', () => {
      expect(contains(container, null)).toBe(false)
    })
  })

  describe('setStyles', () => {
    it('should set styles on element', () => {
      const el = document.createElement('div')
      setStyles(el, { backgroundColor: 'red', fontSize: '16px' })
      expect(el.style.backgroundColor).toBe('red')
      expect(el.style.fontSize).toBe('16px')
    })
  })

  describe('getOwnerDocument', () => {
    it('should return document for element', () => {
      expect(getOwnerDocument(container)).toBe(document)
    })

    it('should return document for null', () => {
      expect(getOwnerDocument(null)).toBe(document)
    })
  })

  describe('isBrowser', () => {
    it('should return true in browser environment', () => {
      expect(isBrowser()).toBe(true)
    })
  })
})
