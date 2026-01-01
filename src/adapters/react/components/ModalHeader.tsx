/**
 * ModalHeader component
 */

import { type ReactNode, type ReactElement, type CSSProperties } from 'react'

/**
 * ModalHeader props
 */
export interface ModalHeaderProps {
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal header component - contains title and close button
 */
export function ModalHeader({
  children,
  className,
  style,
}: ModalHeaderProps): ReactElement {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
