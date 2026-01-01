/**
 * ModalClose component
 */

import React, {
  type ReactElement,
  type CSSProperties,
  cloneElement,
  isValidElement,
} from 'react'
import { useModalComponentContext } from './Modal'

/**
 * ModalClose props
 */
export interface ModalCloseProps {
  /** Render as child element instead of button */
  asChild?: boolean
  /** Custom aria-label */
  'aria-label'?: string
  /** Children */
  children?: React.ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal close button component
 */
export function ModalClose({
  asChild = false,
  'aria-label': ariaLabel,
  children,
  className,
  style,
}: ModalCloseProps): ReactElement {
  const { modal } = useModalComponentContext()
  const closeProps = modal.getCloseButtonProps()

  const handleClick = (e: React.MouseEvent) => {
    closeProps.onClick(e as unknown as MouseEvent)
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      ...closeProps,
      'aria-label': ariaLabel ?? closeProps['aria-label'],
      onClick: handleClick,
      className: className
        ? `${(children.props as Record<string, unknown>).className || ''} ${className}`.trim()
        : (children.props as Record<string, unknown>).className,
    })
  }

  return (
    <button
      type={closeProps.type}
      aria-label={ariaLabel ?? closeProps['aria-label']}
      data-modalkit-close=""
      onClick={handleClick}
      className={className}
      style={{
        background: 'none',
        border: 'none',
        padding: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        borderRadius: '4px',
        ...style,
      }}
    >
      {children ?? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
