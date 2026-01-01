/**
 * ConfirmDialog component
 */

import { type ReactElement, type CSSProperties } from 'react'
import { Modal } from './Modal'
import { ModalPortal } from './ModalPortal'
import { ModalOverlay } from './ModalOverlay'
import { ModalContainer } from './ModalContainer'
import { ModalContent } from './ModalContent'
import { ModalHeader } from './ModalHeader'
import { ModalTitle } from './ModalTitle'
import { ModalBody } from './ModalBody'
import { ModalDescription } from './ModalDescription'
import { ModalFooter } from './ModalFooter'

/**
 * Variant types
 */
export type ConfirmDialogVariant = 'default' | 'danger' | 'warning'

/**
 * ConfirmDialog props
 */
export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** Dialog title */
  title?: string
  /** Dialog description/message */
  description: string
  /** Confirm button text */
  confirmText?: string
  /** Cancel button text */
  cancelText?: string
  /** Visual variant */
  variant?: ConfirmDialogVariant
  /** Called when confirm is clicked */
  onConfirm: () => void
  /** Called when cancel is clicked */
  onCancel?: () => void
  /** Additional class name for content */
  className?: string
  /** Additional styles for content */
  style?: CSSProperties
}

/**
 * Variant to button style mapping
 */
const VARIANT_STYLES: Record<ConfirmDialogVariant, CSSProperties> = {
  default: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  danger: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  warning: {
    backgroundColor: '#f59e0b',
    color: 'white',
  },
}

/**
 * Pre-built confirm dialog component
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  className,
  style,
}: ConfirmDialogProps): ReactElement {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      closeOnOverlayClick={false}
      closeOnEscape={true}
      role="alertdialog"
    >
      <ModalPortal>
        <ModalOverlay>
          <ModalContainer>
            <ModalContent size="sm" className={className} style={style}>
              {title && (
                <ModalHeader style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
              )}
              <ModalBody style={{ paddingTop: title ? '8px' : undefined }}>
                <ModalDescription>{description}</ModalDescription>
              </ModalBody>
              <ModalFooter style={{ borderTop: 'none' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                  }}
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px',
                    ...VARIANT_STYLES[variant],
                  }}
                >
                  {confirmText}
                </button>
              </ModalFooter>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </Modal>
  )
}
