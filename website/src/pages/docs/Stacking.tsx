import CodeBlock from '../../components/CodeBlock'

const stackingExampleCode = `import { createModal, getModalStack } from '@oxog/modalkit'

// Create multiple modals
const modal1 = createModal({ id: 'modal-1' })
const modal2 = createModal({ id: 'modal-2' })
const modal3 = createModal({ id: 'modal-3' })

// Open modals in sequence
modal1.open() // z-index: 1000
modal2.open() // z-index: 1001
modal3.open() // z-index: 1002

// Get the current stack
const stack = getModalStack()
console.log(stack) // ['modal-1', 'modal-2', 'modal-3']

// Close the top modal
modal3.close()

// Now modal2 is on top
console.log(getModalStack()) // ['modal-1', 'modal-2']`

const zIndexCode = `import { createModal, configureModalStack } from '@oxog/modalkit'

// Configure the base z-index (default is 1000)
configureModalStack({
  baseZIndex: 9000,
  zIndexStep: 10,
})

const modal1 = createModal()
const modal2 = createModal()

modal1.open() // z-index: 9000
modal2.open() // z-index: 9010

// Get current z-index for a modal
const state = modal1.getState()
console.log(state.zIndex) // 9000`

const escapeHandlingCode = `import { createModal } from '@oxog/modalkit'

// Only the top modal closes on Escape by default
const modal1 = createModal({ closeOnEscape: true })
const modal2 = createModal({ closeOnEscape: true })

modal1.open()
modal2.open()

// Pressing Escape closes modal2 first
// Then pressing Escape again closes modal1`

const reactStackingCode = `import { useState } from 'react'
import { Modal, ModalTrigger, ModalContent, ModalClose } from '@oxog/modalkit/react'

function StackedModals() {
  return (
    <Modal>
      <ModalTrigger>
        <button>Open First Modal</button>
      </ModalTrigger>
      <ModalContent className="modal-content">
        <h2>First Modal</h2>
        <p>This is the first modal in the stack.</p>

        {/* Nested modal */}
        <Modal>
          <ModalTrigger>
            <button>Open Second Modal</button>
          </ModalTrigger>
          <ModalContent className="modal-content">
            <h2>Second Modal</h2>
            <p>This modal is on top of the first one.</p>

            {/* Another nested modal */}
            <Modal>
              <ModalTrigger>
                <button>Open Third Modal</button>
              </ModalTrigger>
              <ModalContent className="modal-content">
                <h2>Third Modal</h2>
                <p>This is the topmost modal.</p>
                <ModalClose>
                  <button>Close</button>
                </ModalClose>
              </ModalContent>
            </Modal>

            <ModalClose>
              <button>Close</button>
            </ModalClose>
          </ModalContent>
        </Modal>

        <ModalClose>
          <button>Close</button>
        </ModalClose>
      </ModalContent>
    </Modal>
  )
}`

const closeAllModalsCode = `import { closeAllModals, closeTopModal, getModalStack } from '@oxog/modalkit'

// Close only the topmost modal
closeTopModal()

// Close all open modals
closeAllModals()

// Check if any modals are open
const stack = getModalStack()
const hasOpenModals = stack.length > 0`

const overlayBehaviorCode = `// By default, clicking overlay closes only the top modal
const modal = createModal({
  closeOnOverlayClick: true,
})

// The overlay click only affects the modal it belongs to
// Lower modals in the stack are not affected`

const focusStackCode = `// Focus is automatically managed in the stack
// When a modal opens, it traps focus
// When it closes, focus returns to the previous modal (or trigger)

const modal1 = createModal({ trapFocus: true })
const modal2 = createModal({ trapFocus: true })

modal1.open() // Focus trapped in modal1
modal2.open() // Focus trapped in modal2

modal2.close() // Focus returns to modal1
modal1.close() // Focus returns to original trigger`

export default function Stacking() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Modal Stacking</h1>
        <p>
          ModalKit automatically manages stacked modals, handling z-index,
          focus, and keyboard events correctly. This is useful for workflows
          that require multiple levels of modal dialogs.
        </p>

        <h2>How Stacking Works</h2>
        <p>
          When multiple modals are open, ModalKit maintains a stack to track
          their order. Each new modal is added to the top of the stack with
          an incrementing z-index.
        </p>
        <CodeBlock code={stackingExampleCode} language="typescript" filename="stacking.ts" />

        <h2>Z-Index Management</h2>
        <p>
          Z-index values are automatically assigned based on stack position.
          You can configure the base z-index and step increment:
        </p>
        <CodeBlock code={zIndexCode} language="typescript" />

        <h2>Escape Key Handling</h2>
        <p>
          When Escape is pressed, only the topmost modal closes. This ensures
          predictable behavior when multiple modals are stacked:
        </p>
        <CodeBlock code={escapeHandlingCode} language="typescript" />

        <h2>React Stacked Modals</h2>
        <p>
          In React, simply nest <code>Modal</code> components to create a stack:
        </p>
        <CodeBlock code={reactStackingCode} language="tsx" filename="StackedModals.tsx" />

        <h2>Stack Utilities</h2>
        <p>
          ModalKit provides utilities for managing the entire stack:
        </p>
        <CodeBlock code={closeAllModalsCode} language="typescript" />

        <h2>Overlay Behavior</h2>
        <p>
          Each modal's overlay only affects its own modal. Clicking an overlay
          closes only that specific modal:
        </p>
        <CodeBlock code={overlayBehaviorCode} language="typescript" />

        <h2>Focus Management in Stack</h2>
        <p>
          Focus is properly managed across the stack. When a modal closes,
          focus returns to the appropriate element:
        </p>
        <CodeBlock code={focusStackCode} language="typescript" />

        <h2>Best Practices</h2>
        <ul>
          <li>
            Avoid deeply nested modals (more than 2-3 levels) for better UX
          </li>
          <li>
            Consider using a single modal with multiple steps instead of stacking
          </li>
          <li>
            Ensure each modal has a clear way to close (close button, cancel)
          </li>
          <li>
            Use consistent styling so users understand the modal hierarchy
          </li>
          <li>
            Test keyboard navigation through the entire stack
          </li>
        </ul>

        <h2>Common Use Cases</h2>
        <ul>
          <li>
            <strong>Confirmation in forms:</strong> A form modal that opens a
            confirmation dialog before submitting
          </li>
          <li>
            <strong>Image galleries:</strong> A gallery modal that opens an
            image detail modal
          </li>
          <li>
            <strong>Multi-step wizards:</strong> Each step in its own modal
            (though a single modal with steps may be better)
          </li>
          <li>
            <strong>Error handling:</strong> Showing an error dialog on top
            of a form modal
          </li>
        </ul>
      </div>
    </div>
  )
}
