import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateId,
  createIdGenerator,
  resetIdCounter,
  createModalIds,
} from '../../../src/utils/id'

describe('id utilities', () => {
  beforeEach(() => {
    resetIdCounter()
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should use default prefix', () => {
      const id = generateId()
      expect(id).toMatch(/^modalkit-\d+$/)
    })

    it('should use custom prefix', () => {
      const id = generateId('custom')
      expect(id).toMatch(/^custom-\d+$/)
    })

    it('should increment counter', () => {
      const id1 = generateId()
      const id2 = generateId()
      const num1 = parseInt(id1.split('-')[1]!, 10)
      const num2 = parseInt(id2.split('-')[1]!, 10)
      expect(num2).toBe(num1 + 1)
    })
  })

  describe('createIdGenerator', () => {
    it('should create a namespaced generator', () => {
      const generate = createIdGenerator('namespace')
      const id = generate()
      expect(id).toMatch(/^namespace-\d+$/)
    })

    it('should maintain separate counter', () => {
      const generate1 = createIdGenerator('ns1')
      const generate2 = createIdGenerator('ns2')

      const id1a = generate1()
      const id1b = generate1()
      const id2a = generate2()

      expect(id1a).toBe('ns1-1')
      expect(id1b).toBe('ns1-2')
      expect(id2a).toBe('ns2-1')
    })
  })

  describe('resetIdCounter', () => {
    it('should reset the counter', () => {
      generateId()
      generateId()
      resetIdCounter()
      const id = generateId()
      expect(id).toBe('modalkit-1')
    })
  })

  describe('createModalIds', () => {
    it('should create modal-specific IDs', () => {
      const ids = createModalIds('my-modal')
      expect(ids.modalId).toBe('my-modal')
      expect(ids.titleId).toBe('my-modal-title')
      expect(ids.descriptionId).toBe('my-modal-description')
    })
  })
})
