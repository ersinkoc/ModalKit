import CodeBlock from '../../components/CodeBlock'

const basicModalCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from '@oxog/modalkit/react'

function MyModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          {/* Overlay is the backdrop */}
          <ModalOverlay className="fixed inset-0 bg-black/50" />

          {/* Container centers the content */}
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            {/* Content is the modal box */}
            <ModalContent className="bg-white rounded-lg p-6 max-w-md">
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>
                This is a description of the modal.
              </ModalDescription>
              <p>Your content goes here.</p>
              <div className="flex gap-2 mt-4">
                <ModalClose>Cancel</ModalClose>
                <button>Confirm</button>
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`

const controlledModalCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalClose,
} from '@oxog/modalkit/react'

function ControlledModal() {
  const [open, setOpen] = useState(false)

  const handleSave = async () => {
    await saveData()
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/50" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-lg p-6">
              <h2>Controlled Modal</h2>
              <p>State is managed externally.</p>
              <ModalClose>Cancel</ModalClose>
              <button onClick={handleSave}>Save</button>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`

const useModalHookCode = `import { useModal } from '@oxog/modalkit/react'

function CustomModal() {
  const modal = useModal({
    closeOnEscape: true,
    closeOnOverlayClick: true,
    trapFocus: true,
    animated: true,
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  })

  return (
    <>
      <button {...modal.getTriggerProps()}>
        Open
      </button>

      {modal.isOpen && (
        <div className="modal-wrapper">
          <div
            {...modal.getOverlayProps()}
            className="overlay"
          />
          <div
            {...modal.getContentProps()}
            className="content"
          >
            <h2 {...modal.getTitleProps()}>Title</h2>
            <p {...modal.getDescriptionProps()}>Description</p>
            <button {...modal.getCloseProps()}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}`

const asChildPatternCode = `// ModalClose supports asChild pattern
// This merges props onto the child element instead of wrapping it

import { ModalClose } from '@oxog/modalkit/react'

// Without asChild - renders a button
<ModalClose>Close</ModalClose>
// Renders: <button>Close</button>

// With asChild - merges props onto child
<ModalClose asChild>
  <span className="close-icon">×</span>
</ModalClose>
// Renders: <span class="close-icon" onClick={...}>×</span>`

const animatedModalCode = `import { useState, useEffect } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
} from '@oxog/modalkit/react'

function AnimatedModal() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle animation state
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
    }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <Modal open={open} onOpenChange={setOpen} animated>
        <ModalPortal>
          <ModalOverlay
            className="fixed inset-0 transition-opacity duration-200"
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              opacity: isVisible ? 1 : 0,
            }}
          />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent
              className="bg-white rounded-lg p-6 transition-all duration-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
              }}
            >
              <h2>Animated Modal</h2>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`

const typeScriptCode = `import type {
  ModalConfig,
  ModalState,
} from '@oxog/modalkit'

import type {
  ModalProps,
  ModalContentProps,
} from '@oxog/modalkit/react'

// Typing a custom modal component
interface MyModalProps {
  title: string
  onConfirm: () => void
}

function MyModal({ title, onConfirm }: MyModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalContent>
            <h2>{title}</h2>
            <button onClick={onConfirm}>Confirm</button>
          </ModalContent>
        </ModalPortal>
      </Modal>
    </>
  )
}`

export default function ReactGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>React Guide</h1>
        <p>
          Complete guide to using ModalKit with React. Learn about components,
          hooks, and best practices for building modals in React applications.
        </p>

        <h2>Basic Modal</h2>
        <p>
          Create a modal using compound components. No provider is needed!
        </p>
        <CodeBlock code={basicModalCode} language="tsx" filename="MyModal.tsx" />

        <h2>Controlled Mode</h2>
        <p>
          Control modal state externally with <code>open</code> and <code>onOpenChange</code> props:
        </p>
        <CodeBlock code={controlledModalCode} language="tsx" filename="ControlledModal.tsx" />

        <h2>useModal Hook</h2>
        <p>
          For maximum flexibility, use the <code>useModal</code> hook:
        </p>
        <CodeBlock code={useModalHookCode} language="tsx" filename="CustomModal.tsx" />

        <h2>asChild Pattern</h2>
        <p>
          Merge props onto child elements instead of wrapping:
        </p>
        <CodeBlock code={asChildPatternCode} language="tsx" />

        <h2>Animations</h2>
        <p>
          Add CSS transitions for smooth animations:
        </p>
        <CodeBlock code={animatedModalCode} language="tsx" filename="AnimatedModal.tsx" />

        <h2>TypeScript</h2>
        <p>
          ModalKit is fully typed. Import types as needed:
        </p>
        <CodeBlock code={typeScriptCode} language="tsx" />

        <h2>Component Reference</h2>
        <ul>
          <li>
            <code>Modal</code> - Root component, manages state
          </li>
          <li>
            <code>ModalPortal</code> - Renders children in a portal
          </li>
          <li>
            <code>ModalOverlay</code> - Backdrop element
          </li>
          <li>
            <code>ModalContainer</code> - Positions the content
          </li>
          <li>
            <code>ModalContent</code> - Main content wrapper
          </li>
          <li>
            <code>ModalTitle</code> - Title (sets aria-labelledby)
          </li>
          <li>
            <code>ModalDescription</code> - Description (sets aria-describedby)
          </li>
          <li>
            <code>ModalClose</code> - Closes the modal on click
          </li>
        </ul>

        <h2>Best Practices</h2>
        <ul>
          <li>
            Prefer compound components for declarative modals
          </li>
          <li>
            Use <code>useModal</code> hook for complex custom modals
          </li>
          <li>
            Always include <code>ModalTitle</code> for accessibility
          </li>
          <li>
            Enable animations for better UX
          </li>
          <li>
            Use controlled mode when you need external state management
          </li>
        </ul>
      </div>
    </div>
  )
}
