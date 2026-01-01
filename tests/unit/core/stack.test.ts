import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  modalStack,
  stackInternal,
  calculateZIndex,
  BASE_Z_INDEX,
  Z_INDEX_INCREMENT,
} from '../../../src/core/stack'
import { createModal } from '../../../src/core/modal'
import type { ModalInternal } from '../../../src/types'

describe('stack', () => {
  beforeEach(() => {
    modalStack.closeAll()
  })

  describe('calculateZIndex', () => {
    it('should return base z-index for stack order 1', () => {
      expect(calculateZIndex(1)).toBe(BASE_Z_INDEX)
    })

    it('should increment by Z_INDEX_INCREMENT', () => {
      expect(calculateZIndex(2)).toBe(BASE_Z_INDEX + Z_INDEX_INCREMENT)
      expect(calculateZIndex(3)).toBe(BASE_Z_INDEX + 2 * Z_INDEX_INCREMENT)
    })

    it('should handle zero order', () => {
      expect(calculateZIndex(0)).toBe(BASE_Z_INDEX - Z_INDEX_INCREMENT)
    })
  })

  describe('modalStack', () => {
    describe('count', () => {
      it('should return 0 when empty', () => {
        expect(modalStack.count()).toBe(0)
      })

      it('should return correct count', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        expect(modalStack.count()).toBe(2)

        modal1.close()
        modal2.close()
      })
    })

    describe('isEmpty', () => {
      it('should return true when empty', () => {
        expect(modalStack.isEmpty()).toBe(true)
      })

      it('should return false when not empty', () => {
        const modal = createModal({ defaultOpen: true })
        expect(modalStack.isEmpty()).toBe(false)
        modal.close()
      })
    })

    describe('getAll', () => {
      it('should return empty array when empty', () => {
        expect(modalStack.getAll()).toEqual([])
      })

      it('should return all modals', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        const all = modalStack.getAll()
        expect(all).toHaveLength(2)
        expect(all).toContain(modal1)
        expect(all).toContain(modal2)

        modal1.close()
        modal2.close()
      })

      it('should return a copy of the array', () => {
        const modal = createModal({ defaultOpen: true })
        const all = modalStack.getAll()
        all.pop()
        expect(modalStack.getAll()).toHaveLength(1)
        modal.close()
      })
    })

    describe('getTopMost', () => {
      it('should return null when empty', () => {
        expect(modalStack.getTopMost()).toBeNull()
      })

      it('should return the top-most modal', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        expect(modalStack.getTopMost()).toBe(modal2)

        modal1.close()
        modal2.close()
      })
    })

    describe('getByOrder', () => {
      it('should return null for non-existent order', () => {
        expect(modalStack.getByOrder(1)).toBeNull()
      })

      it('should return modal at order', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        expect(modalStack.getByOrder(1)).toBe(modal1)
        expect(modalStack.getByOrder(2)).toBe(modal2)

        modal1.close()
        modal2.close()
      })
    })

    describe('closeAll', () => {
      it('should close all modals', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        modalStack.closeAll()

        expect(modal1.isOpen()).toBe(false)
        expect(modal2.isOpen()).toBe(false)
        expect(modalStack.isEmpty()).toBe(true)
      })
    })

    describe('closeTopMost', () => {
      it('should close only top-most modal', () => {
        const modal1 = createModal({ defaultOpen: true })
        const modal2 = createModal({ defaultOpen: true })

        modalStack.closeTopMost()

        expect(modal1.isOpen()).toBe(true)
        expect(modal2.isOpen()).toBe(false)

        modal1.close()
      })

      it('should do nothing when empty', () => {
        expect(() => modalStack.closeTopMost()).not.toThrow()
      })
    })

    describe('events', () => {
      it('should emit push event', () => {
        const handler = vi.fn()
        const unsubscribe = modalStack.on('push', handler)

        const modal = createModal({ defaultOpen: true })
        expect(handler).toHaveBeenCalledWith(modal)

        unsubscribe()
        modal.close()
      })

      it('should emit pop event', () => {
        const handler = vi.fn()
        const modal = createModal({ defaultOpen: true })

        const unsubscribe = modalStack.on('pop', handler)
        modal.close()

        expect(handler).toHaveBeenCalledWith(modal)
        unsubscribe()
      })

      it('should emit change event on push', () => {
        const handler = vi.fn()
        const unsubscribe = modalStack.on('change', handler)

        const modal = createModal({ defaultOpen: true })
        expect(handler).toHaveBeenCalledWith([modal])

        unsubscribe()
        modal.close()
      })

      it('should emit change event on pop', () => {
        const handler = vi.fn()
        const modal = createModal({ defaultOpen: true })

        const unsubscribe = modalStack.on('change', handler)
        modal.close()

        expect(handler).toHaveBeenCalledWith([])
        unsubscribe()
      })

      it('should unsubscribe with off', () => {
        const handler = vi.fn()
        modalStack.on('push', handler)
        modalStack.off('push', handler)

        const modal = createModal({ defaultOpen: true })
        expect(handler).not.toHaveBeenCalled()
        modal.close()
      })
    })
  })

  describe('stackInternal', () => {
    it('should push modal to stack', () => {
      const modal = createModal() as ModalInternal
      const initialCount = modalStack.count()
      stackInternal.push(modal)
      expect(modalStack.count()).toBe(initialCount + 1)
      stackInternal.remove(modal)
    })

    it('should remove modal from stack', () => {
      const modal = createModal() as ModalInternal
      const initialCount = modalStack.count()
      stackInternal.push(modal)
      stackInternal.remove(modal)
      expect(modalStack.count()).toBe(initialCount)
    })

    it('should not push duplicate modal', () => {
      const modal = createModal() as ModalInternal
      const initialCount = modalStack.count()
      stackInternal.push(modal)
      stackInternal.push(modal)
      expect(modalStack.count()).toBe(initialCount + 1)
      stackInternal.remove(modal)
    })

    it('should handle removing non-existent modal', () => {
      const modal = createModal() as ModalInternal
      expect(() => stackInternal.remove(modal)).not.toThrow()
    })

    it('should update stack order on push', () => {
      // Start clean
      modalStack.closeAll()

      const modal1 = createModal() as ModalInternal
      const modal2 = createModal() as ModalInternal

      stackInternal.push(modal1)
      stackInternal.push(modal2)

      expect(modal1.getStackOrder()).toBe(1)
      expect(modal2.getStackOrder()).toBe(2)

      stackInternal.remove(modal1)
      stackInternal.remove(modal2)
    })

    it('should update isTopMost on push', () => {
      // Start clean
      modalStack.closeAll()

      const modal1 = createModal() as ModalInternal
      const modal2 = createModal() as ModalInternal

      stackInternal.push(modal1)
      expect(modal1.isTopMost()).toBe(true)

      stackInternal.push(modal2)
      expect(modal1.isTopMost()).toBe(false)
      expect(modal2.isTopMost()).toBe(true)

      stackInternal.remove(modal1)
      stackInternal.remove(modal2)
    })
  })
})
