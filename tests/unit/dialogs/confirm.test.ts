import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { confirm } from '../../../src/dialogs/confirm'
import { modalStack } from '../../../src/core/stack'

describe('confirm dialog', () => {
  beforeEach(() => {
    vi.useRealTimers()
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  afterEach(() => {
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  describe('confirm with string', () => {
    it('should show dialog with message', async () => {
      const promise = confirm('Are you sure?')

      // Wait for dialog to be created
      await new Promise((r) => setTimeout(r, 0))

      const content = document.querySelector('[data-modalkit-content]')
      expect(content).not.toBeNull()
      expect(content?.textContent).toContain('Are you sure?')

      // Click cancel to close
      const buttons = document.querySelectorAll('button')
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      const result = await promise
      expect(result).toBe(false)
    })

    it('should return true when confirm is clicked', async () => {
      const promise = confirm('Are you sure?')

      await new Promise((r) => setTimeout(r, 0))

      const buttons = document.querySelectorAll('button')
      const confirmBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Confirm')
      )
      confirmBtn?.click()

      const result = await promise
      expect(result).toBe(true)
    })
  })

  describe('confirm with options', () => {
    it('should show title when provided', async () => {
      const promise = confirm({
        title: 'Delete Item',
        message: 'Are you sure?',
      })

      await new Promise((r) => setTimeout(r, 0))

      const title = document.querySelector('[data-modalkit-title]')
      expect(title?.textContent).toBe('Delete Item')

      const cancelBtn = document.querySelector(
        'button:not([data-modalkit-close])'
      )
      ;(cancelBtn as HTMLButtonElement)?.click()

      await promise
    })

    it('should use custom button text', async () => {
      const promise = confirm({
        message: 'Are you sure?',
        confirmText: 'Yes',
        cancelText: 'No',
      })

      await new Promise((r) => setTimeout(r, 0))

      const buttons = document.querySelectorAll('button')
      const buttonTexts = Array.from(buttons).map((b) => b.textContent)
      expect(buttonTexts).toContain('Yes')
      expect(buttonTexts).toContain('No')

      const noBtn = Array.from(buttons).find((b) => b.textContent === 'No')
      noBtn?.click()

      await promise
    })
  })

  describe('confirm with custom buttons', () => {
    it('should show custom buttons', async () => {
      const promise = confirm({
        message: 'What do you want to do?',
        buttons: [
          { text: 'Save', value: 'save', variant: 'primary' },
          { text: 'Discard', value: 'discard', variant: 'danger' },
          { text: 'Cancel', value: false },
        ],
      })

      await new Promise((r) => setTimeout(r, 0))

      const buttons = document.querySelectorAll('button')
      expect(buttons.length).toBe(3)

      const discardBtn = Array.from(buttons).find(
        (b) => b.textContent === 'Discard'
      )
      discardBtn?.click()

      const result = await promise
      expect(result).toBe('discard')
    })
  })

  describe('close behavior', () => {
    it('should close on escape and return false', async () => {
      const promise = confirm('Are you sure?')

      await new Promise((r) => setTimeout(r, 0))

      // Find the content element and dispatch escape on it
      const content = document.querySelector('[data-modalkit-content]')
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      })
      content?.dispatchEvent(event)

      const result = await promise
      expect(result).toBe(false)
    })
  })
})
