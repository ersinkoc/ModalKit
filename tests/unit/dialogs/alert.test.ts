import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { alert } from '../../../src/dialogs/alert'
import { modalStack } from '../../../src/core/stack'

describe('alert dialog', () => {
  beforeEach(() => {
    vi.useRealTimers()
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  afterEach(() => {
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  describe('alert with string', () => {
    it('should show dialog with message', async () => {
      const promise = alert('Operation completed!')

      await new Promise((r) => setTimeout(r, 0))

      const content = document.querySelector('[data-modalkit-content]')
      expect(content).not.toBeNull()
      expect(content?.textContent).toContain('Operation completed!')

      // Click OK to close
      const okBtn = document.querySelector('button')
      okBtn?.click()

      await promise
    })

    it('should resolve when OK is clicked', async () => {
      const promise = alert('Success!')

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button')
      okBtn?.click()

      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('alert with options', () => {
    it('should show title when provided', async () => {
      const promise = alert({
        title: 'Success',
        message: 'Your changes have been saved.',
      })

      await new Promise((r) => setTimeout(r, 0))

      const title = document.querySelector('[data-modalkit-title]')
      expect(title?.textContent).toBe('Success')

      const okBtn = document.querySelector('button')
      okBtn?.click()

      await promise
    })

    it('should use custom confirm text', async () => {
      const promise = alert({
        message: 'Done!',
        confirmText: 'Got it',
      })

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button')
      expect(okBtn?.textContent).toBe('Got it')
      okBtn?.click()

      await promise
    })

    it('should support success variant', async () => {
      const promise = alert({
        message: 'Success!',
        variant: 'success',
      })

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button') as HTMLButtonElement
      // jsdom doesn't normalize colors to RGB, so check for either format
      expect(['#10b981', 'rgb(16, 185, 129)']).toContain(okBtn.style.backgroundColor)
      okBtn?.click()

      await promise
    })

    it('should support error variant', async () => {
      const promise = alert({
        message: 'Error!',
        variant: 'error',
      })

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button') as HTMLButtonElement
      expect(['#ef4444', 'rgb(239, 68, 68)']).toContain(okBtn.style.backgroundColor)
      okBtn?.click()

      await promise
    })

    it('should support warning variant', async () => {
      const promise = alert({
        message: 'Warning!',
        variant: 'warning',
      })

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button') as HTMLButtonElement
      expect(['#f59e0b', 'rgb(245, 158, 11)']).toContain(okBtn.style.backgroundColor)
      okBtn?.click()

      await promise
    })

    it('should support info variant', async () => {
      const promise = alert({
        message: 'Info!',
        variant: 'info',
      })

      await new Promise((r) => setTimeout(r, 0))

      const okBtn = document.querySelector('button') as HTMLButtonElement
      expect(['#3b82f6', 'rgb(59, 130, 246)']).toContain(okBtn.style.backgroundColor)
      okBtn?.click()

      await promise
    })
  })

  describe('close behavior', () => {
    it('should close on escape and resolve', async () => {
      const promise = alert('Message')

      await new Promise((r) => setTimeout(r, 0))

      // Find the content element and dispatch escape on it
      const content = document.querySelector('[data-modalkit-content]')
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      })
      content?.dispatchEvent(event)

      await expect(promise).resolves.toBeUndefined()
    })
  })
})
