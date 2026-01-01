import CodeBlock from '../../components/CodeBlock'

const ariaExampleCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  role: 'dialog', // or 'alertdialog' for alerts
  ariaLabelledby: 'modal-title',
  ariaDescribedby: 'modal-description',
})

// The getContentProps() returns:
{
  role: 'dialog',
  'aria-modal': 'true',
  'aria-labelledby': 'modal-title',
  'aria-describedby': 'modal-description',
  tabIndex: -1,
}`

const accessibleMarkupCode = `<!-- Accessible modal structure -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  tabindex="-1"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-desc">
    A description of the modal's purpose and content.
  </p>

  <div>
    <!-- Modal content -->
  </div>

  <button type="button" aria-label="Close modal">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`

const reactAccessibleCode = `import {
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

function AccessibleModal() {
  return (
    <Modal>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContainer>
          <ModalContent>
            {/* ModalTitle auto-generates aria-labelledby */}
            <ModalHeader>
              <ModalTitle>Accessible Modal</ModalTitle>
              {/* ModalDescription auto-generates aria-describedby */}
              <ModalDescription>
                This modal follows WAI-ARIA best practices.
              </ModalDescription>
            </ModalHeader>

            <ModalBody>
              <p>Your content here.</p>
            </ModalBody>

            <ModalFooter>
              <ModalClose>
                {/* aria-label is auto-added */}
                <button>Close</button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </ModalPortal>
    </Modal>
  )
}`

const alertDialogCode = `import { createModal } from '@oxog/modalkit'

// Use role="alertdialog" for important alerts
const alertModal = createModal({
  role: 'alertdialog',
  closeOnEscape: false, // Don't allow easy dismissal
  closeOnOverlayClick: false,
})

// Or with the alert() function
import { alert } from '@oxog/modalkit'

await alert({
  title: 'Session Expired',
  message: 'Your session has expired. Please log in again.',
  role: 'alertdialog', // Forces user to acknowledge
})`

const keyboardNavCode = `// ModalKit handles these keyboard interactions:

// Tab: Move focus to next focusable element
// Shift + Tab: Move focus to previous focusable element
// Escape: Close the modal (if closeOnEscape is true)
// Enter: Activate focused button

// Focus trap ensures:
// - Tab from last element wraps to first
// - Shift+Tab from first element wraps to last
// - Focus cannot escape the modal`

const screenReaderCode = `// Screen reader announcements
// ModalKit ensures proper announcements by:

// 1. Using role="dialog" or role="alertdialog"
//    - Screen readers announce when dialog opens

// 2. aria-modal="true"
//    - Hides background content from screen readers

// 3. aria-labelledby points to title
//    - Screen reader announces the title

// 4. aria-describedby points to description
//    - Screen reader announces the description

// 5. Focus management
//    - Focus moves into modal, SR announces focused element`

const hideBackgroundCode = `// When a modal opens, background content should be
// hidden from assistive technologies

// ModalKit automatically adds aria-hidden to siblings
// of the modal portal

// Before modal opens:
<body>
  <div id="app">...</div>
  <div id="modal-root"></div>
</body>

// After modal opens:
<body>
  <div id="app" aria-hidden="true">...</div>
  <div id="modal-root">
    <div role="dialog">...</div>
  </div>
</body>`

const focusIndicatorsCode = `/* Always show focus indicators for accessibility */
.modal-content *:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* Or use focus-visible for keyboard-only focus */
.modal-content *:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* Never remove focus outlines without replacement */
/* BAD: */
*:focus {
  outline: none; /* Don't do this! */
}`

const testingA11yCode = `// Testing accessibility

// 1. Keyboard-only navigation
// - Can you open the modal with keyboard?
// - Can you Tab through all elements?
// - Can you close with Escape?
// - Does focus return to trigger?

// 2. Screen reader testing
// - Is the modal title announced?
// - Is the description announced?
// - Are all interactive elements labeled?
// - Is background content hidden?

// 3. Automated testing tools
// - axe-core
// - Lighthouse accessibility audit
// - WAVE browser extension`

export default function Accessibility() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Accessibility</h1>
        <p>
          ModalKit is designed with accessibility as a core feature. It follows
          WAI-ARIA best practices to ensure modals are usable by everyone,
          including users of assistive technologies.
        </p>

        <h2>ARIA Attributes</h2>
        <p>
          ModalKit automatically adds the necessary ARIA attributes:
        </p>
        <CodeBlock code={ariaExampleCode} language="typescript" filename="aria.ts" />

        <h2>Accessible Markup</h2>
        <p>
          Here's an example of fully accessible modal markup:
        </p>
        <CodeBlock code={accessibleMarkupCode} language="html" />

        <h2>React Components</h2>
        <p>
          The React components automatically handle ARIA attributes:
        </p>
        <CodeBlock code={reactAccessibleCode} language="tsx" filename="AccessibleModal.tsx" />

        <h2>Alert Dialogs</h2>
        <p>
          Use <code>role="alertdialog"</code> for important messages that
          require user acknowledgment:
        </p>
        <CodeBlock code={alertDialogCode} language="typescript" />

        <h2>Keyboard Navigation</h2>
        <p>
          ModalKit fully supports keyboard navigation:
        </p>
        <CodeBlock code={keyboardNavCode} language="typescript" />

        <h2>Screen Reader Support</h2>
        <p>
          Modals are properly announced to screen readers:
        </p>
        <CodeBlock code={screenReaderCode} language="typescript" />

        <h2>Background Content</h2>
        <p>
          Background content is hidden from assistive technologies:
        </p>
        <CodeBlock code={hideBackgroundCode} language="html" />

        <h2>Focus Indicators</h2>
        <p>
          Always maintain visible focus indicators:
        </p>
        <CodeBlock code={focusIndicatorsCode} language="css" filename="focus.css" />

        <h2>Testing Accessibility</h2>
        <p>
          Ensure your modals are accessible by testing:
        </p>
        <CodeBlock code={testingA11yCode} language="typescript" />

        <h2>Accessibility Checklist</h2>
        <ul>
          <li>
            <strong>Role:</strong> Use <code>role="dialog"</code> or{' '}
            <code>role="alertdialog"</code>
          </li>
          <li>
            <strong>Modal indication:</strong> Add <code>aria-modal="true"</code>
          </li>
          <li>
            <strong>Label:</strong> Use <code>aria-labelledby</code> pointing
            to the title
          </li>
          <li>
            <strong>Description:</strong> Use <code>aria-describedby</code> for
            additional context
          </li>
          <li>
            <strong>Focus trap:</strong> Keep focus within the modal
          </li>
          <li>
            <strong>Focus return:</strong> Return focus to trigger on close
          </li>
          <li>
            <strong>Escape key:</strong> Allow closing with Escape (for dialogs)
          </li>
          <li>
            <strong>Focus indicators:</strong> Show visible focus outlines
          </li>
          <li>
            <strong>Close button:</strong> Include an accessible close button
          </li>
        </ul>

        <h2>Common Mistakes</h2>
        <ul>
          <li>
            <strong>Missing title:</strong> Always include a visible title
            with <code>aria-labelledby</code>
          </li>
          <li>
            <strong>Removing focus outlines:</strong> Never remove focus
            indicators without a replacement
          </li>
          <li>
            <strong>No close button:</strong> Always provide a way to close
            the modal
          </li>
          <li>
            <strong>Focus escaping:</strong> Ensure focus cannot leave the modal
          </li>
          <li>
            <strong>Missing labels:</strong> All interactive elements need
            accessible labels
          </li>
        </ul>
      </div>
    </div>
  )
}
