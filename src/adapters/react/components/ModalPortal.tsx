/**
 * ModalPortal component
 */

import { type ReactNode, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { useModalComponentContext } from './Modal'

/**
 * ModalPortal props
 */
export interface ModalPortalProps {
  /** Container element for portal */
  container?: HTMLElement
  /** Children */
  children: ReactNode
}

/**
 * Modal portal component - renders children in a portal
 */
export function ModalPortal({
  container,
  children,
}: ModalPortalProps): ReactElement | null {
  const { modal, state } = useModalComponentContext()

  // Don't render if not mounted
  if (!state.mounted) {
    return null
  }

  const portalTarget = container ?? modal.getPortalTarget()
  const portalProps = modal.getPortalProps()

  const content = (
    <div
      data-modalkit-portal={portalProps['data-modalkit-portal']}
      data-state={portalProps['data-state']}
    >
      {children}
    </div>
  )

  return createPortal(content, portalTarget)
}
