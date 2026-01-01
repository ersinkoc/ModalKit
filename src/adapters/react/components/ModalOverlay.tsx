/**
 * ModalOverlay component
 */

import React, {
  type ReactNode,
  type ReactElement,
  type CSSProperties,
  forwardRef,
} from 'react'
import { useModalComponentContext } from './Modal'

/**
 * ModalOverlay props
 */
export interface ModalOverlayProps {
  /** Children */
  children?: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal overlay/backdrop component
 */
export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  function ModalOverlay({ children, className, style }, forwardedRef): ReactElement {
    const { modal } = useModalComponentContext()
    const overlayProps = modal.getOverlayProps()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      overlayProps.onClick(e as unknown as MouseEvent)
    }

    return (
      <div
        ref={(el) => {
          overlayProps.ref(el)
          if (typeof forwardedRef === 'function') {
            forwardedRef(el)
          } else if (forwardedRef) {
            forwardedRef.current = el
          }
        }}
        data-modalkit-overlay=""
        data-state={overlayProps['data-state']}
        onClick={handleClick}
        className={className}
        style={{
          ...overlayProps.style,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          ...style,
        }}
      >
        {children}
      </div>
    )
  }
)
