/**
 * React adapter for ModalKit
 *
 * @packageDocumentation
 */

// Context & Provider
export { ModalProvider, useModalContext } from './context'
export type { ModalProviderProps, ModalContextValue } from './context'

// Hooks
export { useModal } from './hooks/useModal'
export type { UseModalReturn } from './hooks/useModal'
export { useConfirm } from './hooks/useConfirm'
export { useAlert } from './hooks/useAlert'
export { usePrompt } from './hooks/usePrompt'

// Components
export { Modal, useModalComponentContext } from './components/Modal'
export type { ModalProps } from './components/Modal'

export { ModalTrigger } from './components/ModalTrigger'
export type { ModalTriggerProps } from './components/ModalTrigger'

export { ModalPortal } from './components/ModalPortal'
export type { ModalPortalProps } from './components/ModalPortal'

export { ModalOverlay } from './components/ModalOverlay'
export type { ModalOverlayProps } from './components/ModalOverlay'

export { ModalContainer } from './components/ModalContainer'
export type { ModalContainerProps, ModalPosition } from './components/ModalContainer'

export { ModalContent } from './components/ModalContent'
export type { ModalContentProps, ModalSize } from './components/ModalContent'

export { ModalHeader } from './components/ModalHeader'
export type { ModalHeaderProps } from './components/ModalHeader'

export { ModalTitle } from './components/ModalTitle'
export type { ModalTitleProps } from './components/ModalTitle'

export { ModalDescription } from './components/ModalDescription'
export type { ModalDescriptionProps } from './components/ModalDescription'

export { ModalBody } from './components/ModalBody'
export type { ModalBodyProps } from './components/ModalBody'

export { ModalFooter } from './components/ModalFooter'
export type { ModalFooterProps } from './components/ModalFooter'

export { ModalClose } from './components/ModalClose'
export type { ModalCloseProps } from './components/ModalClose'

// Dialog Components
export { ConfirmDialog } from './components/ConfirmDialog'
export type { ConfirmDialogProps, ConfirmDialogVariant } from './components/ConfirmDialog'

export { AlertDialog } from './components/AlertDialog'
export type { AlertDialogProps, AlertDialogVariant } from './components/AlertDialog'

export { PromptDialog } from './components/PromptDialog'
export type { PromptDialogProps } from './components/PromptDialog'

// Imperative API
export { modals } from './imperative/modals'

// Re-export core types for convenience
export type {
  ModalConfig,
  ModalState,
  AnimationType,
  AnimationState,
  ConfirmOptions,
  ConfirmOptionsAdvanced,
  ConfirmButton,
  AlertOptions,
  PromptOptions,
} from '../../types'
