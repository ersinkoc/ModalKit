import { describe, it, expect } from 'vitest'
import { DEFAULT_CONFIG, mergeConfig, getConfigValue } from '../../../src/core/config'

describe('config', () => {
  describe('DEFAULT_CONFIG', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_CONFIG.defaultOpen).toBe(false)
      expect(DEFAULT_CONFIG.closeOnOverlayClick).toBe(true)
      expect(DEFAULT_CONFIG.closeOnEscape).toBe(true)
      expect(DEFAULT_CONFIG.preventScroll).toBe(true)
      expect(DEFAULT_CONFIG.scrollBehavior).toBe('inside')
      expect(DEFAULT_CONFIG.trapFocus).toBe(true)
      expect(DEFAULT_CONFIG.autoFocus).toBe(true)
      expect(DEFAULT_CONFIG.restoreFocus).toBe(true)
      expect(DEFAULT_CONFIG.stackable).toBe(true)
      expect(DEFAULT_CONFIG.closeOnStackedOpen).toBe(false)
      expect(DEFAULT_CONFIG.animated).toBe(false)
      expect(DEFAULT_CONFIG.animationDuration).toBe(200)
      expect(DEFAULT_CONFIG.disablePortal).toBe(false)
      expect(DEFAULT_CONFIG.role).toBe('dialog')
    })
  })

  describe('mergeConfig', () => {
    it('should return defaults when no config provided', () => {
      const config = mergeConfig()
      expect(config.closeOnEscape).toBe(true)
      expect(config.trapFocus).toBe(true)
    })

    it('should return defaults when undefined provided', () => {
      const config = mergeConfig(undefined)
      expect(config.closeOnEscape).toBe(true)
    })

    it('should merge user config with defaults', () => {
      const config = mergeConfig({
        closeOnEscape: false,
        animated: true,
      })
      expect(config.closeOnEscape).toBe(false)
      expect(config.animated).toBe(true)
      expect(config.trapFocus).toBe(true) // Default preserved
    })

    it('should preserve optional properties', () => {
      const onOpen = () => {}
      const config = mergeConfig({
        onOpen,
        ariaLabel: 'Test modal',
      })
      expect(config.onOpen).toBe(onOpen)
      expect(config.ariaLabel).toBe('Test modal')
    })

    it('should allow undefined for optional properties', () => {
      const config = mergeConfig({
        initialFocusRef: undefined,
        portalTarget: undefined,
      })
      expect(config.initialFocusRef).toBeUndefined()
      expect(config.portalTarget).toBeUndefined()
    })
  })

  describe('getConfigValue', () => {
    it('should return config value if defined', () => {
      const config = { closeOnEscape: false }
      expect(getConfigValue(config, 'closeOnEscape', true)).toBe(false)
    })

    it('should return default value if config value is undefined', () => {
      const config = {}
      expect(getConfigValue(config, 'closeOnEscape', true)).toBe(true)
    })

    it('should handle false values correctly', () => {
      const config = { animated: false }
      expect(getConfigValue(config, 'animated', true)).toBe(false)
    })

    it('should handle zero values correctly', () => {
      const config = { animationDuration: 0 }
      expect(getConfigValue(config, 'animationDuration', 200)).toBe(0)
    })
  })
})
