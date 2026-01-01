/**
 * ModalContainer component
 */

import React, {
  type ReactNode,
  type ReactElement,
  type CSSProperties,
  forwardRef,
} from 'react'
import { useModalComponentContext } from './Modal'

/**
 * Position options
 */
export type ModalPosition = 'center' | 'top'

/**
 * ModalContainer props
 */
export interface ModalContainerProps {
  /** Position of modal content */
  position?: ModalPosition
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal container component - handles positioning
 */
export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  function ModalContainer(
    { position = 'center', children, className, style },
    forwardedRef
  ): ReactElement {
    const { modal } = useModalComponentContext()
    const containerProps = modal.getContainerProps()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      containerProps.onClick(e as unknown as MouseEvent)
    }

    // Adjust alignment based on position
    const alignItems = position === 'top' ? 'flex-start' : 'center'
    const paddingTop = position === 'top' ? '10vh' : undefined

    return (
      <div
        ref={(el) => {
          containerProps.ref(el)
          if (typeof forwardedRef === 'function') {
            forwardedRef(el)
          } else if (forwardedRef) {
            forwardedRef.current = el
          }
        }}
        data-modalkit-container=""
        data-state={containerProps['data-state']}
        onClick={handleClick}
        className={className}
        style={{
          ...containerProps.style,
          alignItems,
          paddingTop,
          ...style,
        }}
      >
        {children}
      </div>
    )
  }
)
