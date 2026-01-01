/**
 * AlertDialog component
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
export type AlertDialogVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

/**
 * AlertDialog props
 */
export interface AlertDialogProps {
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
  /** Visual variant */
  variant?: AlertDialogVariant
  /** Called when confirm is clicked */
  onConfirm: () => void
  /** Additional class name for content */
  className?: string
  /** Additional styles for content */
  style?: CSSProperties
}

/**
 * Variant to button style mapping
 */
const VARIANT_STYLES: Record<AlertDialogVariant, CSSProperties> = {
  default: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  success: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  warning: {
    backgroundColor: '#f59e0b',
    color: 'white',
  },
  error: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
  info: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
}

/**
 * Pre-built alert dialog component
 */
export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'OK',
  variant = 'default',
  onConfirm,
  className,
  style,
}: AlertDialogProps): ReactElement {
  const handleConfirm = () => {
    onConfirm()
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
