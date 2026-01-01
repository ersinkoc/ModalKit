/**
 * Modal compound component for React
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from 'react'
import { createModal } from '../../../core/modal'
import type { Modal as ModalType, ModalConfig, ModalState } from '../../../types'

/**
 * Modal context value
 */
interface ModalContextValue {
  modal: ModalType
  state: ModalState
}

/**
 * Modal context
 */
const ModalComponentContext = createContext<ModalContextValue | null>(null)

/**
 * Hook to access modal context within compound components
 */
export function useModalComponentContext(): ModalContextValue {
  const context = useContext(ModalComponentContext)
  if (!context) {
    throw new Error('Modal compound components must be used within a Modal component')
  }
  return context
}

/**
 * Modal component props
 */
export interface ModalProps extends Omit<ModalConfig, 'open' | 'defaultOpen'> {
  /** Whether the modal is open (controlled) */
  open?: boolean
  /** Initial open state (uncontrolled) */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Children */
  children: ReactNode
}

/**
 * Modal root component
 */
export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  ...config
}: ModalProps): React.ReactElement {
  // Create modal instance
  const modalRef = useRef<ModalType | null>(null)

  if (!modalRef.current) {
    modalRef.current = createModal({
      ...config,
      defaultOpen: open ?? defaultOpen,
      onOpenChange,
    })
  }

  // Track state
  const [state, setState] = useState<ModalState>(() =>
    modalRef.current!.getState()
  )

  // Handle controlled mode
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    if (open !== undefined) {
      if (open && !modal.isOpen()) {
        modal.open()
      } else if (!open && modal.isOpen()) {
        modal.close()
      }
    }
  }, [open])

  // Subscribe to state changes
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    return modal.subscribe((newState) => {
      setState(newState)
    })
  }, [])

  // Update config
  useEffect(() => {
    modalRef.current?.setConfig({
      ...config,
      onOpenChange,
    })
  }, [config, onOpenChange])

  // Cleanup
  useEffect(() => {
    return () => {
      modalRef.current?.destroy()
    }
  }, [])

  const value = useMemo(
    () => ({
      modal: modalRef.current!,
      state,
    }),
    [state]
  )

  return (
    <ModalComponentContext.Provider value={value}>
      {children}
    </ModalComponentContext.Provider>
  )
}

export { ModalComponentContext }
