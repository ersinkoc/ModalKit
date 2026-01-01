/**
 * Main modal factory for ModalKit
 */

import type {
  Modal,
  ModalConfig,
  ModalState,
  ModalInternal,
  AnimationState,
  PortalProps,
  OverlayProps,
  ContainerProps,
  ContentProps,
  TitleProps,
  DescriptionProps,
  CloseButtonProps,
  TriggerProps,
  FocusTrap,
} from '../types'

import { mergeConfig, DEFAULT_CONFIG } from './config'
import { createInitialState, createStateManager, shouldBeMounted } from './state'
import { stackInternal, calculateZIndex } from './stack'
import { createFocusTrap } from '../features/focus-trap'
import { scrollLock } from '../features/scroll-lock'
import {
  createAnimationController,
  createNoopAnimationController,
} from '../features/animation'
import { createKeyboardHandler } from '../features/keyboard'
import { getPortalContainer } from '../features/portal'
import { generateId, createModalIds } from '../utils/id'
import { contains as domContains } from '../utils/dom'
import {
  saveFocus,
  restoreFocus,
  focusElement,
  getFirstFocusable,
  getLastFocusable,
} from '../utils/focus'

/**
 * Create a new modal instance
 */
export function createModal(userConfig?: ModalConfig): Modal {
  // Merge config with defaults
  const config = mergeConfig(userConfig)

  // Generate IDs
  const baseId = config.id ?? generateId('modal')
  const ids = createModalIds(baseId)

  // Initialize state
  const initialOpen = config.open ?? config.defaultOpen ?? false
  const stateManager = createStateManager(createInitialState(initialOpen))

  // Animation controller
  const animationController = config.animated
    ? createAnimationController({
        duration: config.animationDuration ?? DEFAULT_CONFIG.animationDuration,
        onStateChange: (animationState) => {
          stateManager.setState({
            animationState,
            mounted: shouldBeMounted(stateManager.getState().open, animationState),
          })
        },
        onAnimationStart: config.onAnimationStart,
        onAnimationEnd: config.onAnimationEnd,
      })
    : createNoopAnimationController()

  // Focus trap (created lazily)
  let focusTrap: FocusTrap | null = null
  let contentElement: HTMLElement | null = null
  let overlayElement: HTMLElement | null = null
  let containerElement: HTMLElement | null = null

  // Keyboard handler
  const handleKeyDown = createKeyboardHandler({
    closeOnEscape: config.closeOnEscape ?? DEFAULT_CONFIG.closeOnEscape,
    onEscapeKeyDown: config.onEscapeKeyDown,
    onClose: () => close(),
    isTopMost: () => stateManager.getState().isTopMost,
  })

  // ============ INTERNAL METHODS ============

  function resolveElement(
    ref: HTMLElement | (() => HTMLElement | null) | null | undefined
  ): HTMLElement | null {
    if (!ref) return null
    if (typeof ref === 'function') return ref()
    return ref
  }

  function setupFocusTrap(): void {
    if (!contentElement || focusTrap) return
    if (!config.trapFocus) return

    focusTrap = createFocusTrap({
      container: contentElement,
      initialFocus: resolveElement(config.initialFocusRef),
      returnFocus: resolveElement(config.finalFocusRef),
      escapeDeactivates: false, // We handle escape ourselves
      clickOutsideDeactivates: false,
    })
  }

  function teardownFocusTrap(): void {
    if (focusTrap) {
      focusTrap.deactivate()
      focusTrap = null
    }
  }

  function activateFocusTrap(): void {
    // Create focus trap if needed
    if (!focusTrap && config.trapFocus && contentElement) {
      setupFocusTrap()
    }

    // Activate if exists and not active
    if (focusTrap && !focusTrap.isActive()) {
      focusTrap.activate()
    }
  }

  function handleOpen(): void {
    const state = stateManager.getState()
    if (state.open) return

    // Save focus before opening
    if (config.restoreFocus) {
      saveFocus()
    }

    // Update state
    stateManager.setState({ open: true, mounted: true })

    // Start animation
    if (config.animated) {
      animationController.startEnter()
    } else {
      stateManager.setState({ animationState: 'entered' })
    }

    // Add to stack
    stackInternal.push(modal as ModalInternal)

    // Lock scroll
    if (config.preventScroll) {
      scrollLock.lock()
    }

    // Callbacks
    config.onOpen?.()
    config.onOpenChange?.(true)

    // Focus trap will be activated when content is mounted
    // (via ref callback in getContentProps)
  }

  function handleClose(): void {
    const state = stateManager.getState()
    if (!state.open) return

    // Update state
    stateManager.setState({ open: false })

    // Start animation
    if (config.animated) {
      animationController.startExit()
    } else {
      stateManager.setState({ animationState: 'idle', mounted: false })
    }

    // Remove from stack
    stackInternal.remove(modal as ModalInternal)

    // Deactivate focus trap
    teardownFocusTrap()

    // Unlock scroll
    if (config.preventScroll) {
      scrollLock.unlock()
    }

    // Restore focus
    if (config.restoreFocus) {
      const finalFocus = resolveElement(config.finalFocusRef)
      if (finalFocus) {
        focusElement(finalFocus)
      } else {
        restoreFocus()
      }
    }

    // Callbacks
    config.onClose?.()
    config.onOpenChange?.(false)
  }

  function handleOverlayClick(e: MouseEvent): void {
    // Only close if clicking directly on overlay/container, not content
    const target = e.target as HTMLElement
    const isOverlay = target === overlayElement || target === containerElement

    if (!isOverlay) return

    config.onOverlayClick?.(e)

    if (config.closeOnOverlayClick && !e.defaultPrevented) {
      close()
    }
  }

  // ============ PUBLIC API ============

  function isOpen(): boolean {
    return stateManager.getState().open
  }

  function isMounted(): boolean {
    return stateManager.getState().mounted
  }

  function getState(): ModalState {
    return stateManager.getState()
  }

  function subscribe(callback: (state: ModalState) => void): () => void {
    return stateManager.subscribe(callback)
  }

  function open(): void {
    handleOpen()
  }

  function close(): void {
    handleClose()
  }

  function toggle(): void {
    if (isOpen()) {
      close()
    } else {
      open()
    }
  }

  function getStackOrder(): number {
    return stateManager.getState().stackOrder
  }

  function isTopMost(): boolean {
    return stateManager.getState().isTopMost
  }

  function isAnimating(): boolean {
    return animationController.isAnimating()
  }

  function getAnimationState(): AnimationState {
    return stateManager.getState().animationState
  }

  function focusFirst(): void {
    if (!contentElement) return
    const first = getFirstFocusable(contentElement)
    if (first) focusElement(first)
  }

  function focusLast(): void {
    if (!contentElement) return
    const last = getLastFocusable(contentElement)
    if (last) focusElement(last)
  }

  function contains(element: Element | null): boolean {
    return domContains(contentElement, element)
  }

  function getPortalTarget(): HTMLElement {
    return getPortalContainer(config.portalTarget)
  }

  // ============ PROPS GETTERS ============

  function getPortalProps(): PortalProps {
    return {
      'data-modalkit-portal': '',
      'data-state': getAnimationState(),
    }
  }

  function getOverlayProps(): OverlayProps {
    const state = getState()
    const zIndex = calculateZIndex(state.stackOrder)

    return {
      ref: (el) => {
        overlayElement = el
      },
      'data-modalkit-overlay': '',
      'data-state': state.animationState,
      style: {
        position: 'fixed',
        inset: '0',
        zIndex,
      },
      onClick: handleOverlayClick,
    }
  }

  function getContainerProps(): ContainerProps {
    const state = getState()
    const zIndex = calculateZIndex(state.stackOrder) + 1
    const scrollBehavior = config.scrollBehavior ?? DEFAULT_CONFIG.scrollBehavior

    return {
      ref: (el) => {
        containerElement = el
      },
      'data-modalkit-container': '',
      'data-state': state.animationState,
      style: {
        position: 'fixed',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex,
        overflow: scrollBehavior === 'inside' ? 'auto' : 'hidden',
      },
      onClick: handleOverlayClick,
    }
  }

  function getContentProps(): ContentProps {
    const state = getState()

    const props: ContentProps = {
      ref: (el) => {
        const wasNull = contentElement === null
        contentElement = el

        // Setup and activate focus trap when content is mounted
        if (el && wasNull && state.open) {
          setupFocusTrap()
          if (config.autoFocus) {
            // Delay to ensure element is in DOM
            requestAnimationFrame(() => {
              activateFocusTrap()
            })
          }
        }
      },
      role: config.role ?? DEFAULT_CONFIG.role,
      'aria-modal': true,
      'data-modalkit-content': '',
      'data-state': state.animationState,
      tabIndex: -1,
      onKeyDown: handleKeyDown,
    }

    // Add aria attributes
    if (config.ariaLabel) {
      props['aria-label'] = config.ariaLabel
    } else if (config.ariaLabelledBy) {
      props['aria-labelledby'] = config.ariaLabelledBy
    } else {
      // Default to title ID
      props['aria-labelledby'] = ids.titleId
    }

    if (config.ariaDescribedBy) {
      props['aria-describedby'] = config.ariaDescribedBy
    } else {
      props['aria-describedby'] = ids.descriptionId
    }

    return props
  }

  function getTitleProps(customId?: string): TitleProps {
    return {
      id: customId ?? ids.titleId,
      'data-modalkit-title': '',
    }
  }

  function getDescriptionProps(customId?: string): DescriptionProps {
    return {
      id: customId ?? ids.descriptionId,
      'data-modalkit-description': '',
    }
  }

  function getCloseButtonProps(): CloseButtonProps {
    return {
      type: 'button',
      'aria-label': 'Close',
      'data-modalkit-close': '',
      onClick: () => close(),
    }
  }

  function getTriggerProps(): TriggerProps {
    return {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen(),
      'data-modalkit-trigger': '',
      onClick: () => open(),
    }
  }

  function getConfig(): ModalConfig {
    return { ...config }
  }

  function setConfig(newConfig: Partial<ModalConfig>): void {
    Object.assign(config, newConfig)
  }

  function destroy(): void {
    if (isOpen()) {
      close()
    }
    teardownFocusTrap()
    animationController.destroy()
    contentElement = null
    overlayElement = null
    containerElement = null
  }

  // ============ INTERNAL INTERFACE ============

  const modal: ModalInternal = {
    // Public API
    isOpen,
    isMounted,
    getState,
    subscribe,
    open,
    close,
    toggle,
    getStackOrder,
    isTopMost,
    isAnimating,
    getAnimationState,
    focusFirst,
    focusLast,
    contains,
    getPortalTarget,
    getPortalProps,
    getOverlayProps,
    getContainerProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
    getTriggerProps,
    getConfig,
    setConfig,
    destroy,

    // Internal API
    _id: baseId,
    _getTitleId: () => ids.titleId,
    _getDescriptionId: () => ids.descriptionId,
    _setStackOrder: (order) => stateManager.setState({ stackOrder: order }),
    _setIsTopMost: (isTop) => stateManager.setState({ isTopMost: isTop }),
    _getContentElement: () => contentElement,
    _handleOverlayClick: handleOverlayClick,
    _handleKeyDown: handleKeyDown,
  }

  // Open if defaultOpen is true
  if (initialOpen) {
    stackInternal.push(modal)
  }

  return modal
}
