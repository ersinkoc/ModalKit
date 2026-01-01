# ModalKit

<div align="center">
  <h3>Headless modal/dialog with stacking and focus trap</h3>
  <p>
    <a href="https://modalkit.oxog.dev">Documentation</a> •
    <a href="https://modalkit.oxog.dev/docs/getting-started">Getting Started</a> •
    <a href="https://modalkit.oxog.dev/examples">Examples</a>
  </p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@oxog/modalkit.svg)](https://www.npmjs.com/package/@oxog/modalkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oxog/modalkit)](https://bundlephobia.com/package/@oxog/modalkit)
[![license](https://img.shields.io/npm/l/@oxog/modalkit.svg)](LICENSE)

</div>

---

## Features

- 🪟 **Modal/Dialog** - Flexible modal component with full customization
- ✅ **Confirm** - Promise-based confirm dialog
- ⚠️ **Alert** - Alert notifications with variants
- ✏️ **Prompt** - Input prompt with validation
- 📚 **Stacking** - Nested/stacked modals with z-index management
- 🎯 **Focus Trap** - Automatic focus management
- 🔒 **Scroll Lock** - Body scroll prevention
- ⌨️ **Keyboard** - Escape to close, tab navigation
- 🎬 **Animation** - CSS animation support with enter/exit states
- 🌀 **Portal** - Render to document body
- 📢 **Imperative** - Programmatic API
- ♿ **Accessible** - WAI-ARIA compliant
- 🎨 **Headless** - Full styling control
- ⚛️ **React** - Hooks & components included
- 📦 **Zero Dependencies**
- ⚡ **< 3KB** - Tiny bundle size

## Installation

```bash
npm install @oxog/modalkit
```

## Quick Start

### Basic Usage

```typescript
import { createModal, confirm, alert, prompt } from '@oxog/modalkit'

// Create a modal
const modal = createModal({
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
  preventScroll: true,
})

// Open/close
modal.open()
modal.close()
modal.toggle()

// Subscribe to state changes
modal.subscribe((state) => {
  console.log('Modal state:', state)
})
```

### Confirm Dialog

```typescript
import { confirm } from '@oxog/modalkit'

async function handleDelete() {
  const confirmed = await confirm({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger',
  })

  if (confirmed) {
    deleteItem()
  }
}
```

### Alert Dialog

```typescript
import { alert } from '@oxog/modalkit'

await alert({
  title: 'Success',
  message: 'Your changes have been saved.',
  variant: 'success',
})
```

### Prompt Dialog

```typescript
import { prompt } from '@oxog/modalkit'

const name = await prompt({
  title: 'Enter Name',
  message: 'What is your name?',
  placeholder: 'John Doe',
  validate: (value) => {
    if (value.length < 2) return 'Name too short'
    return true
  },
})

if (name) {
  console.log('Hello,', name)
}
```

## React Integration

```tsx
import {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
  useModal,
  useConfirm,
  useAlert,
  usePrompt,
} from '@oxog/modalkit/react'

// Using Components
function MyModal() {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay>
          <ModalContainer>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Modal Title</ModalTitle>
                <ModalClose />
              </ModalHeader>
              <ModalBody>
                <p>Modal content goes here...</p>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => setOpen(false)}>Close</button>
              </ModalFooter>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      </ModalPortal>
    </Modal>
  )
}

// Using Hooks
function DeleteButton() {
  const confirm = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete',
      message: 'Are you sure?',
      variant: 'danger',
    })

    if (confirmed) {
      deleteItem()
    }
  }

  return <button onClick={handleDelete}>Delete</button>
}
```

## API Reference

### createModal(config?)

Creates a new modal instance.

```typescript
const modal = createModal({
  // Initial state
  defaultOpen: false,

  // Close behavior
  closeOnOverlayClick: true,
  closeOnEscape: true,

  // Focus behavior
  trapFocus: true,
  autoFocus: true,
  restoreFocus: true,

  // Scroll behavior
  preventScroll: true,

  // Animation
  animated: false,
  animationDuration: 200,

  // Callbacks
  onOpen: () => {},
  onClose: () => {},
  onOpenChange: (open) => {},

  // Accessibility
  role: 'dialog',
  ariaLabel: 'Modal dialog',
})
```

### Modal Instance Methods

```typescript
modal.open()              // Open the modal
modal.close()             // Close the modal
modal.toggle()            // Toggle open/close
modal.isOpen()            // Check if open
modal.isMounted()         // Check if mounted
modal.getState()          // Get full state
modal.subscribe(cb)       // Subscribe to state changes
modal.getStackOrder()     // Get position in stack
modal.isTopMost()         // Check if top-most
modal.isAnimating()       // Check if animating
modal.getAnimationState() // Get animation state
modal.destroy()           // Cleanup
```

### Props Getters

```typescript
modal.getPortalProps()      // Props for portal element
modal.getOverlayProps()     // Props for overlay/backdrop
modal.getContainerProps()   // Props for container
modal.getContentProps()     // Props for content (has ARIA attrs)
modal.getTitleProps()       // Props for title (id for labelledby)
modal.getDescriptionProps() // Props for description
modal.getCloseButtonProps() // Props for close button
modal.getTriggerProps()     // Props for trigger button
```

### Modal Stack

```typescript
import { modalStack } from '@oxog/modalkit'

modalStack.count()       // Number of open modals
modalStack.isEmpty()     // Check if empty
modalStack.getAll()      // Get all modals
modalStack.getTopMost()  // Get top-most modal
modalStack.closeAll()    // Close all modals
modalStack.closeTopMost() // Close top-most only

// Events
modalStack.on('push', (modal) => {})
modalStack.on('pop', (modal) => {})
modalStack.on('change', (modals) => {})
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Documentation

Visit [modalkit.oxog.dev](https://modalkit.oxog.dev) for full documentation.

## License

MIT © [Ersin KOÇ](https://github.com/ersinkoc)
