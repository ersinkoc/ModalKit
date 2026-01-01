import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createModal } from '../../../src/core/modal'
import { modalStack } from '../../../src/core/stack'
import { resetScrollLock } from '../../../src/features/scroll-lock'

describe('modal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    modalStack.closeAll()
    resetScrollLock()
  })

  afterEach(() => {
    modalStack.closeAll()
    resetScrollLock()
    vi.useRealTimers()
  })

  describe('createModal', () => {
    it('should create a modal instance', () => {
      const modal = createModal()
      expect(modal).toBeDefined()
      expect(modal.isOpen()).toBe(false)
    })

    it('should start open when defaultOpen is true', () => {
      const modal = createModal({ defaultOpen: true })
      expect(modal.isOpen()).toBe(true)
      modal.close()
    })

    it('should start open when open is true', () => {
      const modal = createModal({ open: true })
      expect(modal.isOpen()).toBe(true)
      modal.close()
    })
  })

  describe('open/close', () => {
    it('should open the modal', () => {
      const modal = createModal()
      modal.open()
      expect(modal.isOpen()).toBe(true)
      modal.close()
    })

    it('should close the modal', () => {
      const modal = createModal({ defaultOpen: true })
      modal.close()
      expect(modal.isOpen()).toBe(false)
    })

    it('should toggle the modal', () => {
      const modal = createModal()
      modal.toggle()
      expect(modal.isOpen()).toBe(true)
      modal.toggle()
      expect(modal.isOpen()).toBe(false)
    })

    it('should call onOpen callback', () => {
      const onOpen = vi.fn()
      const modal = createModal({ onOpen })
      modal.open()
      expect(onOpen).toHaveBeenCalled()
      modal.close()
    })

    it('should call onClose callback', () => {
      const onClose = vi.fn()
      const modal = createModal({ onClose, defaultOpen: true })
      modal.close()
      expect(onClose).toHaveBeenCalled()
    })

    it('should call onOpenChange callback', () => {
      const onOpenChange = vi.fn()
      const modal = createModal({ onOpenChange })

      modal.open()
      expect(onOpenChange).toHaveBeenCalledWith(true)

      modal.close()
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('should not re-open if already open', () => {
      const onOpen = vi.fn()
      const modal = createModal({ onOpen, defaultOpen: true })
      modal.open()
      expect(onOpen).toHaveBeenCalledTimes(0) // Only called on initial open
    })

    it('should not re-close if already closed', () => {
      const onClose = vi.fn()
      const modal = createModal({ onClose })
      modal.close()
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('state', () => {
    it('should return correct state', () => {
      const modal = createModal()
      const state = modal.getState()
      expect(state.open).toBe(false)
      expect(state.animationState).toBe('idle')
      expect(state.stackOrder).toBe(0)
      expect(state.isTopMost).toBe(false)
      expect(state.mounted).toBe(false)
    })

    it('should update state on open', () => {
      const modal = createModal()
      modal.open()
      const state = modal.getState()
      expect(state.open).toBe(true)
      expect(state.mounted).toBe(true)
      modal.close()
    })

    it('should subscribe to state changes', () => {
      const modal = createModal()
      const callback = vi.fn()
      modal.subscribe(callback)

      modal.open()
      expect(callback).toHaveBeenCalled()
      modal.close()
    })

    it('should return unsubscribe function', () => {
      const modal = createModal()
      const callback = vi.fn()
      const unsubscribe = modal.subscribe(callback)

      unsubscribe()
      modal.open()
      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('isMounted', () => {
    it('should return false when closed', () => {
      const modal = createModal()
      expect(modal.isMounted()).toBe(false)
    })

    it('should return true when open', () => {
      const modal = createModal({ defaultOpen: true })
      expect(modal.isMounted()).toBe(true)
      modal.close()
    })
  })

  describe('stack integration', () => {
    it('should add to stack on open', () => {
      const modal = createModal()
      modal.open()
      expect(modalStack.count()).toBe(1)
      modal.close()
    })

    it('should remove from stack on close', () => {
      const modal = createModal({ defaultOpen: true })
      modal.close()
      expect(modalStack.isEmpty()).toBe(true)
    })

    it('should update stack order', () => {
      const modal1 = createModal()
      const modal2 = createModal()

      modal1.open()
      modal2.open()

      expect(modal1.getStackOrder()).toBe(1)
      expect(modal2.getStackOrder()).toBe(2)

      modal1.close()
      modal2.close()
    })

    it('should update isTopMost', () => {
      const modal1 = createModal()
      const modal2 = createModal()

      modal1.open()
      expect(modal1.isTopMost()).toBe(true)

      modal2.open()
      expect(modal1.isTopMost()).toBe(false)
      expect(modal2.isTopMost()).toBe(true)

      modal1.close()
      modal2.close()
    })
  })

  describe('animation', () => {
    it('should not animate by default', () => {
      const modal = createModal()
      modal.open()
      expect(modal.getAnimationState()).toBe('entered')
      modal.close()
    })

    it('should animate when enabled', () => {
      const modal = createModal({ animated: true, animationDuration: 200 })
      modal.open()
      expect(modal.getAnimationState()).toBe('entering')
      expect(modal.isAnimating()).toBe(true)

      vi.advanceTimersByTime(200)
      expect(modal.getAnimationState()).toBe('entered')
      expect(modal.isAnimating()).toBe(false)

      modal.close()
    })

    it('should call animation callbacks', () => {
      const onAnimationStart = vi.fn()
      const onAnimationEnd = vi.fn()
      const modal = createModal({
        animated: true,
        animationDuration: 200,
        onAnimationStart,
        onAnimationEnd,
      })

      modal.open()
      expect(onAnimationStart).toHaveBeenCalledWith('enter')

      vi.advanceTimersByTime(200)
      expect(onAnimationEnd).toHaveBeenCalledWith('enter')

      modal.close()
    })
  })

  describe('config', () => {
    it('should return config', () => {
      const modal = createModal({ closeOnEscape: false })
      const config = modal.getConfig()
      expect(config.closeOnEscape).toBe(false)
    })

    it('should update config', () => {
      const modal = createModal()
      modal.setConfig({ closeOnEscape: false })
      expect(modal.getConfig().closeOnEscape).toBe(false)
    })
  })

  describe('destroy', () => {
    it('should close modal on destroy', () => {
      const modal = createModal({ defaultOpen: true })
      modal.destroy()
      expect(modal.isOpen()).toBe(false)
    })

    it('should cleanup resources', () => {
      const modal = createModal({ defaultOpen: true })
      modal.destroy()
      expect(modalStack.isEmpty()).toBe(true)
    })
  })

  describe('props getters', () => {
    it('should return portal props', () => {
      const modal = createModal()
      const props = modal.getPortalProps()
      expect(props['data-modalkit-portal']).toBe('')
      expect(props['data-state']).toBeDefined()
    })

    it('should return overlay props', () => {
      const modal = createModal()
      modal.open()
      const props = modal.getOverlayProps()
      expect(props['data-modalkit-overlay']).toBe('')
      expect(props.style.position).toBe('fixed')
      expect(typeof props.onClick).toBe('function')
      expect(typeof props.ref).toBe('function')
      modal.close()
    })

    it('should return container props', () => {
      const modal = createModal()
      modal.open()
      const props = modal.getContainerProps()
      expect(props['data-modalkit-container']).toBe('')
      expect(props.style.display).toBe('flex')
      expect(typeof props.ref).toBe('function')
      modal.close()
    })

    it('should return content props', () => {
      const modal = createModal()
      modal.open()
      const props = modal.getContentProps()
      expect(props.role).toBe('dialog')
      expect(props['aria-modal']).toBe(true)
      expect(props['data-modalkit-content']).toBe('')
      expect(typeof props.onKeyDown).toBe('function')
      expect(typeof props.ref).toBe('function')
      modal.close()
    })

    it('should return title props', () => {
      const modal = createModal()
      const props = modal.getTitleProps()
      expect(props.id).toBeDefined()
      expect(props['data-modalkit-title']).toBe('')
    })

    it('should return title props with custom id', () => {
      const modal = createModal()
      const props = modal.getTitleProps('my-title')
      expect(props.id).toBe('my-title')
    })

    it('should return description props', () => {
      const modal = createModal()
      const props = modal.getDescriptionProps()
      expect(props.id).toBeDefined()
      expect(props['data-modalkit-description']).toBe('')
    })

    it('should return close button props', () => {
      const modal = createModal({ defaultOpen: true })
      const props = modal.getCloseButtonProps()
      expect(props.type).toBe('button')
      expect(props['aria-label']).toBe('Close')
      expect(props['data-modalkit-close']).toBe('')
      expect(typeof props.onClick).toBe('function')
      modal.close()
    })

    it('should return trigger props', () => {
      const modal = createModal()
      const props = modal.getTriggerProps()
      expect(props.type).toBe('button')
      expect(props['aria-haspopup']).toBe('dialog')
      expect(props['aria-expanded']).toBe(false)
      expect(props['data-modalkit-trigger']).toBe('')
      expect(typeof props.onClick).toBe('function')
    })

    it('should update trigger aria-expanded', () => {
      const modal = createModal()
      expect(modal.getTriggerProps()['aria-expanded']).toBe(false)
      modal.open()
      expect(modal.getTriggerProps()['aria-expanded']).toBe(true)
      modal.close()
    })
  })

  describe('focus management', () => {
    it('should have focusFirst method', () => {
      const modal = createModal()
      expect(typeof modal.focusFirst).toBe('function')
    })

    it('should have focusLast method', () => {
      const modal = createModal()
      expect(typeof modal.focusLast).toBe('function')
    })

    it('should have contains method', () => {
      const modal = createModal()
      expect(typeof modal.contains).toBe('function')
    })

    it('should return false for contains when no content', () => {
      const modal = createModal()
      expect(modal.contains(document.body)).toBe(false)
    })

    it('should do nothing when focusFirst called without content', () => {
      const modal = createModal()
      // Should not throw
      expect(() => modal.focusFirst()).not.toThrow()
    })

    it('should do nothing when focusLast called without content', () => {
      const modal = createModal()
      // Should not throw
      expect(() => modal.focusLast()).not.toThrow()
    })

    it('should focus first focusable element when content exists', () => {
      const modal = createModal()
      modal.open()

      // Set up content element via ref
      const content = document.createElement('div')
      const button = document.createElement('button')
      button.textContent = 'Click me'
      content.appendChild(button)
      document.body.appendChild(content)

      // Trigger the ref callback to set contentElement
      const props = modal.getContentProps()
      props.ref(content)

      modal.focusFirst()
      expect(document.activeElement).toBe(button)

      modal.close()
      content.remove()
    })

    it('should focus last focusable element when content exists', () => {
      const modal = createModal()
      modal.open()

      // Set up content element via ref
      const content = document.createElement('div')
      const button1 = document.createElement('button')
      button1.textContent = 'First'
      const button2 = document.createElement('button')
      button2.textContent = 'Last'
      content.appendChild(button1)
      content.appendChild(button2)
      document.body.appendChild(content)

      // Trigger the ref callback to set contentElement
      const props = modal.getContentProps()
      props.ref(content)

      modal.focusLast()
      expect(document.activeElement).toBe(button2)

      modal.close()
      content.remove()
    })

    it('should return true for contains when element is inside content', () => {
      const modal = createModal()
      modal.open()

      const content = document.createElement('div')
      const child = document.createElement('span')
      content.appendChild(child)
      document.body.appendChild(content)

      const props = modal.getContentProps()
      props.ref(content)

      expect(modal.contains(child)).toBe(true)
      expect(modal.contains(document.body)).toBe(false)

      modal.close()
      content.remove()
    })

    it('should do nothing when focusFirst has no focusable elements', () => {
      const modal = createModal()
      modal.open()

      const content = document.createElement('div')
      content.textContent = 'No focusable elements'
      document.body.appendChild(content)

      const props = modal.getContentProps()
      props.ref(content)

      // Should not throw
      expect(() => modal.focusFirst()).not.toThrow()

      modal.close()
      content.remove()
    })

    it('should do nothing when focusLast has no focusable elements', () => {
      const modal = createModal()
      modal.open()

      const content = document.createElement('div')
      content.textContent = 'No focusable elements'
      document.body.appendChild(content)

      const props = modal.getContentProps()
      props.ref(content)

      // Should not throw
      expect(() => modal.focusLast()).not.toThrow()

      modal.close()
      content.remove()
    })
  })

  describe('portal', () => {
    it('should return portal target', () => {
      const modal = createModal()
      const target = modal.getPortalTarget()
      expect(target).toBeInstanceOf(HTMLElement)
    })

    it('should use custom portal target', () => {
      const customTarget = document.createElement('div')
      customTarget.id = 'custom-portal'
      document.body.appendChild(customTarget)

      const modal = createModal({ portalTarget: customTarget })
      expect(modal.getPortalTarget()).toBe(customTarget)

      customTarget.remove()
    })
  })

  describe('accessibility', () => {
    it('should use custom role', () => {
      const modal = createModal({ role: 'alertdialog' })
      modal.open()
      const props = modal.getContentProps()
      expect(props.role).toBe('alertdialog')
      modal.close()
    })

    it('should use custom aria-label', () => {
      const modal = createModal({ ariaLabel: 'Custom label' })
      modal.open()
      const props = modal.getContentProps()
      expect(props['aria-label']).toBe('Custom label')
      modal.close()
    })

    it('should use custom aria-labelledby', () => {
      const modal = createModal({ ariaLabelledBy: 'my-title' })
      modal.open()
      const props = modal.getContentProps()
      expect(props['aria-labelledby']).toBe('my-title')
      modal.close()
    })

    it('should use custom aria-describedby', () => {
      const modal = createModal({ ariaDescribedBy: 'my-desc' })
      modal.open()
      const props = modal.getContentProps()
      expect(props['aria-describedby']).toBe('my-desc')
      modal.close()
    })
  })
})
