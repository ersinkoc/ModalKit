import CodeBlock from '../../components/CodeBlock'

const confirmDialogCode = `import { confirm } from '@oxog/modalkit'

// Basic confirmation
const confirmed = await confirm({
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
})

if (confirmed) {
  // User clicked confirm
  deleteItem()
} else {
  // User clicked cancel or pressed Escape
  console.log('Cancelled')
}`

const confirmOptionsCode = `const confirmed = await confirm({
  // Content
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',

  // Button text
  confirmText: 'Yes, proceed',
  cancelText: 'No, cancel',

  // Styling hints (use with your own CSS)
  variant: 'danger', // 'default' | 'danger' | 'warning'

  // Behavior
  closeOnOverlayClick: true,
  closeOnEscape: true,

  // Animation
  animated: true,
  animationDuration: 200,
})`

const alertDialogCode = `import { alert } from '@oxog/modalkit'

// Basic alert
await alert({
  title: 'Success!',
  message: 'Your changes have been saved successfully.',
})

// With variant
await alert({
  title: 'Error',
  message: 'Something went wrong. Please try again.',
  variant: 'error',
})

// Different variants
await alert({ title: 'Info', message: '...', variant: 'info' })
await alert({ title: 'Success', message: '...', variant: 'success' })
await alert({ title: 'Warning', message: '...', variant: 'warning' })
await alert({ title: 'Error', message: '...', variant: 'error' })`

const alertOptionsCode = `await alert({
  // Content
  title: 'Notification',
  message: 'This is an important message.',

  // Button text
  confirmText: 'OK',

  // Variant
  variant: 'info', // 'info' | 'success' | 'warning' | 'error'

  // Behavior
  closeOnEscape: true,

  // Animation
  animated: true,
  animationDuration: 200,
})`

const promptDialogCode = `import { prompt } from '@oxog/modalkit'

// Basic prompt
const name = await prompt({
  title: 'Enter Your Name',
  message: 'Please enter your full name:',
})

if (name !== null) {
  // User entered a value
  console.log('Name:', name)
} else {
  // User cancelled
  console.log('Cancelled')
}

// With default value
const email = await prompt({
  title: 'Update Email',
  message: 'Enter your new email address:',
  defaultValue: 'user@example.com',
  placeholder: 'email@example.com',
})`

const promptValidationCode = `const age = await prompt({
  title: 'Enter Age',
  message: 'Please enter your age:',
  inputType: 'number',

  // Validation function
  validate: (value) => {
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      return 'Please enter a valid number'
    }
    if (num < 0 || num > 150) {
      return 'Age must be between 0 and 150'
    }
    return true // Valid
  },
})

// Password input
const password = await prompt({
  title: 'Enter Password',
  message: 'Please enter your password:',
  inputType: 'password',
  validate: (value) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return true
  },
})`

const reactDialogsCode = `import { useConfirm, useAlert, usePrompt } from '@oxog/modalkit/react'

function MyComponent() {
  const confirm = useConfirm()
  const alert = useAlert()
  const prompt = usePrompt()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure?',
    })

    if (confirmed) {
      await deleteItem()
      await alert({
        title: 'Deleted',
        message: 'Item has been deleted.',
        variant: 'success',
      })
    }
  }

  const handleRename = async () => {
    const newName = await prompt({
      title: 'Rename Item',
      message: 'Enter new name:',
      defaultValue: currentName,
    })

    if (newName) {
      await renameItem(newName)
    }
  }

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleRename}>Rename</button>
    </>
  )
}`

const reactComponentsCode = `import {
  ConfirmDialog,
  AlertDialog,
  PromptDialog,
} from '@oxog/modalkit/react'

function DialogComponents() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  return (
    <>
      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Confirm Action"
        message="Are you sure?"
        onConfirm={() => console.log('Confirmed!')}
        onCancel={() => console.log('Cancelled')}
      />

      <AlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        title="Alert"
        message="This is an alert!"
        variant="info"
      />

      <PromptDialog
        open={showPrompt}
        onOpenChange={setShowPrompt}
        title="Input"
        message="Enter value:"
        onSubmit={(value) => console.log('Value:', value)}
      />
    </>
  )
}`

export default function Dialogs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Dialogs</h1>
        <p>
          ModalKit provides built-in dialog utilities for common use cases:
          confirmations, alerts, and prompts. All dialogs use Promise-based
          APIs for easy async/await usage.
        </p>

        <h2>Confirm Dialog</h2>
        <p>
          The <code>confirm</code> function displays a confirmation dialog and
          returns a Promise that resolves to <code>true</code> if confirmed,
          or <code>false</code> if cancelled.
        </p>
        <CodeBlock code={confirmDialogCode} language="typescript" filename="confirm.ts" />

        <h3>Options</h3>
        <CodeBlock code={confirmOptionsCode} language="typescript" />

        <h2>Alert Dialog</h2>
        <p>
          The <code>alert</code> function displays an informational dialog.
          The Promise resolves when the user dismisses it.
        </p>
        <CodeBlock code={alertDialogCode} language="typescript" filename="alert.ts" />

        <h3>Options</h3>
        <CodeBlock code={alertOptionsCode} language="typescript" />

        <h2>Prompt Dialog</h2>
        <p>
          The <code>prompt</code> function displays an input dialog. Returns
          the entered value or <code>null</code> if cancelled.
        </p>
        <CodeBlock code={promptDialogCode} language="typescript" filename="prompt.ts" />

        <h3>Validation</h3>
        <p>
          Add custom validation to prompt dialogs:
        </p>
        <CodeBlock code={promptValidationCode} language="typescript" />

        <h2>React Integration</h2>

        <h3>Hooks</h3>
        <p>
          Use the dialog hooks for an imperative API in React:
        </p>
        <CodeBlock code={reactDialogsCode} language="tsx" filename="MyComponent.tsx" />

        <h3>Components</h3>
        <p>
          Or use the dialog components for a declarative approach:
        </p>
        <CodeBlock code={reactComponentsCode} language="tsx" filename="DialogComponents.tsx" />

        <h2>Customization</h2>
        <p>
          While the dialog functions provide convenience, you have full control
          over styling. The <code>variant</code> prop is a hint that you can
          use with your own CSS classes.
        </p>
        <ul>
          <li>
            <strong>Confirm variants:</strong> <code>default</code>,{' '}
            <code>danger</code>, <code>warning</code>
          </li>
          <li>
            <strong>Alert variants:</strong> <code>info</code>,{' '}
            <code>success</code>, <code>warning</code>, <code>error</code>
          </li>
        </ul>

        <h2>Best Practices</h2>
        <ul>
          <li>
            Use confirmation dialogs for destructive or irreversible actions
          </li>
          <li>
            Keep dialog messages clear and concise
          </li>
          <li>
            Use appropriate variants to convey the nature of the action
          </li>
          <li>
            Always handle the cancelled/null case gracefully
          </li>
          <li>
            Consider using custom button text for clarity (e.g., "Delete" instead
            of "OK")
          </li>
        </ul>
      </div>
    </div>
  )
}
