import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getPortalContainer,
  createPortal,
  appendPortal,
  removePortal,
  cleanupPortals,
} from '../../../src/features/portal'

describe('portal', () => {
  beforeEach(() => {
    cleanupPortals()
  })

  afterEach(() => {
    cleanupPortals()
  })

  describe('getPortalContainer', () => {
    it('should create default container if not exists', () => {
      const container = getPortalContainer()
      expect(container).toBeDefined()
      expect(container.id).toBe('modalkit-portal-root')
    })

    it('should return same container on subsequent calls', () => {
      const container1 = getPortalContainer()
      const container2 = getPortalContainer()
      expect(container1).toBe(container2)
    })

    it('should return custom target element', () => {
      const customTarget = document.createElement('div')
      customTarget.id = 'custom-target'
      document.body.appendChild(customTarget)

      const container = getPortalContainer(customTarget)
      expect(container).toBe(customTarget)

      customTarget.remove()
    })

    it('should return custom target by selector', () => {
      const customTarget = document.createElement('div')
      customTarget.id = 'custom-target'
      document.body.appendChild(customTarget)

      const container = getPortalContainer('#custom-target')
      expect(container).toBe(customTarget)

      customTarget.remove()
    })

    it('should fall back to default if selector not found', () => {
      const container = getPortalContainer('#non-existent')
      expect(container.id).toBe('modalkit-portal-root')
    })
  })

  describe('createPortal', () => {
    it('should create a portal element', () => {
      const portal = createPortal()
      expect(portal.tagName).toBe('DIV')
      expect(portal.hasAttribute('data-modalkit-portal')).toBe(true)
    })

    it('should set id if provided', () => {
      const portal = createPortal('my-portal')
      expect(portal.id).toBe('my-portal')
    })
  })

  describe('appendPortal', () => {
    it('should append portal to default container', () => {
      const portal = createPortal()
      appendPortal(portal)

      const container = getPortalContainer()
      expect(container.contains(portal)).toBe(true)
    })

    it('should append portal to custom target', () => {
      const customTarget = document.createElement('div')
      document.body.appendChild(customTarget)

      const portal = createPortal()
      appendPortal(portal, customTarget)

      expect(customTarget.contains(portal)).toBe(true)

      customTarget.remove()
    })
  })

  describe('removePortal', () => {
    it('should remove portal from DOM', () => {
      const portal = createPortal()
      appendPortal(portal)

      const container = getPortalContainer()
      expect(container.contains(portal)).toBe(true)

      removePortal(portal)
      expect(container.contains(portal)).toBe(false)
    })

    it('should handle null portal', () => {
      expect(() => removePortal(null)).not.toThrow()
    })
  })

  describe('cleanupPortals', () => {
    it('should remove all modalkit portals', () => {
      const portal1 = createPortal()
      const portal2 = createPortal()
      appendPortal(portal1)
      appendPortal(portal2)

      cleanupPortals()

      const portals = document.querySelectorAll('[data-modalkit-portal]')
      expect(portals.length).toBe(0)
    })

    it('should remove empty default container', () => {
      getPortalContainer() // Create default container
      cleanupPortals()

      const container = document.getElementById('modalkit-portal-root')
      expect(container).toBeNull()
    })
  })
})
