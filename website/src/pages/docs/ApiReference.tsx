import CodeBlock from '../../components/CodeBlock'

const createModalCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal(config?: ModalConfig): Modal`

const modalConfigCode = `interface ModalConfig {
  // Initial State
  open?: boolean              // Start open (default: false)
  defaultOpen?: boolean       // Uncontrolled default state

  // Behavior
  closeOnEscape?: boolean     // Close on Escape key (default: true)
  closeOnOverlayClick?: boolean // Close on overlay click (default: true)
  preventScroll?: boolean     // Lock body scroll (default: true)
  trapFocus?: boolean         // Trap focus in modal (default: true)

  // Focus
  initialFocus?: string | HTMLElement  // Element to focus on open
  returnFocus?: boolean | string | HTMLElement // Focus on close
  autoFocus?: boolean         // Auto-focus first element (default: true)

  // Animation
  animated?: boolean          // Enable animations (default: false)
  animationDuration?: number  // Duration in ms (default: 200)

  // Accessibility
  role?: 'dialog' | 'alertdialog' // ARIA role (default: 'dialog')
  ariaLabelledby?: string     // ID of title element
  ariaDescribedby?: string    // ID of description element

  // Callbacks
  onOpen?: () => void         // Called when modal opens
  onClose?: () => void        // Called when modal closes
  onOpenChange?: (isOpen: boolean) => void // Called on state change
  onOpened?: () => void       // Called after open animation
  onClosed?: () => void       // Called after close animation
}`

const modalInterfaceCode = `interface Modal {
  // State
  isOpen(): boolean
  getState(): ModalState

  // Actions
  open(): void
  close(): void
  toggle(): void

  // Props Getters
  getTriggerProps(): TriggerProps
  getOverlayProps(): OverlayProps
  getContentProps(): ContentProps
  getTitleProps(): TitleProps
  getDescriptionProps(): DescriptionProps
  getCloseProps(): CloseProps

  // Subscription
  subscribe(callback: (state: ModalState) => void): () => void

  // Cleanup
  destroy(): void
}`

const modalStateCode = `interface ModalState {
  isOpen: boolean
  animationState: 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'
  zIndex: number
}`

const propsGettersCode = `// TriggerProps
interface TriggerProps {
  onClick: () => void
  'aria-haspopup': 'dialog'
  'aria-expanded': boolean
  'aria-controls': string
}

// OverlayProps
interface OverlayProps {
  onClick: () => void
  'data-state': AnimationState
}

// ContentProps
interface ContentProps {
  role: 'dialog' | 'alertdialog'
  'aria-modal': 'true'
  'aria-labelledby': string | undefined
  'aria-describedby': string | undefined
  tabIndex: -1
  'data-state': AnimationState
  id: string
}

// TitleProps
interface TitleProps {
  id: string
}

// DescriptionProps
interface DescriptionProps {
  id: string
}

// CloseProps
interface CloseProps {
  onClick: () => void
  'aria-label': 'Close'
}`

const dialogFunctionsCode = `// Confirm Dialog
import { confirm } from '@oxog/modalkit'

const result = await confirm({
  title: string
  message: string
  confirmText?: string  // default: 'Confirm'
  cancelText?: string   // default: 'Cancel'
  variant?: 'default' | 'danger' | 'warning'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  animated?: boolean
  animationDuration?: number
}): Promise<boolean>

// Alert Dialog
import { alert } from '@oxog/modalkit'

await alert({
  title: string
  message: string
  confirmText?: string  // default: 'OK'
  variant?: 'info' | 'success' | 'warning' | 'error'
  closeOnEscape?: boolean
  animated?: boolean
  animationDuration?: number
}): Promise<void>

// Prompt Dialog
import { prompt } from '@oxog/modalkit'

const value = await prompt({
  title: string
  message: string
  defaultValue?: string
  placeholder?: string
  inputType?: 'text' | 'password' | 'email' | 'number'
  confirmText?: string  // default: 'OK'
  cancelText?: string   // default: 'Cancel'
  validate?: (value: string) => true | string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  animated?: boolean
  animationDuration?: number
}): Promise<string | null>`

const stackFunctionsCode = `import {
  getModalStack,
  closeTopModal,
  closeAllModals,
  configureModalStack,
} from '@oxog/modalkit'

// Get IDs of all open modals (in stack order)
getModalStack(): string[]

// Close the topmost modal
closeTopModal(): void

// Close all open modals
closeAllModals(): void

// Configure stack behavior
configureModalStack({
  baseZIndex?: number  // default: 1000
  zIndexStep?: number  // default: 1
}): void`

const reactComponentsCode = `import {
  ModalProvider,
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
} from '@oxog/modalkit/react'

// ModalProvider - Required at app root
<ModalProvider>
  {children}
</ModalProvider>

// Modal - Root component
<Modal
  open?: boolean           // Controlled open state
  defaultOpen?: boolean    // Uncontrolled default state
  onOpenChange?: (open: boolean) => void
  closeOnEscape?: boolean
  closeOnOverlayClick?: boolean
  preventScroll?: boolean
  trapFocus?: boolean
  animated?: boolean
  animationDuration?: number
  role?: 'dialog' | 'alertdialog'
>
  {children}
</Modal>

// ModalTrigger - Opens the modal
<ModalTrigger asChild?: boolean>
  {children}
</ModalTrigger>

// ModalPortal - Renders in portal
<ModalPortal container?: HTMLElement>
  {children}
</ModalPortal>

// ModalOverlay - Backdrop
<ModalOverlay className?: string />

// ModalContainer - Positions content
<ModalContainer className?: string>
  {children}
</ModalContainer>

// ModalContent - Main content wrapper
<ModalContent className?: string>
  {children}
</ModalContent>

// ModalHeader, ModalBody, ModalFooter - Layout components
// ModalTitle - Sets aria-labelledby
// ModalDescription - Sets aria-describedby
// ModalClose - Closes the modal`

const reactHooksCode = `import {
  useModal,
  useConfirm,
  useAlert,
  usePrompt,
} from '@oxog/modalkit/react'

// useModal - Full control hook
const modal = useModal(config?: ModalConfig)
// Returns: Modal interface

// useConfirm - Confirm dialog hook
const confirm = useConfirm()
const result = await confirm(options): Promise<boolean>

// useAlert - Alert dialog hook
const alert = useAlert()
await alert(options): Promise<void>

// usePrompt - Prompt dialog hook
const prompt = usePrompt()
const value = await prompt(options): Promise<string | null>`

const utilityFunctionsCode = `import {
  createFocusTrap,
  createScrollLock,
  createPortal,
} from '@oxog/modalkit'

// Focus Trap
const focusTrap = createFocusTrap(container: HTMLElement, options?: {
  initialFocus?: string | HTMLElement
  returnFocus?: boolean | string | HTMLElement
  escapeDeactivates?: boolean
})

focusTrap.activate(): void
focusTrap.deactivate(): void
focusTrap.getFocusableElements(): HTMLElement[]

// Scroll Lock
const scrollLock = createScrollLock()
scrollLock.lock(): void
scrollLock.unlock(): void
scrollLock.isLocked(): boolean

// Portal
const portal = createPortal(container?: HTMLElement)
portal.mount(element: HTMLElement): void
portal.unmount(): void
portal.getContainer(): HTMLElement`

export default function ApiReference() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>API Reference</h1>
        <p>
          Complete API documentation for ModalKit. This reference covers the
          core library and React adapter.
        </p>

        <h2>Core API</h2>

        <h3>createModal</h3>
        <p>Creates a new modal instance.</p>
        <CodeBlock code={createModalCode} language="typescript" />

        <h3>ModalConfig</h3>
        <p>Configuration options for modal creation:</p>
        <CodeBlock code={modalConfigCode} language="typescript" />

        <h3>Modal Interface</h3>
        <p>Methods and properties available on a modal instance:</p>
        <CodeBlock code={modalInterfaceCode} language="typescript" />

        <h3>ModalState</h3>
        <p>The state object returned by <code>getState()</code>:</p>
        <CodeBlock code={modalStateCode} language="typescript" />

        <h3>Props Getters</h3>
        <p>Return types for props getter functions:</p>
        <CodeBlock code={propsGettersCode} language="typescript" />

        <h2>Dialog Functions</h2>
        <p>Built-in dialog utilities:</p>
        <CodeBlock code={dialogFunctionsCode} language="typescript" />

        <h2>Stack Functions</h2>
        <p>Manage the modal stack:</p>
        <CodeBlock code={stackFunctionsCode} language="typescript" />

        <h2>React Components</h2>
        <p>React component API:</p>
        <CodeBlock code={reactComponentsCode} language="tsx" />

        <h2>React Hooks</h2>
        <p>React hooks API:</p>
        <CodeBlock code={reactHooksCode} language="typescript" />

        <h2>Utility Functions</h2>
        <p>Low-level utilities for advanced use cases:</p>
        <CodeBlock code={utilityFunctionsCode} language="typescript" />

        <h2>Types</h2>
        <p>
          All types are exported from the main package:
        </p>
        <ul>
          <li><code>ModalConfig</code></li>
          <li><code>Modal</code></li>
          <li><code>ModalState</code></li>
          <li><code>AnimationState</code></li>
          <li><code>TriggerProps</code></li>
          <li><code>OverlayProps</code></li>
          <li><code>ContentProps</code></li>
          <li><code>TitleProps</code></li>
          <li><code>DescriptionProps</code></li>
          <li><code>CloseProps</code></li>
          <li><code>ConfirmOptions</code></li>
          <li><code>AlertOptions</code></li>
          <li><code>PromptOptions</code></li>
        </ul>
      </div>
    </div>
  )
}
