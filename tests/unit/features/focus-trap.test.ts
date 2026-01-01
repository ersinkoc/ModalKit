import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createFocusTrap } from '../../../src/features/focus-trap'

describe('focus-trap', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    vi.useRealTimers()
    container = document.createElement('div')
    container.innerHTML = `
      <button id="first">First</button>
      <input id="middle" type="text" />
      <button id="last">Last</button>
    `
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('createFocusTrap', () => {
    it('should create a focus trap', () => {
      const trap = createFocusTrap({ container })
      expect(trap).toBeDefined()
      expect(trap.isActive()).toBe(false)
    })
  })

  describe('activate', () => {
    it('should activate the trap', () => {
      const trap = createFocusTrap({ container })
      trap.activate()
      expect(trap.isActive()).toBe(true)
      trap.deactivate()
    })

    it('should focus first focusable element', () => {
      const trap = createFocusTrap({ container })
      trap.activate()
      expect(document.activeElement).toBe(container.querySelector('#first'))
      trap.deactivate()
    })

    it('should focus initial focus element', () => {
      const middle = container.querySelector('#middle') as HTMLInputElement
      const trap = createFocusTrap({ container, initialFocus: middle })
      trap.activate()
      expect(document.activeElement).toBe(middle)
      trap.deactivate()
    })

    it('should focus initial focus from function', () => {
      const trap = createFocusTrap({
        container,
        initialFocus: () => container.querySelector('#last') as HTMLElement,
      })
      trap.activate()
      expect(document.activeElement).toBe(container.querySelector('#last'))
      trap.deactivate()
    })

    it('should call onActivate callback', () => {
      const onActivate = vi.fn()
      const trap = createFocusTrap({ container, onActivate })
      trap.activate()
      expect(onActivate).toHaveBeenCalled()
      trap.deactivate()
    })

    it('should not re-activate if already active', () => {
      const onActivate = vi.fn()
      const trap = createFocusTrap({ container, onActivate })
      trap.activate()
      trap.activate()
      expect(onActivate).toHaveBeenCalledTimes(1)
      trap.deactivate()
    })
  })

  describe('deactivate', () => {
    it('should deactivate the trap', () => {
      const trap = createFocusTrap({ container })
      trap.activate()
      trap.deactivate()
      expect(trap.isActive()).toBe(false)
    })

    it('should call onDeactivate callback', () => {
      const onDeactivate = vi.fn()
      const trap = createFocusTrap({ container, onDeactivate })
      trap.activate()
      trap.deactivate()
      expect(onDeactivate).toHaveBeenCalled()
    })

    it('should not fail if not active', () => {
      const trap = createFocusTrap({ container })
      expect(() => trap.deactivate()).not.toThrow()
    })

    it('should restore focus to returnFocus element', () => {
      const externalButton = document.createElement('button')
      externalButton.id = 'external'
      document.body.appendChild(externalButton)
      externalButton.focus()

      const trap = createFocusTrap({
        container,
        returnFocus: externalButton,
      })
      trap.activate()
      trap.deactivate()

      expect(document.activeElement).toBe(externalButton)
      externalButton.remove()
    })
  })

  describe('pause and unpause', () => {
    it('should pause the trap', () => {
      const trap = createFocusTrap({ container })
      trap.activate()
      trap.pause()
      expect(trap.isPaused()).toBe(true)
      trap.deactivate()
    })

    it('should unpause the trap', () => {
      const trap = createFocusTrap({ container })
      trap.activate()
      trap.pause()
      trap.unpause()
      expect(trap.isPaused()).toBe(false)
      trap.deactivate()
    })

    it('should not pause if not active', () => {
      const trap = createFocusTrap({ container })
      trap.pause()
      expect(trap.isPaused()).toBe(false)
    })
  })

  describe('tab key handling', () => {
    it('should cycle focus on Tab at end', () => {
      const trap = createFocusTrap({ container })
      trap.activate()

      const last = container.querySelector('#last') as HTMLElement
      last.focus()

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      expect(document.activeElement).toBe(container.querySelector('#first'))
      trap.deactivate()
    })

    it('should cycle focus on Shift+Tab at start', () => {
      const trap = createFocusTrap({ container })
      trap.activate()

      const first = container.querySelector('#first') as HTMLElement
      first.focus()

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      expect(document.activeElement).toBe(container.querySelector('#last'))
      trap.deactivate()
    })
  })

  describe('escape key handling', () => {
    it('should deactivate on Escape when escapeDeactivates is true', () => {
      const trap = createFocusTrap({ container, escapeDeactivates: true })
      trap.activate()

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      expect(trap.isActive()).toBe(false)
    })

    it('should not deactivate on Escape when escapeDeactivates is false', () => {
      const trap = createFocusTrap({ container, escapeDeactivates: false })
      trap.activate()

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      expect(trap.isActive()).toBe(true)
      trap.deactivate()
    })

    it('should not deactivate on Escape when paused', () => {
      const trap = createFocusTrap({ container, escapeDeactivates: true })
      trap.activate()
      trap.pause()

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      expect(trap.isActive()).toBe(true)
      trap.unpause()
      trap.deactivate()
    })

    it('should ignore Escape key when not active', () => {
      const trap = createFocusTrap({ container, escapeDeactivates: true })
      // Don't activate the trap

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      document.dispatchEvent(event)

      // Should remain inactive
      expect(trap.isActive()).toBe(false)
    })
  })

  describe('click outside handling', () => {
    it('should deactivate on click outside when clickOutsideDeactivates is true', () => {
      const trap = createFocusTrap({ container, clickOutsideDeactivates: true })
      trap.activate()

      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      document.body.dispatchEvent(event)

      expect(trap.isActive()).toBe(false)
    })

    it('should not deactivate on click inside', () => {
      const trap = createFocusTrap({ container, clickOutsideDeactivates: true })
      trap.activate()

      const button = container.querySelector('#first') as HTMLElement
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      button.dispatchEvent(event)

      expect(trap.isActive()).toBe(true)
      trap.deactivate()
    })

    it('should allow outside click when allowOutsideClick is true', () => {
      const trap = createFocusTrap({
        container,
        clickOutsideDeactivates: false,
        allowOutsideClick: true,
      })
      trap.activate()

      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      document.body.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(false)
      trap.deactivate()
    })

    it('should allow outside click with function', () => {
      const allowOutsideClick = vi.fn(() => true)
      const trap = createFocusTrap({
        container,
        clickOutsideDeactivates: false,
        allowOutsideClick,
      })
      trap.activate()

      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      document.body.dispatchEvent(event)

      expect(allowOutsideClick).toHaveBeenCalled()
      trap.deactivate()
    })
  })

  describe('focus leaving container', () => {
    it('should bring focus back when focus leaves', () => {
      const trap = createFocusTrap({ container })
      trap.activate()

      const externalButton = document.createElement('button')
      document.body.appendChild(externalButton)

      // Simulate focusin event from outside
      const event = new FocusEvent('focusin', {
        bubbles: true,
        relatedTarget: container.querySelector('#first'),
      })
      Object.defineProperty(event, 'target', { value: externalButton })
      document.dispatchEvent(event)

      // Focus should be brought back
      expect(container.contains(document.activeElement)).toBe(true)

      externalButton.remove()
      trap.deactivate()
    })
  })

  describe('empty container', () => {
    it('should focus container if no focusable elements', () => {
      const emptyContainer = document.createElement('div')
      document.body.appendChild(emptyContainer)

      const trap = createFocusTrap({ container: emptyContainer })
      trap.activate()

      expect(document.activeElement).toBe(emptyContainer)

      trap.deactivate()
      emptyContainer.remove()
    })
  })
})
