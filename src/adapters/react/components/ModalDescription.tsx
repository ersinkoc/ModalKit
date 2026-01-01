/**
 * ModalDescription component
 */

import { type ReactNode, type ReactElement, type CSSProperties } from 'react'
import { useModalComponentContext } from './Modal'

/**
 * ModalDescription props
 */
export interface ModalDescriptionProps {
  /** Custom ID */
  id?: string
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal description component
 */
export function ModalDescription({
  id,
  children,
  className,
  style,
}: ModalDescriptionProps): ReactElement {
  const { modal } = useModalComponentContext()
  const descProps = modal.getDescriptionProps(id)

  return (
    <p
      id={descProps.id}
      data-modalkit-description=""
      className={className}
      style={{
        margin: 0,
        fontSize: '14px',
        color: '#6b7280',
        lineHeight: 1.5,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
