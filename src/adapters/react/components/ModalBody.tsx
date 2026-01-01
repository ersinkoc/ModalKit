/**
 * ModalBody component
 */

import { type ReactNode, type ReactElement, type CSSProperties } from 'react'

/**
 * ModalBody props
 */
export interface ModalBodyProps {
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal body component - main content area
 */
export function ModalBody({
  children,
  className,
  style,
}: ModalBodyProps): ReactElement {
  return (
    <div
      className={className}
      style={{
        padding: '24px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
