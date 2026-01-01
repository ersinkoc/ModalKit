/**
 * Default configuration and config utilities for ModalKit
 */

import type { ModalConfig } from '../types'

/**
 * Default modal configuration
 */
export const DEFAULT_CONFIG: Required<
  Omit<
    ModalConfig,
    | 'open'
    | 'initialFocusRef'
    | 'finalFocusRef'
    | 'portalTarget'
    | 'id'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
    | 'onOpen'
    | 'onClose'
    | 'onOpenChange'
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onEscapeKeyDown'
    | 'onOverlayClick'
  >
> = {
  defaultOpen: false,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  preventScroll: true,
  scrollBehavior: 'inside',
  trapFocus: true,
  autoFocus: true,
  restoreFocus: true,
  stackable: true,
  closeOnStackedOpen: false,
  animated: false,
  animationDuration: 200,
  disablePortal: false,
  role: 'dialog',
}

/**
 * Merge user config with defaults
 */
export function mergeConfig(config?: ModalConfig): ModalConfig {
  if (!config) return { ...DEFAULT_CONFIG }

  return {
    ...DEFAULT_CONFIG,
    ...config,
  }
}

/**
 * Get a resolved config value
 */
export function getConfigValue<K extends keyof ModalConfig>(
  config: ModalConfig,
  key: K,
  defaultValue: NonNullable<ModalConfig[K]>
): NonNullable<ModalConfig[K]> {
  const value = config[key]
  return value !== undefined ? (value as NonNullable<ModalConfig[K]>) : defaultValue
}
