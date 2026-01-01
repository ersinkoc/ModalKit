import CodeBlock from '../../components/CodeBlock'

const focusTrapCode = `import { createModal } from '@oxog/modalkit'

// Enable focus trap (enabled by default)
const modal = createModal({
  trapFocus: true,
})

// When the modal opens:
// 1. Focus moves to the first focusable element in the modal
// 2. Tab/Shift+Tab cycles through focusable elements
// 3. Focus cannot leave the modal while it's open

// When the modal closes:
// Focus returns to the element that triggered the modal`

const initialFocusCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  trapFocus: true,
  initialFocus: '#email-input', // CSS selector
  // or
  initialFocus: document.getElementById('email-input'), // DOM element
})

// Focus will move to #email-input when modal opens`

const returnFocusCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  trapFocus: true,
  returnFocus: true, // Default: true
})

// The trigger element is automatically tracked
const triggerButton = document.getElementById('trigger')
triggerButton.onclick = () => modal.open()

// When modal closes, focus returns to triggerButton

// You can also specify a custom return element
const modal2 = createModal({
  returnFocus: '#custom-element',
})`

const focusableElementsCode = `// ModalKit considers these elements as focusable:
// - <a> with href attribute
// - <button> not disabled
// - <input> not disabled
// - <select> not disabled
// - <textarea> not disabled
// - Elements with tabindex >= 0
// - Elements with contenteditable

// Elements are skipped if they have:
// - display: none
// - visibility: hidden
// - tabindex="-1"
// - disabled attribute`

const reactFocusCode = `import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
} from '@oxog/modalkit/react'

function FocusExample() {
  return (
    <Modal
      trapFocus={true}
      initialFocus="#name-input"
      returnFocus={true}
    >
      <ModalTrigger>
        <button>Open Form</button>
      </ModalTrigger>
      <ModalContent>
        <h2>User Details</h2>
        <form>
          <div>
            <label htmlFor="name-input">Name:</label>
            <input id="name-input" type="text" />
          </div>
          <div>
            <label htmlFor="email-input">Email:</label>
            <input id="email-input" type="email" />
          </div>
          <div>
            <ModalClose>
              <button type="button">Cancel</button>
            </ModalClose>
            <button type="submit">Submit</button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}`

const customFocusTrapCode = `import { createFocusTrap } from '@oxog/modalkit'

// Create a focus trap manually
const container = document.getElementById('modal-content')
const focusTrap = createFocusTrap(container, {
  initialFocus: '#first-input',
  returnFocus: true,
  escapeDeactivates: true,
})

// Activate the trap
focusTrap.activate()

// Later, deactivate
focusTrap.deactivate()

// Get all focusable elements
const focusableElements = focusTrap.getFocusableElements()`

const autoFocusCode = `// Auto-focus the first focusable element
const modal = createModal({
  trapFocus: true,
  autoFocus: true, // Default: true
})

// Disable auto-focus
const modal2 = createModal({
  trapFocus: true,
  autoFocus: false,
})`

const accessibilityCode = `// Focus management is critical for accessibility
// ModalKit automatically:

// 1. Moves focus into modal on open
// 2. Traps focus within modal
// 3. Returns focus on close
// 4. Supports Tab and Shift+Tab navigation

// For screen readers, ensure your modal has:
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-desc">Modal description</p>
  {/* focusable content */}
</div>`

export default function FocusManagement() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Focus Management</h1>
        <p>
          Proper focus management is essential for accessibility. ModalKit
          provides built-in focus trapping, initial focus, and return focus
          functionality to ensure keyboard users can navigate modals effectively.
        </p>

        <h2>Focus Trap</h2>
        <p>
          When a modal opens with focus trapping enabled, keyboard focus is
          contained within the modal. This prevents users from accidentally
          tabbing to content behind the modal.
        </p>
        <CodeBlock code={focusTrapCode} language="typescript" filename="focus-trap.ts" />

        <h2>Initial Focus</h2>
        <p>
          Control which element receives focus when the modal opens:
        </p>
        <CodeBlock code={initialFocusCode} language="typescript" />

        <h2>Return Focus</h2>
        <p>
          When the modal closes, focus should return to the element that
          triggered it:
        </p>
        <CodeBlock code={returnFocusCode} language="typescript" />

        <h2>Focusable Elements</h2>
        <p>
          ModalKit automatically identifies focusable elements within the modal:
        </p>
        <CodeBlock code={focusableElementsCode} language="typescript" />

        <h2>React Example</h2>
        <p>
          Here's a complete React example with focus management:
        </p>
        <CodeBlock code={reactFocusCode} language="tsx" filename="FocusExample.tsx" />

        <h2>Custom Focus Trap</h2>
        <p>
          For advanced use cases, you can use the focus trap utility directly:
        </p>
        <CodeBlock code={customFocusTrapCode} language="typescript" />

        <h2>Auto Focus</h2>
        <p>
          Control whether the first focusable element receives focus automatically:
        </p>
        <CodeBlock code={autoFocusCode} language="typescript" />

        <h2>Accessibility Considerations</h2>
        <p>
          Focus management works together with ARIA attributes for full
          accessibility:
        </p>
        <CodeBlock code={accessibilityCode} language="tsx" />

        <h2>Best Practices</h2>
        <ul>
          <li>
            <strong>Always enable focus trap</strong> for modal dialogs to
            prevent users from getting lost
          </li>
          <li>
            <strong>Set initial focus</strong> to the most relevant element
            (usually the first interactive element or the primary action)
          </li>
          <li>
            <strong>Ensure return focus</strong> so users know where they were
            before opening the modal
          </li>
          <li>
            <strong>Include a close button</strong> that's easily focusable
          </li>
          <li>
            <strong>Test with keyboard only</strong> to verify the focus flow
          </li>
          <li>
            <strong>Use visible focus indicators</strong> so users can see
            which element is focused
          </li>
        </ul>

        <h2>Common Issues</h2>
        <ul>
          <li>
            <strong>No focusable elements:</strong> Ensure your modal has at
            least one focusable element (button, input, or link)
          </li>
          <li>
            <strong>Focus escaping:</strong> Check that all interactive elements
            inside the modal are properly marked up
          </li>
          <li>
            <strong>Focus not returning:</strong> Make sure the trigger element
            exists and is focusable when the modal closes
          </li>
        </ul>
      </div>
    </div>
  )
}
