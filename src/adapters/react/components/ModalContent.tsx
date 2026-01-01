/**
 * ModalContent component
 */

import React, {
  type ReactNode,
  type ReactElement,
  type CSSProperties,
  forwardRef,
} from 'react'
import { useModalComponentContext } from './Modal'

/**
 * Size options
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Size to max-width mapping
 */
const SIZE_MAP: Record<ModalSize, string> = {
  sm: '400px',
  md: '500px',
  lg: '600px',
  xl: '800px',
  full: '100%',
}

/**
 * ModalContent props
 */
export interface ModalContentProps {
  /** Size of the modal */
  size?: ModalSize
  /** ARIA role override */
  role?: 'dialog' | 'alertdialog'
  /** Custom aria-label */
  'aria-label'?: string
  /** Children */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * Modal content component - the actual modal box
 */
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent(
    { size = 'md', role, 'aria-label': ariaLabel, children, className, style },
    forwardedRef
  ): ReactElement {
    const { modal } = useModalComponentContext()
    const contentProps = modal.getContentProps()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      contentProps.onKeyDown(e as unknown as KeyboardEvent)
    }

    return (
      <div
        ref={(el) => {
          contentProps.ref(el)
          if (typeof forwardedRef === 'function') {
            forwardedRef(el)
          } else if (forwardedRef) {
            forwardedRef.current = el
          }
        }}
        role={role ?? contentProps.role}
        aria-modal={contentProps['aria-modal']}
        aria-label={ariaLabel ?? contentProps['aria-label']}
        aria-labelledby={ariaLabel ? undefined : contentProps['aria-labelledby']}
        aria-describedby={contentProps['aria-describedby']}
        data-modalkit-content=""
        data-state={contentProps['data-state']}
        tabIndex={contentProps.tabIndex}
        onKeyDown={handleKeyDown}
        className={className}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: SIZE_MAP[size],
          width: size === 'full' ? '100vw' : '100%',
          height: size === 'full' ? '100vh' : 'auto',
          maxHeight: size === 'full' ? '100vh' : '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    )
  }
)
