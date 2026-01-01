/**
 * ModalTitle component
 */

import { type ReactNode, type ReactElement, type CSSProperties } from 'react'
import { useModalComponentContext } from './Modal'

/**
 * ModalTitle props
 */
export interface ModalTitleProps {
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
 * Modal title component
 */
export function ModalTitle({
  id,
  children,
  className,
  style,
}: ModalTitleProps): ReactElement {
  const { modal } = useModalComponentContext()
  const titleProps = modal.getTitleProps(id)

  return (
    <h2
      id={titleProps.id}
      data-modalkit-title=""
      className={className}
      style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
        color: '#111827',
        ...style,
      }}
    >
      {children}
    </h2>
  )
}
