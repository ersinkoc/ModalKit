/**
 * ModalFooter component
 */

import { type ReactNode, type ReactElement, type CSSProperties } from 'react'

/**
 * ModalFooter props
 */
export interface ModalFooterProps {
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal footer component - contains action buttons
 */
export function ModalFooter({
  children,
  className,
  style,
}: ModalFooterProps): ReactElement {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        padding: '16px 24px',
        borderTop: '1px solid #e5e7eb',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
