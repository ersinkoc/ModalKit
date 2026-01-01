import CodeBlock from '../../components/CodeBlock'

const configOptionsCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  // Initial state
  open: false,           // Start closed (default)
  defaultOpen: false,    // Uncontrolled default state

  // Behavior
  closeOnEscape: true,       // Close when Escape is pressed
  closeOnOverlayClick: true, // Close when clicking overlay
  preventScroll: true,       // Lock body scroll when open
  trapFocus: true,           // Trap focus within modal

  // Animation
  animated: true,            // Enable animations
  animationDuration: 200,    // Duration in milliseconds

  // Accessibility
  role: 'dialog',            // ARIA role
  ariaLabelledby: undefined, // Custom label ID
  ariaDescribedby: undefined,// Custom description ID

  // Callbacks
  onOpen: () => console.log('Modal opened'),
  onClose: () => console.log('Modal closed'),
  onOpenChange: (isOpen) => console.log('State:', isOpen),
})`

const vanillaExampleCode = `import { createModal } from '@oxog/modalkit'

// Create modal instance
const modal = createModal({
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
  preventScroll: true,
})

// Get DOM elements
const triggerBtn = document.getElementById('trigger')
const modalEl = document.getElementById('modal')
const overlayEl = document.getElementById('overlay')
const contentEl = document.getElementById('content')
const closeBtn = document.getElementById('close')

// Apply props getters
const triggerProps = modal.getTriggerProps()
triggerBtn.onclick = triggerProps.onClick
triggerBtn.setAttribute('aria-haspopup', triggerProps['aria-haspopup'])
triggerBtn.setAttribute('aria-expanded', triggerProps['aria-expanded'])

const overlayProps = modal.getOverlayProps()
overlayEl.onclick = overlayProps.onClick

const contentProps = modal.getContentProps()
contentEl.setAttribute('role', contentProps.role)
contentEl.setAttribute('aria-modal', contentProps['aria-modal'])
contentEl.tabIndex = contentProps.tabIndex

const closeProps = modal.getCloseProps()
closeBtn.onclick = closeProps.onClick
closeBtn.setAttribute('aria-label', closeProps['aria-label'])

// Subscribe to state changes
modal.subscribe((state) => {
  if (state.isOpen) {
    modalEl.classList.remove('hidden')
    modalEl.classList.add('flex')
  } else {
    modalEl.classList.add('hidden')
    modalEl.classList.remove('flex')
  }
})`

const vanillaHtmlCode = `<button id="trigger" class="btn-primary">
  Open Modal
</button>

<div id="modal" class="hidden fixed inset-0 z-50">
  <div id="overlay" class="absolute inset-0 bg-black/50"></div>
  <div class="relative flex items-center justify-center min-h-screen p-4">
    <div id="content" class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 id="modal-title" class="text-xl font-bold mb-4">Modal Title</h2>
      <p id="modal-desc" class="text-gray-600 mb-6">
        This is the modal content.
      </p>
      <button id="close" class="btn-primary">
        Close
      </button>
    </div>
  </div>
</div>`

const reactBasicCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'

function BasicModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Hello World!</ModalTitle>
              <p>This is a basic modal.</p>
              <ModalClose>Close</ModalClose>
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
  ModalTitle,
} from '@oxog/modalkit/react'

function ControlledModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Controlled Modal</ModalTitle>
              <p>This modal's state is controlled externally.</p>
              <button onClick={() => setIsOpen(false)}>
                Close
              </button>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`

const useModalHookCode = `import { useModal } from '@oxog/modalkit/react'

function UseModalExample() {
  const modal = useModal({
    closeOnEscape: true,
    onOpen: () => console.log('Opened!'),
    onClose: () => console.log('Closed!'),
  })

  return (
    <>
      <button {...modal.getTriggerProps()}>
        Open
      </button>

      {modal.isOpen && (
        <div className="modal-wrapper">
          <div {...modal.getOverlayProps()} className="overlay" />
          <div {...modal.getContentProps()} className="content">
            <h2 {...modal.getTitleProps()}>Title</h2>
            <p {...modal.getDescriptionProps()}>Description</p>
            <button {...modal.getCloseProps()}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}`

export default function BasicModal() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Basic Modal</h1>
        <p>
          Learn how to create and configure basic modals with ModalKit. This
          guide covers configuration options, vanilla JavaScript usage, and
          React integration.
        </p>

        <h2>Configuration Options</h2>
        <p>
          The <code>createModal</code> function accepts a configuration object
          with the following options:
        </p>
        <CodeBlock code={configOptionsCode} language="typescript" filename="config.ts" />

        <h2>Vanilla JavaScript</h2>
        <p>
          Here's a complete example of using ModalKit with vanilla JavaScript:
        </p>

        <h3>HTML Structure</h3>
        <CodeBlock code={vanillaHtmlCode} language="html" filename="index.html" />

        <h3>JavaScript</h3>
        <CodeBlock code={vanillaExampleCode} language="typescript" filename="modal.ts" />

        <h2>React Usage</h2>

        <h3>Basic Component</h3>
        <p>
          The simplest way to create a modal in React using compound components:
        </p>
        <CodeBlock code={reactBasicCode} language="tsx" filename="BasicModal.tsx" />

        <h3>Controlled Mode</h3>
        <p>
          For full control over the modal state, use controlled mode:
        </p>
        <CodeBlock code={controlledModalCode} language="tsx" filename="ControlledModal.tsx" />

        <h3>Using the Hook</h3>
        <p>
          For maximum flexibility, use the <code>useModal</code> hook directly:
        </p>
        <CodeBlock code={useModalHookCode} language="tsx" filename="UseModalExample.tsx" />

        <h2>Props Getters</h2>
        <p>
          ModalKit provides several props getter functions that return the
          appropriate attributes for each element:
        </p>
        <ul>
          <li>
            <code>getTriggerProps()</code> - Props for the trigger button
          </li>
          <li>
            <code>getOverlayProps()</code> - Props for the backdrop overlay
          </li>
          <li>
            <code>getContentProps()</code> - Props for the modal content container
          </li>
          <li>
            <code>getTitleProps()</code> - Props for the modal title
          </li>
          <li>
            <code>getDescriptionProps()</code> - Props for the modal description
          </li>
          <li>
            <code>getCloseProps()</code> - Props for the close button
          </li>
        </ul>

        <h2>Best Practices</h2>
        <ul>
          <li>
            Always include a way to close the modal (close button, overlay click,
            or Escape key)
          </li>
          <li>
            Use descriptive titles and descriptions for accessibility
          </li>
          <li>
            Enable focus trapping to keep keyboard users within the modal
          </li>
          <li>
            Prevent body scroll when the modal is open for better UX
          </li>
          <li>
            Consider using animations for a polished feel
          </li>
        </ul>
      </div>
    </div>
  )
}
