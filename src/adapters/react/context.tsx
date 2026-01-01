/**
 * React context for ModalKit
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import { createModal } from '../../core/modal'
import type { ModalConfig, Modal } from '../../types'

/**
 * Modal instance wrapper for imperative API
 */
interface ManagedModal {
  id: string
  modal: Modal
  content: ReactNode | ((props: { close: () => void }) => ReactNode)
  config: ModalConfig
}

/**
 * Context value interface
 */
export interface ModalContextValue {
  // Registry
  modals: Map<string, ManagedModal>

  // Imperative methods
  openModal: (config: {
    id?: string
    content: ReactNode | ((props: { close: () => void }) => ReactNode)
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  } & Partial<ModalConfig>) => string

  closeModal: (id: string) => void
  closeAll: () => void

  // Internal: force re-render
  _forceUpdate: () => void
}

/**
 * Modal context
 */
const ModalContext = createContext<ModalContextValue | null>(null)

/**
 * Hook to access modal context
 */
export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}

/**
 * Provider props
 */
export interface ModalProviderProps {
  children: ReactNode
}

/**
 * Generate unique ID
 */
let idCounter = 0
function generateModalId(): string {
  idCounter++
  return `managed-modal-${idCounter}`
}

/**
 * Modal provider component
 */
export function ModalProvider({ children }: ModalProviderProps): React.ReactElement {
  const [modals] = useState(() => new Map<string, ManagedModal>())
  const [, setUpdateCounter] = useState(0)

  const forceUpdate = useCallback(() => {
    setUpdateCounter((c) => c + 1)
  }, [])

  const openModal = useCallback(
    (config: {
      id?: string
      content: ReactNode | ((props: { close: () => void }) => ReactNode)
      title?: string
      size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    } & Partial<ModalConfig>): string => {
      const id = config.id ?? generateModalId()
      const { content, title, size, ...modalConfig } = config

      const modal = createModal({
        ...modalConfig,
        onClose: () => {
          modalConfig.onClose?.()
          modals.delete(id)
          forceUpdate()
        },
      })

      modals.set(id, {
        id,
        modal,
        content,
        config: modalConfig,
      })

      modal.open()
      forceUpdate()

      return id
    },
    [modals, forceUpdate]
  )

  const closeModal = useCallback(
    (id: string) => {
      const managed = modals.get(id)
      if (managed) {
        managed.modal.close()
      }
    },
    [modals]
  )

  const closeAll = useCallback(() => {
    modals.forEach((managed) => {
      managed.modal.close()
    })
  }, [modals])

  const value = useMemo(
    (): ModalContextValue => ({
      modals,
      openModal,
      closeModal,
      closeAll,
      _forceUpdate: forceUpdate,
    }),
    [modals, openModal, closeModal, closeAll, forceUpdate]
  )

  // Render managed modals
  const managedModalElements: ReactNode[] = []
  modals.forEach((managed) => {
    const { id, modal, content } = managed
    const state = modal.getState()

    if (!state.mounted) return

    const portalProps = modal.getPortalProps()
    const overlayProps = modal.getOverlayProps()
    const containerProps = modal.getContainerProps()
    const contentProps = modal.getContentProps()

    const renderedContent =
      typeof content === 'function'
        ? content({ close: () => modal.close() })
        : content

    managedModalElements.push(
      <div
        key={id}
        data-modalkit-portal={portalProps['data-modalkit-portal']}
        data-state={portalProps['data-state']}
      >
        <div
          ref={overlayProps.ref}
          data-modalkit-overlay=""
          data-state={overlayProps['data-state']}
          style={{
            ...overlayProps.style,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={overlayProps.onClick as unknown as React.MouseEventHandler}
        >
          <div
            ref={containerProps.ref}
            data-modalkit-container=""
            data-state={containerProps['data-state']}
            style={containerProps.style}
            onClick={containerProps.onClick as unknown as React.MouseEventHandler}
          >
            <div
              ref={contentProps.ref}
              role={contentProps.role}
              aria-modal={contentProps['aria-modal']}
              aria-labelledby={contentProps['aria-labelledby']}
              aria-describedby={contentProps['aria-describedby']}
              data-modalkit-content=""
              data-state={contentProps['data-state']}
              tabIndex={contentProps.tabIndex}
              onKeyDown={contentProps.onKeyDown as unknown as React.KeyboardEventHandler}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              {renderedContent}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <ModalContext.Provider value={value}>
      {children}
      {managedModalElements}
    </ModalContext.Provider>
  )
}

export { ModalContext }
