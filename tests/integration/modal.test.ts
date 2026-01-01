import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createModal } from '../../src/core/modal'
import { modalStack } from '../../src/core/stack'
import { resetScrollLock, scrollLock } from '../../src/features/scroll-lock'

describe('Modal Integration', () => {
  beforeEach(() => {
    vi.useRealTimers()
    modalStack.closeAll()
    resetScrollLock()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  afterEach(() => {
    modalStack.closeAll()
    resetScrollLock()
    document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())
  })

  describe('Full lifecycle', () => {
    it('should complete open and close cycle', () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()
      const onOpenChange = vi.fn()

      const modal = createModal({
        onOpen,
        onClose,
        onOpenChange,
        preventScroll: true,
        trapFocus: true,
      })

      // Open
      modal.open()
      expect(modal.isOpen()).toBe(true)
      expect(modal.isMounted()).toBe(true)
      expect(onOpen).toHaveBeenCalled()
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(scrollLock.isLocked()).toBe(true)
      expect(modalStack.count()).toBe(1)

      // Close
      modal.close()
      expect(modal.isOpen()).toBe(false)
      expect(onClose).toHaveBeenCalled()
      expect(onOpenChange).toHaveBeenCalledWith(false)
      expect(scrollLock.isLocked()).toBe(false)
      expect(modalStack.isEmpty()).toBe(true)
    })

    it('should render with props getters', () => {
      const modal = createModal()
      modal.open()

      // Create DOM structure using props getters
      const portal = document.createElement('div')
      const portalProps = modal.getPortalProps()
      Object.entries(portalProps).forEach(([key, value]) => {
        portal.setAttribute(key, String(value))
      })

      const overlay = document.createElement('div')
      const overlayProps = modal.getOverlayProps()
      overlayProps.ref(overlay)
      overlay.setAttribute('data-modalkit-overlay', '')
      Object.assign(overlay.style, overlayProps.style)

      const container = document.createElement('div')
      const containerProps = modal.getContainerProps()
      containerProps.ref(container)
      Object.assign(container.style, containerProps.style)

      const content = document.createElement('div')
      const contentProps = modal.getContentProps()
      contentProps.ref(content)
      content.setAttribute('role', contentProps.role)
      content.setAttribute('aria-modal', String(contentProps['aria-modal']))

      // Verify structure
      expect(overlayProps.style.position).toBe('fixed')
      expect(containerProps.style.display).toBe('flex')
      expect(contentProps.role).toBe('dialog')
      expect(contentProps['aria-modal']).toBe(true)

      modal.close()
    })
  })

  describe('Keyboard handling', () => {
    it('should close on Escape when enabled', () => {
      const modal = createModal({ closeOnEscape: true })
      modal.open()

      // Simulate content element
      const content = document.createElement('div')
      const contentProps = modal.getContentProps()
      contentProps.ref(content)

      // Trigger keydown
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      contentProps.onKeyDown(event)

      expect(modal.isOpen()).toBe(false)
    })

    it('should not close on Escape when disabled', () => {
      const modal = createModal({ closeOnEscape: false })
      modal.open()

      const content = document.createElement('div')
      const contentProps = modal.getContentProps()
      contentProps.ref(content)

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      contentProps.onKeyDown(event)

      expect(modal.isOpen()).toBe(true)
      modal.close()
    })

    it('should call onEscapeKeyDown callback', () => {
      const onEscapeKeyDown = vi.fn()
      const modal = createModal({ closeOnEscape: true, onEscapeKeyDown })
      modal.open()

      const content = document.createElement('div')
      const contentProps = modal.getContentProps()
      contentProps.ref(content)

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      contentProps.onKeyDown(event)

      expect(onEscapeKeyDown).toHaveBeenCalledWith(event)
    })
  })

  describe('Overlay click handling', () => {
    it('should close on overlay click when enabled', () => {
      const modal = createModal({ closeOnOverlayClick: true })
      modal.open()

      const overlay = document.createElement('div')
      const overlayProps = modal.getOverlayProps()
      overlayProps.ref(overlay)

      // Click directly on overlay
      const event = {
        target: overlay,
        defaultPrevented: false,
        preventDefault: vi.fn(),
      } as unknown as MouseEvent

      overlayProps.onClick(event)

      expect(modal.isOpen()).toBe(false)
    })

    it('should not close on content click', () => {
      const modal = createModal({ closeOnOverlayClick: true })
      modal.open()

      const content = document.createElement('div')
      const overlayProps = modal.getOverlayProps()
      overlayProps.ref(null) // Clear overlay ref

      const containerProps = modal.getContainerProps()
      containerProps.ref(null) // Clear container ref

      const contentProps = modal.getContentProps()
      contentProps.ref(content)

      // Simulate click on content (not overlay)
      const event = {
        target: content,
        defaultPrevented: false,
        preventDefault: vi.fn(),
      } as unknown as MouseEvent

      overlayProps.onClick(event)

      expect(modal.isOpen()).toBe(true)
      modal.close()
    })

    it('should call onOverlayClick callback', () => {
      const onOverlayClick = vi.fn()
      const modal = createModal({ closeOnOverlayClick: true, onOverlayClick })
      modal.open()

      const overlay = document.createElement('div')
      const overlayProps = modal.getOverlayProps()
      overlayProps.ref(overlay)

      const event = {
        target: overlay,
        defaultPrevented: false,
        preventDefault: vi.fn(),
      } as unknown as MouseEvent

      overlayProps.onClick(event)

      expect(onOverlayClick).toHaveBeenCalledWith(event)
    })
  })

  describe('Trigger integration', () => {
    it('should open modal when trigger is clicked', () => {
      const modal = createModal()
      const triggerProps = modal.getTriggerProps()

      const button = document.createElement('button')
      button.addEventListener('click', (e) => {
        triggerProps.onClick(e)
      })

      const event = new MouseEvent('click', { bubbles: true })
      button.dispatchEvent(event)

      expect(modal.isOpen()).toBe(true)
      modal.close()
    })

    it('should update aria-expanded on trigger', () => {
      const modal = createModal()

      expect(modal.getTriggerProps()['aria-expanded']).toBe(false)

      modal.open()
      expect(modal.getTriggerProps()['aria-expanded']).toBe(true)

      modal.close()
      expect(modal.getTriggerProps()['aria-expanded']).toBe(false)
    })
  })

  describe('Close button integration', () => {
    it('should close modal when close button is clicked', () => {
      const modal = createModal({ defaultOpen: true })
      const closeProps = modal.getCloseButtonProps()

      const button = document.createElement('button')
      button.addEventListener('click', () => {
        closeProps.onClick(new MouseEvent('click'))
      })

      button.click()

      expect(modal.isOpen()).toBe(false)
    })
  })

  describe('Multiple modals', () => {
    it('should handle multiple modals correctly', () => {
      const modal1 = createModal()
      const modal2 = createModal()
      const modal3 = createModal()

      modal1.open()
      modal2.open()
      modal3.open()

      expect(modalStack.count()).toBe(3)
      expect(modal1.getStackOrder()).toBe(1)
      expect(modal2.getStackOrder()).toBe(2)
      expect(modal3.getStackOrder()).toBe(3)

      expect(modal1.isTopMost()).toBe(false)
      expect(modal2.isTopMost()).toBe(false)
      expect(modal3.isTopMost()).toBe(true)

      modal2.close()

      expect(modalStack.count()).toBe(2)
      expect(modal1.getStackOrder()).toBe(1)
      expect(modal3.getStackOrder()).toBe(2)
      expect(modal3.isTopMost()).toBe(true)

      modal1.close()
      modal3.close()
    })

    it('should only allow top-most to close on Escape', () => {
      const modal1 = createModal({ closeOnEscape: true })
      const modal2 = createModal({ closeOnEscape: true })

      modal1.open()
      modal2.open()

      // Create content for modal1
      const content1 = document.createElement('div')
      const content1Props = modal1.getContentProps()
      content1Props.ref(content1)

      // Escape on modal1 should not close it (not top-most)
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
      content1Props.onKeyDown(event)

      expect(modal1.isOpen()).toBe(true)
      expect(modal2.isOpen()).toBe(true)

      // Close from top-most
      const content2 = document.createElement('div')
      const content2Props = modal2.getContentProps()
      content2Props.ref(content2)
      content2Props.onKeyDown(event)

      expect(modal2.isOpen()).toBe(false)
      expect(modal1.isOpen()).toBe(true)

      modal1.close()
    })
  })

  describe('Scroll lock with multiple modals', () => {
    it('should maintain scroll lock with nested modals', () => {
      const modal1 = createModal({ preventScroll: true })
      const modal2 = createModal({ preventScroll: true })

      modal1.open()
      expect(scrollLock.isLocked()).toBe(true)

      modal2.open()
      expect(scrollLock.isLocked()).toBe(true)

      modal2.close()
      expect(scrollLock.isLocked()).toBe(true) // Still locked by modal1

      modal1.close()
      expect(scrollLock.isLocked()).toBe(false)
    })
  })
})
