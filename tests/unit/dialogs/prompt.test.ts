import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { prompt } from '../../../src/dialogs/prompt'
import { modalStack } from '../../../src/core/stack'

describe('prompt dialog', () => {
  beforeEach(() => {
    vi.useRealTimers()
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  afterEach(() => {
    modalStack.closeAll()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  describe('prompt with string', () => {
    it('should show dialog with message', async () => {
      const promise = prompt('What is your name?')

      await new Promise((r) => setTimeout(r, 0))

      const content = document.querySelector('[data-modalkit-content]')
      expect(content).not.toBeNull()
      expect(content?.textContent).toContain('What is your name?')

      // Click cancel to close
      const buttons = document.querySelectorAll('button')
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      const result = await promise
      expect(result).toBeNull()
    })

    it('should return input value when confirmed', async () => {
      const promise = prompt('What is your name?')

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'John'
      input.dispatchEvent(new Event('input'))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      const result = await promise
      expect(result).toBe('John')
    })
  })

  describe('prompt with options', () => {
    it('should show title when provided', async () => {
      const promise = prompt({
        title: 'Enter Name',
        message: 'Please enter your name:',
      })

      await new Promise((r) => setTimeout(r, 0))

      const title = document.querySelector('[data-modalkit-title]')
      expect(title?.textContent).toBe('Enter Name')

      const cancelBtn = document.querySelector(
        'button:first-of-type'
      ) as HTMLButtonElement
      cancelBtn?.click()

      await promise
    })

    it('should use placeholder', async () => {
      const promise = prompt({
        message: 'Enter email:',
        placeholder: 'email@example.com',
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      expect(input.placeholder).toBe('email@example.com')

      const buttons = document.querySelectorAll('button')
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      await promise
    })

    it('should use default value', async () => {
      const promise = prompt({
        message: 'Enter name:',
        defaultValue: 'John Doe',
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('John Doe')

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      const result = await promise
      expect(result).toBe('John Doe')
    })

    it('should submit on Enter key', async () => {
      const promise = prompt('Enter name:')

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'Jane'
      input.dispatchEvent(new Event('input'))

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      })
      input.dispatchEvent(event)

      const result = await promise
      expect(result).toBe('Jane')
    })
  })

  describe('validation', () => {
    it('should validate required field', async () => {
      const promise = prompt({
        message: 'Enter name:',
        required: true,
      })

      await new Promise((r) => setTimeout(r, 0))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      await new Promise((r) => setTimeout(r, 0))

      // Should show error and stay open
      expect(document.querySelector('[data-modalkit-content]')).not.toBeNull()
      expect(document.body.textContent).toContain('required')

      // Now enter value and submit
      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'John'
      input.dispatchEvent(new Event('input'))
      okBtn?.click()

      const result = await promise
      expect(result).toBe('John')
    })

    it('should validate min length', async () => {
      const promise = prompt({
        message: 'Enter name:',
        minLength: 3,
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'Jo'
      input.dispatchEvent(new Event('input'))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      await new Promise((r) => setTimeout(r, 0))

      // Should show error
      expect(document.body.textContent).toContain('Minimum 3 characters')

      // Enter valid value
      input.value = 'John'
      input.dispatchEvent(new Event('input'))
      okBtn?.click()

      const result = await promise
      expect(result).toBe('John')
    })

    it('should validate max length', async () => {
      const promise = prompt({
        message: 'Enter code:',
        maxLength: 4,
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = '12345'
      input.dispatchEvent(new Event('input'))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      await new Promise((r) => setTimeout(r, 0))

      // Should show error
      expect(document.body.textContent).toContain('Maximum 4 characters')

      // Enter valid value
      input.value = '1234'
      input.dispatchEvent(new Event('input'))
      okBtn?.click()

      const result = await promise
      expect(result).toBe('1234')
    })

    it('should use custom validation', async () => {
      const promise = prompt({
        message: 'Enter email:',
        validate: (value) => {
          if (!value.includes('@')) {
            return 'Invalid email'
          }
          return true
        },
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'invalid'
      input.dispatchEvent(new Event('input'))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      await new Promise((r) => setTimeout(r, 0))

      // Should show error
      expect(document.body.textContent).toContain('Invalid email')

      // Enter valid value
      input.value = 'test@example.com'
      input.dispatchEvent(new Event('input'))
      okBtn?.click()

      const result = await promise
      expect(result).toBe('test@example.com')
    })

    it('should handle validation returning false', async () => {
      const promise = prompt({
        message: 'Enter value:',
        validate: () => false,
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      input.value = 'test'
      input.dispatchEvent(new Event('input'))

      const buttons = document.querySelectorAll('button')
      const okBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('OK')
      )
      okBtn?.click()

      await new Promise((r) => setTimeout(r, 0))

      // Should show generic error
      expect(document.body.textContent).toContain('Invalid input')

      // Cancel to close
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      const result = await promise
      expect(result).toBeNull()
    })
  })

  describe('input types', () => {
    it('should use password type', async () => {
      const promise = prompt({
        message: 'Enter password:',
        type: 'password',
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      expect(input.type).toBe('password')

      const buttons = document.querySelectorAll('button')
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      await promise
    })

    it('should use email type', async () => {
      const promise = prompt({
        message: 'Enter email:',
        type: 'email',
      })

      await new Promise((r) => setTimeout(r, 0))

      const input = document.querySelector('input') as HTMLInputElement
      expect(input.type).toBe('email')

      const buttons = document.querySelectorAll('button')
      const cancelBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes('Cancel')
      )
      cancelBtn?.click()

      await promise
    })
  })

  describe('close behavior', () => {
    it('should return null on escape', async () => {
      const promise = prompt('Enter name:')

      await new Promise((r) => setTimeout(r, 0))

      // Find the content element and dispatch escape on it
      const content = document.querySelector('[data-modalkit-content]')
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      })
      content?.dispatchEvent(event)

      const result = await promise
      expect(result).toBeNull()
    })
  })
})
