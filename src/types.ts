// ============ ANIMATION TYPES ============

/**
 * Type of animation being performed
 */
export type AnimationType = 'enter' | 'exit'

/**
 * Current state of the modal animation
 */
export type AnimationState =
  | 'idle'      // Modal is closed, no animation
  | 'entering'  // Modal is opening, animation in progress
  | 'entered'   // Modal is open, animation complete
  | 'exiting'   // Modal is closing, animation in progress
  | 'exited'    // Modal closed, ready for unmount

// ============ MODAL CONFIG ============

/**
 * Configuration options for creating a modal
 */
export interface ModalConfig {
  // State
  /** Whether the modal is currently open (controlled mode) */
  open?: boolean
  /** Initial open state for uncontrolled mode */
  defaultOpen?: boolean

  // Close behavior
  /** Close modal when clicking outside content (default: true) */
  closeOnOverlayClick?: boolean
  /** Close modal when pressing Escape key (default: true) */
  closeOnEscape?: boolean

  // Scroll behavior
  /** Lock body scroll when modal is open (default: true) */
  preventScroll?: boolean
  /** Where scrolling is allowed: 'inside' modal or 'outside' (default: 'inside') */
  scrollBehavior?: 'inside' | 'outside'

  // Focus behavior
  /** Trap focus within the modal (default: true) */
  trapFocus?: boolean
  /** Auto-focus first focusable element on open (default: true) */
  autoFocus?: boolean
  /** Restore focus to trigger element on close (default: true) */
  restoreFocus?: boolean
  /** Element to focus when modal opens */
  initialFocusRef?: HTMLElement | (() => HTMLElement | null) | null
  /** Element to focus when modal closes */
  finalFocusRef?: HTMLElement | (() => HTMLElement | null) | null

  // Stacking
  /** Allow multiple modals to stack (default: true) */
  stackable?: boolean
  /** Close current modal when new one opens (default: false) */
  closeOnStackedOpen?: boolean

  // Animation
  /** Enable enter/exit animations (default: false) */
  animated?: boolean
  /** Animation duration in milliseconds (default: 200) */
  animationDuration?: number

  // Portal
  /** Target element for portal rendering */
  portalTarget?: HTMLElement | string | null
  /** Disable portal and render in place (default: false) */
  disablePortal?: boolean

  // Callbacks
  /** Called when modal opens */
  onOpen?: () => void
  /** Called when modal closes */
  onClose?: () => void
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Called when animation starts */
  onAnimationStart?: (type: AnimationType) => void
  /** Called when animation ends */
  onAnimationEnd?: (type: AnimationType) => void
  /** Called when Escape key is pressed */
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  /** Called when overlay is clicked */
  onOverlayClick?: (event: MouseEvent) => void

  // Accessibility
  /** Custom ID for the modal */
  id?: string
  /** ARIA role: 'dialog' or 'alertdialog' (default: 'dialog') */
  role?: 'dialog' | 'alertdialog'
  /** Custom aria-label */
  ariaLabel?: string
  /** ID of element that labels the modal */
  ariaLabelledBy?: string
  /** ID of element that describes the modal */
  ariaDescribedBy?: string
}

// ============ MODAL STATE ============

/**
 * Current state of a modal instance
 */
export interface ModalState {
  /** Whether the modal is open */
  open: boolean
  /** Current animation state */
  animationState: AnimationState
  /** Position in the modal stack (1-based) */
  stackOrder: number
  /** Whether this is the top-most modal */
  isTopMost: boolean
  /** Whether the modal is mounted in DOM */
  mounted: boolean
}

// ============ PROPS GETTERS RETURN TYPES ============

/**
 * Props for the portal wrapper element
 */
export interface PortalProps {
  'data-modalkit-portal': ''
  'data-state': AnimationState
}

/**
 * Props for the overlay/backdrop element
 */
export interface OverlayProps {
  ref: (el: HTMLElement | null) => void
  'data-modalkit-overlay': ''
  'data-state': AnimationState
  style: {
    position: 'fixed'
    inset: '0'
    zIndex: number
  }
  onClick: (e: MouseEvent) => void
}

/**
 * Props for the container element
 */
export interface ContainerProps {
  ref: (el: HTMLElement | null) => void
  'data-modalkit-container': ''
  'data-state': AnimationState
  style: {
    position: 'fixed'
    inset: '0'
    display: 'flex'
    alignItems: string
    justifyContent: string
    zIndex: number
    overflow: string
  }
  onClick: (e: MouseEvent) => void
}

/**
 * Props for the content element
 */
export interface ContentProps {
  ref: (el: HTMLElement | null) => void
  role: 'dialog' | 'alertdialog'
  'aria-modal': true
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-modalkit-content': ''
  'data-state': AnimationState
  tabIndex: -1
  onKeyDown: (e: KeyboardEvent) => void
}

/**
 * Props for the title element
 */
export interface TitleProps {
  id: string
  'data-modalkit-title': ''
}

/**
 * Props for the description element
 */
export interface DescriptionProps {
  id: string
  'data-modalkit-description': ''
}

/**
 * Props for the close button
 */
export interface CloseButtonProps {
  type: 'button'
  'aria-label': string
  'data-modalkit-close': ''
  onClick: (e: MouseEvent) => void
}

/**
 * Props for the trigger button
 */
export interface TriggerProps {
  type: 'button'
  'aria-haspopup': 'dialog'
  'aria-expanded': boolean
  'data-modalkit-trigger': ''
  onClick: (e: MouseEvent) => void
}

// ============ MODAL INTERFACE ============

/**
 * Modal instance API
 */
export interface Modal {
  // State
  /** Check if modal is open */
  isOpen(): boolean
  /** Check if modal is mounted in DOM */
  isMounted(): boolean
  /** Get full modal state */
  getState(): ModalState
  /** Subscribe to state changes */
  subscribe(callback: (state: ModalState) => void): () => void

  // Actions
  /** Open the modal */
  open(): void
  /** Close the modal */
  close(): void
  /** Toggle open/close state */
  toggle(): void

  // Stack
  /** Get position in modal stack */
  getStackOrder(): number
  /** Check if this is the top-most modal */
  isTopMost(): boolean

  // Animation
  /** Check if animation is in progress */
  isAnimating(): boolean
  /** Get current animation state */
  getAnimationState(): AnimationState

  // Focus
  /** Focus the first focusable element */
  focusFirst(): void
  /** Focus the last focusable element */
  focusLast(): void
  /** Check if element is inside the modal */
  contains(element: Element | null): boolean

  // Portal
  /** Get the portal target element */
  getPortalTarget(): HTMLElement

  // Props getters
  /** Get props for portal element */
  getPortalProps(): PortalProps
  /** Get props for overlay element */
  getOverlayProps(): OverlayProps
  /** Get props for container element */
  getContainerProps(): ContainerProps
  /** Get props for content element */
  getContentProps(): ContentProps
  /** Get props for title element */
  getTitleProps(id?: string): TitleProps
  /** Get props for description element */
  getDescriptionProps(id?: string): DescriptionProps
  /** Get props for close button */
  getCloseButtonProps(): CloseButtonProps
  /** Get props for trigger button */
  getTriggerProps(): TriggerProps

  // Config
  /** Get current configuration */
  getConfig(): ModalConfig
  /** Update configuration */
  setConfig(config: Partial<ModalConfig>): void

  // Cleanup
  /** Destroy the modal instance and cleanup */
  destroy(): void
}

// ============ MODAL STACK ============

/**
 * Stack event types
 */
export type StackEvent = 'push' | 'pop' | 'change'

/**
 * Modal stack management API
 */
export interface ModalStack {
  // Query
  /** Get number of open modals */
  count(): number
  /** Check if stack is empty */
  isEmpty(): boolean
  /** Get all open modals */
  getAll(): Modal[]
  /** Get the top-most modal */
  getTopMost(): Modal | null
  /** Get modal by stack order */
  getByOrder(order: number): Modal | null

  // Actions
  /** Close all open modals */
  closeAll(): void
  /** Close only the top-most modal */
  closeTopMost(): void

  // Events
  /** Subscribe to stack events */
  on(event: 'push', handler: (modal: Modal) => void): () => void
  on(event: 'pop', handler: (modal: Modal) => void): () => void
  on(event: 'change', handler: (modals: Modal[]) => void): () => void
  /** Unsubscribe from stack events */
  off(event: StackEvent, handler: Function): void
}

// ============ CONFIRM DIALOG ============

/**
 * Options for confirm dialog
 */
export interface ConfirmOptions {
  /** Dialog title */
  title?: string
  /** Dialog message */
  message: string
  /** Confirm button text (default: 'Confirm') */
  confirmText?: string
  /** Cancel button text (default: 'Cancel') */
  cancelText?: string
  /** Visual variant */
  variant?: 'default' | 'danger' | 'warning'
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
  /** Close on Escape key */
  closeOnEscape?: boolean
}

/**
 * Custom button configuration for confirm dialog
 */
export interface ConfirmButton {
  /** Button text */
  text: string
  /** Value returned when clicked */
  value: string | boolean
  /** Visual variant */
  variant?: 'default' | 'primary' | 'danger' | 'warning'
  /** Auto-focus this button */
  autoFocus?: boolean
}

/**
 * Advanced confirm options with custom buttons
 */
export interface ConfirmOptionsAdvanced extends ConfirmOptions {
  /** Custom button configurations */
  buttons?: ConfirmButton[]
}

// ============ ALERT DIALOG ============

/**
 * Options for alert dialog
 */
export interface AlertOptions {
  /** Dialog title */
  title?: string
  /** Dialog message */
  message: string
  /** Confirm button text (default: 'OK') */
  confirmText?: string
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

// ============ PROMPT DIALOG ============

/**
 * Options for prompt dialog
 */
export interface PromptOptions {
  /** Dialog title */
  title?: string
  /** Dialog message */
  message?: string
  /** Input placeholder */
  placeholder?: string
  /** Default input value */
  defaultValue?: string
  /** Confirm button text (default: 'OK') */
  confirmText?: string
  /** Cancel button text (default: 'Cancel') */
  cancelText?: string
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  /** Validation function */
  validate?: (value: string) => boolean | string
  /** Whether input is required */
  required?: boolean
  /** Minimum input length */
  minLength?: number
  /** Maximum input length */
  maxLength?: number
}

// ============ FOCUS TRAP ============

/**
 * Configuration for focus trap
 */
export interface FocusTrapConfig {
  /** Container element for the trap */
  container: HTMLElement
  /** Element to focus initially */
  initialFocus?: HTMLElement | (() => HTMLElement | null) | null
  /** Fallback element if initial focus fails */
  fallbackFocus?: HTMLElement | (() => HTMLElement | null) | null
  /** Element to return focus to on deactivate */
  returnFocus?: HTMLElement | (() => HTMLElement | null) | null
  /** Whether Escape key deactivates the trap */
  escapeDeactivates?: boolean
  /** Whether clicking outside deactivates the trap */
  clickOutsideDeactivates?: boolean
  /** Allow clicks outside without deactivating */
  allowOutsideClick?: boolean | ((e: MouseEvent) => boolean)
  /** Called when trap is activated */
  onActivate?: () => void
  /** Called when trap is deactivated */
  onDeactivate?: () => void
}

/**
 * Focus trap instance API
 */
export interface FocusTrap {
  /** Activate the focus trap */
  activate(): void
  /** Deactivate the focus trap */
  deactivate(): void
  /** Pause the focus trap */
  pause(): void
  /** Resume the focus trap */
  unpause(): void
  /** Check if trap is active */
  isActive(): boolean
  /** Check if trap is paused */
  isPaused(): boolean
}

// ============ SCROLL LOCK ============

/**
 * Scroll lock API
 */
export interface ScrollLock {
  /** Lock body scroll */
  lock(): void
  /** Unlock body scroll */
  unlock(): void
  /** Check if scroll is locked */
  isLocked(): boolean
}

// ============ INTERNAL TYPES ============

/**
 * Internal modal instance with additional methods
 * @internal
 */
export interface ModalInternal extends Modal {
  /** Internal ID */
  _id: string
  /** Get title ID */
  _getTitleId(): string
  /** Get description ID */
  _getDescriptionId(): string
  /** Set stack order */
  _setStackOrder(order: number): void
  /** Set top-most status */
  _setIsTopMost(isTopMost: boolean): void
  /** Get content element ref */
  _getContentElement(): HTMLElement | null
  /** Handle overlay click */
  _handleOverlayClick(e: MouseEvent): void
  /** Handle keydown */
  _handleKeyDown(e: KeyboardEvent): void
}

/**
 * State manager interface
 * @internal
 */
export interface StateManager<T> {
  /** Get current state */
  getState(): T
  /** Update state */
  setState(partial: Partial<T>): void
  /** Subscribe to state changes */
  subscribe(callback: (state: T) => void): () => void
}

/**
 * Event emitter interface
 * @internal
 */
export interface EventEmitter<T extends Record<string, unknown[]>> {
  /** Subscribe to an event */
  on<K extends keyof T>(event: K, handler: (...args: T[K]) => void): () => void
  /** Unsubscribe from an event */
  off<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void
  /** Emit an event */
  emit<K extends keyof T>(event: K, ...args: T[K]): void
  /** Clear all listeners */
  clear(): void
}

/**
 * Animation controller interface
 * @internal
 */
export interface AnimationController {
  /** Start enter animation */
  startEnter(): void
  /** Start exit animation */
  startExit(): void
  /** Skip animation and set final state */
  skipTo(state: 'entered' | 'exited'): void
  /** Get current animation state */
  getState(): AnimationState
  /** Check if animating */
  isAnimating(): boolean
  /** Cleanup timers */
  destroy(): void
}
