/**
 * ModalKit - Zero-dependency headless modal/dialog library
 *
 * @packageDocumentation
 */

// Core
export { createModal } from './core/modal'
export { modalStack } from './core/stack'

// Features
export { createFocusTrap } from './features/focus-trap'
export { scrollLock } from './features/scroll-lock'

// Dialogs
export { confirm } from './dialogs/confirm'
export { alert } from './dialogs/alert'
export { prompt } from './dialogs/prompt'

// Types
export type {
  // Animation
  AnimationType,
  AnimationState,

  // Config
  ModalConfig,

  // State
  ModalState,

  // Props
  PortalProps,
  OverlayProps,
  ContainerProps,
  ContentProps,
  TitleProps,
  DescriptionProps,
  CloseButtonProps,
  TriggerProps,

  // Modal
  Modal,
  ModalStack,
  StackEvent,

  // Dialogs
  ConfirmOptions,
  ConfirmOptionsAdvanced,
  ConfirmButton,
  AlertOptions,
  PromptOptions,

  // Focus trap
  FocusTrap,
  FocusTrapConfig,

  // Scroll lock
  ScrollLock,
} from './types'
