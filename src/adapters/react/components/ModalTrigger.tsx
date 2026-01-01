/**
 * ModalTrigger component
 */

import React, { type ReactElement, cloneElement, isValidElement } from 'react'
import { useModalComponentContext } from './Modal'

/**
 * ModalTrigger props
 */
export interface ModalTriggerProps {
  /** Render as child element instead of button */
  asChild?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class name */
  className?: string
}

/**
 * Modal trigger button component
 */
export function ModalTrigger({
  asChild = false,
  children,
  className,
}: ModalTriggerProps): ReactElement {
  const { modal } = useModalComponentContext()
  const triggerProps = modal.getTriggerProps()

  const handleClick = (e: React.MouseEvent) => {
    triggerProps.onClick(e as unknown as MouseEvent)
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      ...triggerProps,
      onClick: handleClick,
      className: className
        ? `${(children.props as Record<string, unknown>).className || ''} ${className}`.trim()
        : (children.props as Record<string, unknown>).className,
    })
  }

  return (
    <button
      type={triggerProps.type}
      aria-haspopup={triggerProps['aria-haspopup']}
      aria-expanded={triggerProps['aria-expanded']}
      data-modalkit-trigger=""
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}
