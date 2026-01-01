/**
 * PromptDialog component
 */

import React, {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type CSSProperties,
} from 'react'
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
 * PromptDialog props
 */
export interface PromptDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** Dialog title */
  title?: string
  /** Dialog description/message */
  description?: string
  /** Input placeholder */
  placeholder?: string
  /** Default input value */
  defaultValue?: string
  /** Confirm button text */
  confirmText?: string
  /** Cancel button text */
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
  /** Called when confirm is clicked with the input value */
  onConfirm: (value: string) => void
  /** Called when cancel is clicked */
  onCancel?: () => void
  /** Additional class name for content */
  className?: string
  /** Additional styles for content */
  style?: CSSProperties
}

/**
 * Pre-built prompt dialog component
 */
export function PromptDialog({
  open,
  onOpenChange,
  title,
  description,
  placeholder,
  defaultValue = '',
  confirmText = 'OK',
  cancelText = 'Cancel',
  type = 'text',
  validate,
  required = false,
  minLength = 0,
  maxLength,
  onConfirm,
  onCancel,
  className,
  style,
}: PromptDialogProps): ReactElement {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset value when dialog opens
  useEffect(() => {
    if (open) {
      setValue(defaultValue)
      setError(null)
    }
  }, [open, defaultValue])

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
      if (defaultValue) {
        inputRef.current.select()
      }
    }
  }, [open, defaultValue])

  const validateInput = (): boolean => {
    // Required check
    if (required && !value.trim()) {
      setError('This field is required')
      return false
    }

    // Min length check
    if (minLength > 0 && value.length < minLength) {
      setError(`Minimum ${minLength} characters required`)
      return false
    }

    // Max length check
    if (maxLength && value.length > maxLength) {
      setError(`Maximum ${maxLength} characters allowed`)
      return false
    }

    // Custom validation
    if (validate) {
      const result = validate(value)
      if (result !== true) {
        setError(typeof result === 'string' ? result : 'Invalid input')
        return false
      }
    }

    return true
  }

  const handleConfirm = () => {
    if (validateInput()) {
      onConfirm(value)
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleConfirm()
    }
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
                {description && (
                  <ModalDescription style={{ marginBottom: '16px' }}>
                    {description}
                  </ModalDescription>
                )}
                <div>
                  <input
                    ref={inputRef}
                    type={type}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value)
                      setError(null)
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  {error && (
                    <p
                      style={{
                        color: '#ef4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        marginBottom: 0,
                      }}
                    >
                      {error}
                    </p>
                  )}
                </div>
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
                    backgroundColor: '#3b82f6',
                    color: 'white',
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
