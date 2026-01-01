import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  FOCUSABLE_SELECTOR,
  isFocusable,
  getFocusableElements,
  getFirstFocusable,
  getLastFocusable,
  getActiveElement,
  focusElement,
  saveFocus,
  restoreFocus,
  clearSavedFocus,
  isFocusWithin,
} from '../../../src/utils/focus'

describe('focus utilities', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    vi.useRealTimers()
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    clearSavedFocus()
  })

  describe('FOCUSABLE_SELECTOR', () => {
    it('should be a valid CSS selector', () => {
      expect(() => document.querySelectorAll(FOCUSABLE_SELECTOR)).not.toThrow()
    })
  })

  describe('isFocusable', () => {
    it('should return true for focusable button', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      expect(isFocusable(button)).toBe(true)
    })

    it('should return false for disabled button', () => {
      const button = document.createElement('button')
      button.disabled = true
      container.appendChild(button)
      expect(isFocusable(button)).toBe(false)
    })

    it('should return true for input', () => {
      const input = document.createElement('input')
      container.appendChild(input)
      expect(isFocusable(input)).toBe(true)
    })

    it('should return true for anchor with href', () => {
      const anchor = document.createElement('a')
      anchor.href = 'https://example.com'
      container.appendChild(anchor)
      expect(isFocusable(anchor)).toBe(true)
    })

    it('should return false for anchor without href', () => {
      const anchor = document.createElement('a')
      container.appendChild(anchor)
      expect(isFocusable(anchor)).toBe(false)
    })

    it('should return true for element with tabindex=0', () => {
      const div = document.createElement('div')
      div.tabIndex = 0
      container.appendChild(div)
      expect(isFocusable(div)).toBe(true)
    })

    it('should return false for element with tabindex=-1', () => {
      const div = document.createElement('div')
      div.tabIndex = -1
      container.appendChild(div)
      expect(isFocusable(div)).toBe(false)
    })

    it('should return false for non-element', () => {
      const text = document.createTextNode('text')
      expect(isFocusable(text as unknown as Element)).toBe(false)
    })
  })

  describe('getFocusableElements', () => {
    it('should return all focusable elements', () => {
      container.innerHTML = `
        <button>Button 1</button>
        <input type="text" />
        <button disabled>Disabled</button>
        <a href="#">Link</a>
      `
      const focusables = getFocusableElements(container)
      expect(focusables).toHaveLength(3)
    })

    it('should return empty array for container with no focusables', () => {
      container.innerHTML = '<div><span>Text</span></div>'
      const focusables = getFocusableElements(container)
      expect(focusables).toHaveLength(0)
    })
  })

  describe('getFirstFocusable', () => {
    it('should return first focusable element', () => {
      container.innerHTML = `
        <button id="first">First</button>
        <button id="second">Second</button>
      `
      const first = getFirstFocusable(container)
      expect(first?.id).toBe('first')
    })

    it('should return null if no focusables', () => {
      container.innerHTML = '<div>No focusables</div>'
      expect(getFirstFocusable(container)).toBeNull()
    })
  })

  describe('getLastFocusable', () => {
    it('should return last focusable element', () => {
      container.innerHTML = `
        <button id="first">First</button>
        <button id="last">Last</button>
      `
      const last = getLastFocusable(container)
      expect(last?.id).toBe('last')
    })

    it('should return null if no focusables', () => {
      container.innerHTML = '<div>No focusables</div>'
      expect(getLastFocusable(container)).toBeNull()
    })
  })

  describe('getActiveElement', () => {
    it('should return currently focused element', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      button.focus()
      expect(getActiveElement()).toBe(button)
    })
  })

  describe('focusElement', () => {
    it('should focus the element', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      const result = focusElement(button)
      expect(result).toBe(true)
      expect(document.activeElement).toBe(button)
    })

    it('should return false for null', () => {
      expect(focusElement(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(focusElement(undefined)).toBe(false)
    })
  })

  describe('saveFocus and restoreFocus', () => {
    it('should save and restore focus', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      button.focus()

      saveFocus()

      const input = document.createElement('input')
      container.appendChild(input)
      input.focus()

      restoreFocus()
      expect(document.activeElement).toBe(button)
    })

    it('should handle element removed from DOM', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      button.focus()

      saveFocus()
      button.remove()

      expect(() => restoreFocus()).not.toThrow()
    })

    it('should save focus when no element is focused', () => {
      // Blur any currently focused element
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }

      // Should not throw when nothing is focused
      expect(() => saveFocus()).not.toThrow()

      // Restore should also not throw
      expect(() => restoreFocus()).not.toThrow()
    })
  })

  describe('clearSavedFocus', () => {
    it('should clear saved focus', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      button.focus()

      saveFocus()
      clearSavedFocus()

      const input = document.createElement('input')
      container.appendChild(input)
      input.focus()

      restoreFocus()
      // Should not change focus since saved focus was cleared
      expect(document.activeElement).toBe(input)
    })
  })

  describe('isFocusWithin', () => {
    it('should return true if focus is within container', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      button.focus()
      expect(isFocusWithin(container)).toBe(true)
    })

    it('should return false if focus is outside container', () => {
      const button = document.createElement('button')
      document.body.appendChild(button)
      button.focus()
      expect(isFocusWithin(container)).toBe(false)
      button.remove()
    })
  })
})
