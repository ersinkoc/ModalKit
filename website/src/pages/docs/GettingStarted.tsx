import CodeBlock from '../../components/CodeBlock'
import { Link } from 'react-router-dom'

const installCode = `# npm
npm install @oxog/modalkit

# yarn
yarn add @oxog/modalkit

# pnpm
pnpm add @oxog/modalkit`

const basicSetupCode = `import { createModal } from '@oxog/modalkit'

// Create a modal instance
const modal = createModal({
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
  preventScroll: true,
})

// Open the modal
modal.open()

// Close the modal
modal.close()

// Check if modal is open
console.log(modal.isOpen()) // true or false`

const propsGettersCode = `// Get props for each element
const triggerProps = modal.getTriggerProps()
const overlayProps = modal.getOverlayProps()
const contentProps = modal.getContentProps()
const titleProps = modal.getTitleProps()
const descriptionProps = modal.getDescriptionProps()
const closeProps = modal.getCloseProps()

// Apply to your elements
const triggerButton = document.createElement('button')
Object.assign(triggerButton, triggerProps)
triggerButton.textContent = 'Open Modal'

const overlay = document.createElement('div')
Object.assign(overlay, overlayProps)
overlay.className = 'modal-overlay'`

const subscribeCode = `// Subscribe to state changes
const unsubscribe = modal.subscribe((state) => {
  console.log('isOpen:', state.isOpen)
  console.log('animationState:', state.animationState)

  // Update your UI based on state
  if (state.isOpen) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Later, unsubscribe when done
unsubscribe()`

const reactSetupCode = `// No provider needed! Just import and use the components
import { Modal, ModalPortal, ModalContent } from '@oxog/modalkit/react'

function App() {
  return <YourApp />
}`

const reactUsageCode = `import { useState } from 'react'
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
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>
                This is a description of the modal content.
              </ModalDescription>
              <p>Your modal content goes here.</p>
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

export default function GettingStarted() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Getting Started</h1>
        <p>
          ModalKit is a zero-dependency, headless modal and dialog library for
          modern web applications. It provides complete control over styling
          while handling all the complex accessibility and behavior requirements.
        </p>

        <h2>Installation</h2>
        <p>Install ModalKit using your preferred package manager:</p>
        <CodeBlock code={installCode} language="bash" />

        <h2>Core Concepts</h2>
        <p>
          ModalKit uses a <strong>factory function pattern</strong> to create modal
          instances. Each modal is an independent unit with its own state and
          configuration.
        </p>

        <h3>Creating a Modal</h3>
        <p>
          Use the <code>createModal</code> function to create a new modal instance:
        </p>
        <CodeBlock code={basicSetupCode} language="typescript" />

        <h3>Props Getters</h3>
        <p>
          ModalKit uses the <strong>props getters pattern</strong> for maximum
          flexibility. Instead of rendering elements for you, it provides props
          that you apply to your own elements:
        </p>
        <CodeBlock code={propsGettersCode} language="typescript" />

        <h3>State Subscription</h3>
        <p>
          Subscribe to modal state changes to update your UI reactively:
        </p>
        <CodeBlock code={subscribeCode} language="typescript" />

        <h2>React Integration</h2>
        <p>
          ModalKit provides first-class React support with hooks and compound
          components.
        </p>

        <h3>Setup</h3>
        <p>
          No provider is needed! Just import and use the components directly:
        </p>
        <CodeBlock code={reactSetupCode} language="tsx" />

        <h3>Using Components</h3>
        <p>
          Use the compound component pattern for a declarative API:
        </p>
        <CodeBlock code={reactUsageCode} language="tsx" />

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Zero Dependencies:</strong> No external libraries required
          </li>
          <li>
            <strong>Headless:</strong> Complete styling freedom, no CSS included
          </li>
          <li>
            <strong>Accessible:</strong> WAI-ARIA compliant with focus management
          </li>
          <li>
            <strong>Type Safe:</strong> Written in strict TypeScript
          </li>
          <li>
            <strong>Tiny:</strong> Less than 3KB gzipped
          </li>
          <li>
            <strong>Flexible:</strong> Works with any framework or vanilla JS
          </li>
        </ul>

        <h2>Next Steps</h2>
        <p>Now that you have the basics, explore more features:</p>
        <ul>
          <li>
            <Link to="/docs/basic" className="link">Basic Modal</Link> - Learn
            the fundamentals
          </li>
          <li>
            <Link to="/docs/dialogs" className="link">Dialogs</Link> - Use
            built-in confirm, alert, and prompt
          </li>
          <li>
            <Link to="/docs/animation" className="link">Animation</Link> -
            Add smooth transitions
          </li>
          <li>
            <Link to="/docs/accessibility" className="link">Accessibility</Link> -
            Learn about a11y features
          </li>
        </ul>
      </div>
    </div>
  )
}
