# ModalKit - Headless Modal/Dialog with Stacking, Focus Trap, and Animations

## Package Identity

- **NPM Package**: `@oxog/modalkit`
- **GitHub Repository**: `https://github.com/ersinkoc/modalkit`
- **Documentation Site**: `https://modalkit.oxog.dev`
- **License**: MIT
- **Author**: Ersin KOÇ
- **Created**: 2025-12-31

**NO social media, Discord, email, or external links.**

## Package Description

Zero-dependency headless modal/dialog with stacking, focus trap, and animations.

ModalKit is a lightweight, framework-agnostic library for building modal and dialog components in web applications. Features basic modal/dialog with customizable behavior, confirm dialogs with promise-based API, alert dialogs for notifications, prompt dialogs with input validation, nested/stacked modals with proper z-index management, automatic focus trapping within modal, click outside to close option, escape key to close option, body scroll lock when modal is open, CSS animation support with enter/exit states, portal rendering to document body, imperative API for programmatic modal control, full keyboard navigation, complete WAI-ARIA accessibility with proper roles and attributes, and comprehensive React integration with useModal, useConfirm, useAlert, usePrompt hooks and Modal, ConfirmDialog, AlertDialog, PromptDialog components—all under 3KB with zero runtime dependencies.

---

## NON-NEGOTIABLE RULES

These rules are ABSOLUTE and must be followed without exception:

### 1. ZERO DEPENDENCIES
```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```
Implement EVERYTHING from scratch. No runtime dependencies allowed.

### 2. 100% TEST COVERAGE & 100% SUCCESS RATE
- Every line of code must be tested
- Every branch must be tested
- All tests must pass (100% success rate)
- Use Vitest for testing
- Coverage report must show 100%

### 3. DEVELOPMENT WORKFLOW
Create these documents FIRST, before any code:
1. **SPECIFICATION.md** - Complete package specification
2. **IMPLEMENTATION.md** - Architecture and design decisions
3. **TASKS.md** - Ordered task list with dependencies

Only after these documents are complete, implement the code following TASKS.md sequentially.

### 4. TYPESCRIPT STRICT MODE
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

### 5. NO EXTERNAL LINKS
- ❌ No social media (Twitter, LinkedIn, etc.)
- ❌ No Discord/Slack links
- ❌ No email addresses
- ❌ No donation/sponsor links
- ✅ Only GitHub repo and documentation site allowed

### 6. BUNDLE SIZE TARGET
- Core package: < 3KB minified + gzipped
- With React adapter: < 5KB
- Tree-shakeable

---

## CORE TYPES

```typescript
// ============ MODAL CONFIG ============

interface ModalConfig {
  // State
  open?: boolean
  defaultOpen?: boolean
  
  // Close behavior
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  
  // Scroll behavior
  preventScroll?: boolean
  scrollBehavior?: 'inside' | 'outside'
  
  // Focus behavior
  trapFocus?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
  initialFocusRef?: HTMLElement | (() => HTMLElement | null) | null
  finalFocusRef?: HTMLElement | (() => HTMLElement | null) | null
  
  // Stacking
  stackable?: boolean
  closeOnStackedOpen?: boolean
  
  // Animation
  animated?: boolean
  animationDuration?: number
  
  // Portal
  portalTarget?: HTMLElement | string | null
  disablePortal?: boolean
  
  // Callbacks
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: (open: boolean) => void
  onAnimationStart?: (type: AnimationType) => void
  onAnimationEnd?: (type: AnimationType) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onOverlayClick?: (event: MouseEvent) => void
  
  // Accessibility
  id?: string
  role?: 'dialog' | 'alertdialog'
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

type AnimationType = 'enter' | 'exit'

type AnimationState = 
  | 'idle'
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited'

// ============ MODAL STATE ============

interface ModalState {
  open: boolean
  animationState: AnimationState
  stackOrder: number
  isTopMost: boolean
  mounted: boolean
}

// ============ MODAL INSTANCE ============

interface Modal {
  // State
  isOpen(): boolean
  isMounted(): boolean
  getState(): ModalState
  subscribe(callback: (state: ModalState) => void): () => void
  
  // Actions
  open(): void
  close(): void
  toggle(): void
  
  // Stack
  getStackOrder(): number
  isTopMost(): boolean
  
  // Animation
  isAnimating(): boolean
  getAnimationState(): AnimationState
  
  // Focus
  focusFirst(): void
  focusLast(): void
  contains(element: Element | null): boolean
  
  // Portal
  getPortalTarget(): HTMLElement
  
  // Props getters
  getPortalProps(): PortalProps
  getOverlayProps(): OverlayProps
  getContainerProps(): ContainerProps
  getContentProps(): ContentProps
  getTitleProps(id?: string): TitleProps
  getDescriptionProps(id?: string): DescriptionProps
  getCloseButtonProps(): CloseButtonProps
  getTriggerProps(): TriggerProps
  
  // Config
  getConfig(): ModalConfig
  setConfig(config: Partial<ModalConfig>): void
  
  // Cleanup
  destroy(): void
}

// ============ PROPS GETTERS ============

interface PortalProps {
  'data-modalkit-portal': ''
  'data-state': AnimationState
}

interface OverlayProps {
  ref: (el: HTMLElement | null) => void
  'data-modalkit-overlay': ''
  'data-state': AnimationState
  style: {
    position: 'fixed'
    inset: '0'
    zIndex: number
  }
  onClick: (e: MouseEvent) => void
}

interface ContainerProps {
  ref: (el: HTMLElement | null) => void
  'data-modalkit-container': ''
  'data-state': AnimationState
  style: {
    position: 'fixed'
    inset: '0'
    display: 'flex'
    alignItems: string
    justifyContent: string
    zIndex: number
    overflow: string
  }
  onClick: (e: MouseEvent) => void
}

interface ContentProps {
  ref: (el: HTMLElement | null) => void
  role: 'dialog' | 'alertdialog'
  'aria-modal': true
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-modalkit-content': ''
  'data-state': AnimationState
  tabIndex: -1
  onKeyDown: (e: KeyboardEvent) => void
}

interface TitleProps {
  id: string
  'data-modalkit-title': ''
}

interface DescriptionProps {
  id: string
  'data-modalkit-description': ''
}

interface CloseButtonProps {
  type: 'button'
  'aria-label': string
  'data-modalkit-close': ''
  onClick: (e: MouseEvent) => void
}

interface TriggerProps {
  type: 'button'
  'aria-haspopup': 'dialog'
  'aria-expanded': boolean
  'data-modalkit-trigger': ''
  onClick: (e: MouseEvent) => void
}

// ============ MODAL STACK ============

interface ModalStack {
  // Query
  count(): number
  isEmpty(): boolean
  getAll(): Modal[]
  getTopMost(): Modal | null
  getByOrder(order: number): Modal | null
  
  // Actions
  closeAll(): void
  closeTopMost(): void
  
  // Events
  on(event: 'push', handler: (modal: Modal) => void): () => void
  on(event: 'pop', handler: (modal: Modal) => void): () => void
  on(event: 'change', handler: (modals: Modal[]) => void): () => void
  off(event: StackEvent, handler: Function): void
}

type StackEvent = 'push' | 'pop' | 'change'

// ============ CONFIRM DIALOG ============

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger' | 'warning'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

interface ConfirmOptionsAdvanced extends ConfirmOptions {
  buttons?: ConfirmButton[]
}

interface ConfirmButton {
  text: string
  value: string | boolean
  variant?: 'default' | 'primary' | 'danger' | 'warning'
  autoFocus?: boolean
}

// ============ ALERT DIALOG ============

interface AlertOptions {
  title?: string
  message: string
  confirmText?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

// ============ PROMPT DIALOG ============

interface PromptOptions {
  title?: string
  message?: string
  placeholder?: string
  defaultValue?: string
  confirmText?: string
  cancelText?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  validate?: (value: string) => boolean | string
  required?: boolean
  minLength?: number
  maxLength?: number
}

// ============ FOCUS TRAP ============

interface FocusTrapConfig {
  container: HTMLElement
  initialFocus?: HTMLElement | (() => HTMLElement | null) | null
  fallbackFocus?: HTMLElement | (() => HTMLElement | null) | null
  returnFocus?: HTMLElement | (() => HTMLElement | null) | null
  escapeDeactivates?: boolean
  clickOutsideDeactivates?: boolean
  allowOutsideClick?: boolean | ((e: MouseEvent) => boolean)
  onActivate?: () => void
  onDeactivate?: () => void
}

interface FocusTrap {
  activate(): void
  deactivate(): void
  pause(): void
  unpause(): void
  isActive(): boolean
  isPaused(): boolean
}

// ============ SCROLL LOCK ============

interface ScrollLock {
  lock(): void
  unlock(): void
  isLocked(): boolean
}
```

---

## FACTORY FUNCTION

```typescript
import { createModal } from '@oxog/modalkit'

// ===== BASIC USAGE =====

const modal = createModal({
  onClose: () => console.log('Modal closed'),
})

// Open/close
modal.open()
modal.close()
modal.toggle()


// ===== FULL CONFIGURATION =====

const modal = createModal({
  // Initial state
  defaultOpen: false,
  
  // Close behavior
  closeOnOverlayClick: true,
  closeOnEscape: true,
  
  // Scroll
  preventScroll: true,
  scrollBehavior: 'inside',
  
  // Focus
  trapFocus: true,
  autoFocus: true,
  restoreFocus: true,
  initialFocusRef: document.getElementById('email-input'),
  
  // Stacking
  stackable: true,
  
  // Animation
  animated: true,
  animationDuration: 200,
  
  // Portal
  portalTarget: document.body,
  
  // Callbacks
  onOpen: () => console.log('Opened'),
  onClose: () => console.log('Closed'),
  onOpenChange: (open) => console.log('Open changed:', open),
  onAnimationStart: (type) => console.log('Animation start:', type),
  onAnimationEnd: (type) => console.log('Animation end:', type),
  onEscapeKeyDown: (e) => console.log('Escape pressed'),
  onOverlayClick: (e) => console.log('Overlay clicked'),
  
  // Accessibility
  role: 'dialog',
  ariaLabel: 'Example modal',
})


// ===== STATE MANAGEMENT =====

// Check state
modal.isOpen()           // boolean
modal.isMounted()        // boolean
modal.isAnimating()      // boolean
modal.getAnimationState() // AnimationState
modal.getStackOrder()    // number
modal.isTopMost()        // boolean

// Get full state
const state = modal.getState()
// { open, animationState, stackOrder, isTopMost, mounted }

// Subscribe to changes
const unsubscribe = modal.subscribe((state) => {
  console.log('State changed:', state)
  render()
})


// ===== CONFIG =====

// Get config
const config = modal.getConfig()

// Update config
modal.setConfig({
  closeOnEscape: false,
})


// ===== CLEANUP =====

modal.destroy()
```

---

## BASIC MODAL

```typescript
import { createModal } from '@oxog/modalkit'

const modal = createModal({
  closeOnOverlayClick: true,
  closeOnEscape: true,
  trapFocus: true,
  preventScroll: true,
})

// Trigger button
const openBtn = document.getElementById('open-modal')
const triggerProps = modal.getTriggerProps()
Object.assign(openBtn, triggerProps)


// ============ RENDER FUNCTION ============

function render() {
  const state = modal.getState()
  
  // Remove existing portal
  const existingPortal = document.querySelector('[data-modalkit-portal]')
  if (existingPortal) {
    existingPortal.remove()
  }
  
  // Don't render if closed and not animating
  if (!state.open && state.animationState === 'idle') {
    return
  }
  
  // Portal
  const portal = document.createElement('div')
  const portalProps = modal.getPortalProps()
  Object.assign(portal, portalProps)
  
  // Overlay
  const overlay = document.createElement('div')
  const overlayProps = modal.getOverlayProps()
  applyProps(overlay, overlayProps)
  overlay.className = 'modal-overlay'
  
  // Container
  const container = document.createElement('div')
  const containerProps = modal.getContainerProps()
  applyProps(container, containerProps)
  container.className = 'modal-container'
  
  // Content
  const content = document.createElement('div')
  const contentProps = modal.getContentProps()
  applyProps(content, contentProps)
  content.className = 'modal-content'
  
  // Header
  const header = document.createElement('div')
  header.className = 'modal-header'
  
  // Title
  const title = document.createElement('h2')
  const titleProps = modal.getTitleProps()
  Object.assign(title, titleProps)
  title.className = 'modal-title'
  title.textContent = 'Modal Title'
  
  // Close button
  const closeBtn = document.createElement('button')
  const closeProps = modal.getCloseButtonProps()
  applyProps(closeBtn, closeProps)
  closeBtn.className = 'modal-close'
  closeBtn.innerHTML = '&times;'
  
  header.append(title, closeBtn)
  
  // Body
  const body = document.createElement('div')
  body.className = 'modal-body'
  
  // Description
  const description = document.createElement('p')
  const descProps = modal.getDescriptionProps()
  Object.assign(description, descProps)
  description.textContent = 'This is the modal description.'
  
  body.appendChild(description)
  
  // Footer
  const footer = document.createElement('div')
  footer.className = 'modal-footer'
  
  const cancelBtn = document.createElement('button')
  cancelBtn.textContent = 'Cancel'
  cancelBtn.onclick = () => modal.close()
  
  const saveBtn = document.createElement('button')
  saveBtn.textContent = 'Save'
  saveBtn.className = 'primary'
  saveBtn.onclick = () => {
    // Save logic
    modal.close()
  }
  
  footer.append(cancelBtn, saveBtn)
  
  // Assemble
  content.append(header, body, footer)
  container.appendChild(content)
  overlay.appendChild(container)
  portal.appendChild(overlay)
  
  document.body.appendChild(portal)
}

// Subscribe and initial render
modal.subscribe(render)

// Helper to apply props including event handlers
function applyProps(element, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'ref') {
      value(element)
    } else if (key.startsWith('on') && typeof value === 'function') {
      const event = key.slice(2).toLowerCase()
      element.addEventListener(event, value)
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value)
    } else {
      element.setAttribute(key, value)
    }
  })
}
```

---

## CONFIRM DIALOG

```typescript
import { confirm } from '@oxog/modalkit'


// ============ SIMPLE CONFIRM ============

async function handleDelete() {
  const confirmed = await confirm('Are you sure you want to delete this item?')
  
  if (confirmed) {
    deleteItem()
  }
}


// ============ WITH OPTIONS ============

async function handleDelete() {
  const confirmed = await confirm({
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger',
  })
  
  if (confirmed) {
    deleteItem()
  }
}


// ============ CUSTOM BUTTONS ============

async function handleUnsavedChanges() {
  const result = await confirm({
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. What would you like to do?',
    buttons: [
      { text: 'Save', value: 'save', variant: 'primary', autoFocus: true },
      { text: 'Discard', value: 'discard', variant: 'danger' },
      { text: 'Cancel', value: 'cancel' },
    ],
  })
  
  if (result === 'save') {
    await saveChanges()
    navigate()
  } else if (result === 'discard') {
    navigate()
  }
  // 'cancel' - stay on page
}


// ============ VARIANTS ============

// Default (neutral)
await confirm({ message: 'Continue?', variant: 'default' })

// Danger (destructive action)
await confirm({ message: 'Delete?', variant: 'danger' })

// Warning (caution)
await confirm({ message: 'Proceed?', variant: 'warning' })
```

---

## ALERT DIALOG

```typescript
import { alert } from '@oxog/modalkit'


// ============ SIMPLE ALERT ============

await alert('Operation completed successfully!')


// ============ WITH OPTIONS ============

await alert({
  title: 'Success',
  message: 'Your changes have been saved.',
  confirmText: 'OK',
  variant: 'success',
})


// ============ VARIANTS ============

// Default
await alert({ message: 'Information', variant: 'default' })

// Success
await alert({ title: 'Success', message: 'Saved!', variant: 'success' })

// Warning
await alert({ title: 'Warning', message: 'Check your input', variant: 'warning' })

// Error
await alert({ title: 'Error', message: 'Something went wrong', variant: 'error' })

// Info
await alert({ title: 'Info', message: 'New features available', variant: 'info' })


// ============ AFTER ASYNC OPERATION ============

async function handleSave() {
  try {
    await saveData()
    await alert({
      title: 'Success',
      message: 'Your data has been saved.',
      variant: 'success',
    })
  } catch (error) {
    await alert({
      title: 'Error',
      message: 'Failed to save data. Please try again.',
      variant: 'error',
    })
  }
}
```

---

## PROMPT DIALOG

```typescript
import { prompt } from '@oxog/modalkit'


// ============ SIMPLE PROMPT ============

const name = await prompt('What is your name?')

if (name) {
  console.log('Hello,', name)
}


// ============ WITH OPTIONS ============

const email = await prompt({
  title: 'Subscribe',
  message: 'Enter your email address to subscribe to our newsletter:',
  placeholder: 'email@example.com',
  type: 'email',
  confirmText: 'Subscribe',
  cancelText: 'No thanks',
})

if (email) {
  subscribe(email)
}


// ============ WITH VALIDATION ============

const username = await prompt({
  title: 'Create Username',
  message: 'Choose a username (3-20 characters, letters and numbers only):',
  placeholder: 'username',
  required: true,
  minLength: 3,
  maxLength: 20,
  validate: (value) => {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return 'Username can only contain letters and numbers'
    }
    if (reservedUsernames.includes(value.toLowerCase())) {
      return 'This username is not available'
    }
    return true
  },
})


// ============ WITH DEFAULT VALUE ============

const newName = await prompt({
  title: 'Rename File',
  message: 'Enter new file name:',
  defaultValue: currentFileName,
})

if (newName && newName !== currentFileName) {
  renameFile(newName)
}


// ============ PASSWORD INPUT ============

const password = await prompt({
  title: 'Enter Password',
  message: 'Please enter your password to continue:',
  type: 'password',
  required: true,
  minLength: 8,
})


// ============ NUMBER INPUT ============

const quantity = await prompt({
  title: 'Quantity',
  message: 'How many items do you want?',
  type: 'number',
  defaultValue: '1',
  validate: (value) => {
    const num = parseInt(value, 10)
    if (isNaN(num) || num < 1) return 'Enter a valid number'
    if (num > 100) return 'Maximum quantity is 100'
    return true
  },
})
```

---

## MODAL STACK

```typescript
import { createModal, modalStack } from '@oxog/modalkit'


// ============ STACKED MODALS ============

const settingsModal = createModal({
  stackable: true,
})

const confirmModal = createModal({
  stackable: true,
})

// Open first modal
settingsModal.open()
// Stack: [settingsModal]

// Open second modal (stacks on top)
confirmModal.open()
// Stack: [settingsModal, confirmModal]

// Check stack
modalStack.count()          // 2
modalStack.isEmpty()        // false
modalStack.getTopMost()     // confirmModal
settingsModal.isTopMost()   // false
confirmModal.isTopMost()    // true
settingsModal.getStackOrder() // 1
confirmModal.getStackOrder()  // 2


// ============ CLOSE OPERATIONS ============

// Close top modal only
modalStack.closeTopMost()
// Stack: [settingsModal]

// Close all modals
modalStack.closeAll()
// Stack: []


// ============ STACK EVENTS ============

modalStack.on('push', (modal) => {
  console.log('Modal pushed:', modal.getStackOrder())
})

modalStack.on('pop', (modal) => {
  console.log('Modal popped:', modal.getStackOrder())
})

modalStack.on('change', (modals) => {
  console.log('Stack changed, count:', modals.length)
})


// ============ Z-INDEX MANAGEMENT ============

// Z-index is automatically managed based on stack order
// Base z-index: 1000
// Each stacked modal gets +10

// settingsModal overlay: z-index 1000
// settingsModal content: z-index 1001
// confirmModal overlay: z-index 1010
// confirmModal content: z-index 1011


// ============ CLOSE NESTED ON ESCAPE ============

// By default, Escape closes only the top-most modal
// This allows users to close nested modals one by one
```

---

## FOCUS MANAGEMENT

```typescript
import { createModal, createFocusTrap } from '@oxog/modalkit'


// ============ BUILT-IN FOCUS TRAP ============

const modal = createModal({
  trapFocus: true,        // Enable focus trapping
  autoFocus: true,        // Auto-focus first focusable element
  restoreFocus: true,     // Restore focus after close
})


// ============ CUSTOM INITIAL FOCUS ============

const modal = createModal({
  trapFocus: true,
  
  // Focus specific element on open
  initialFocusRef: document.getElementById('email-input'),
  
  // Or use a function
  initialFocusRef: () => document.querySelector('.primary-button'),
})


// ============ CUSTOM RETURN FOCUS ============

const modal = createModal({
  trapFocus: true,
  restoreFocus: true,
  
  // Return focus to specific element
  finalFocusRef: document.getElementById('trigger-button'),
})


// ============ MANUAL FOCUS CONTROL ============

const modal = createModal({ trapFocus: true })

// Focus first focusable element
modal.focusFirst()

// Focus last focusable element
modal.focusLast()

// Check if element is inside modal
modal.contains(document.activeElement)


// ============ STANDALONE FOCUS TRAP ============

import { createFocusTrap } from '@oxog/modalkit'

const trap = createFocusTrap({
  container: document.getElementById('my-container'),
  
  initialFocus: document.getElementById('first-input'),
  
  escapeDeactivates: true,
  
  onActivate: () => console.log('Focus trap activated'),
  onDeactivate: () => console.log('Focus trap deactivated'),
})

// Activate
trap.activate()

// Deactivate
trap.deactivate()

// Pause (allow focus outside temporarily)
trap.pause()
trap.unpause()

// Check state
trap.isActive()
trap.isPaused()


// ============ FOCUSABLE ELEMENTS ============

/*
Focus trap considers these elements focusable:
- <a> with href
- <button> not disabled
- <input> not disabled
- <select> not disabled
- <textarea> not disabled
- Elements with tabindex >= 0
- Elements with contenteditable

Excludes:
- Hidden elements (display: none, visibility: hidden)
- Elements with tabindex="-1"
- Disabled form elements
*/
```

---

## SCROLL LOCK

```typescript
import { createModal, scrollLock } from '@oxog/modalkit'


// ============ BUILT-IN SCROLL LOCK ============

const modal = createModal({
  preventScroll: true,  // Lock body scroll when open
})


// ============ SCROLL BEHAVIOR ============

const modal = createModal({
  preventScroll: true,
  
  // 'inside' - scroll only inside modal content
  // 'outside' - no scroll lock, page scrolls behind modal
  scrollBehavior: 'inside',
})


// ============ STANDALONE SCROLL LOCK ============

import { scrollLock } from '@oxog/modalkit'

// Lock scroll
scrollLock.lock()

// Unlock scroll
scrollLock.unlock()

// Check state
scrollLock.isLocked()


// ============ SCROLL LOCK IMPLEMENTATION ============

/*
Scroll lock works by:
1. Saving current scroll position
2. Setting body overflow to 'hidden'
3. Adding padding-right to prevent layout shift (scrollbar width)
4. On unlock, restoring original styles and scroll position

Handles:
- Multiple lock/unlock calls (reference counting)
- Mobile touch scrolling
- Fixed elements
- iOS Safari quirks
*/
```

---

## ANIMATION SUPPORT

```typescript
import { createModal } from '@oxog/modalkit'


// ============ ENABLE ANIMATION ============

const modal = createModal({
  animated: true,
  animationDuration: 200,  // ms
})


// ============ ANIMATION STATES ============

modal.getAnimationState()
// 'idle'     - Modal is closed, no animation
// 'entering' - Modal is opening, animation in progress
// 'entered'  - Modal is open, animation complete
// 'exiting'  - Modal is closing, animation in progress
// 'exited'   - Modal closed, ready for unmount


// ============ ANIMATION CALLBACKS ============

const modal = createModal({
  animated: true,
  animationDuration: 200,
  
  onAnimationStart: (type) => {
    console.log('Animation started:', type)  // 'enter' | 'exit'
  },
  
  onAnimationEnd: (type) => {
    console.log('Animation ended:', type)
    
    if (type === 'exit') {
      // Safe to unmount/remove from DOM
    }
  },
})


// ============ CSS ANIMATIONS ============

/*
Use data-state attribute for CSS animations:

.modal-overlay[data-state="entering"] {
  animation: overlay-fade-in 200ms ease-out;
}

.modal-overlay[data-state="exiting"] {
  animation: overlay-fade-out 200ms ease-in;
}

.modal-content[data-state="entering"] {
  animation: content-slide-in 200ms ease-out;
}

.modal-content[data-state="exiting"] {
  animation: content-slide-out 200ms ease-in;
}

@keyframes overlay-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes overlay-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes content-slide-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes content-slide-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}
*/


// ============ RENDER WITH ANIMATION ============

function render() {
  const state = modal.getState()
  
  // Keep mounted during exit animation
  if (!state.open && state.animationState === 'idle') {
    removePortal()
    return
  }
  
  // Render portal with animation state
  renderPortal(state.animationState)
}
```

---

## REACT INTEGRATION

```tsx
import {
  ModalProvider,
  useModal,
  useModalContext,
  useConfirm,
  useAlert,
  usePrompt,
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
  ConfirmDialog,
  AlertDialog,
  PromptDialog,
} from '@oxog/modalkit/react'


// ============ PROVIDER SETUP ============

function App() {
  return (
    <ModalProvider>
      <MyApp />
    </ModalProvider>
  )
}


// ============ useModal HOOK ============

function CustomModal() {
  const {
    // State
    isOpen,
    animationState,
    stackOrder,
    isTopMost,
    
    // Actions
    open,
    close,
    toggle,
    
    // Focus
    focusFirst,
    focusLast,
    
    // Props getters
    getTriggerProps,
    getOverlayProps,
    getContainerProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
  } = useModal({
    closeOnOverlayClick: true,
    closeOnEscape: true,
    trapFocus: true,
    animated: true,
    animationDuration: 200,
    onClose: () => console.log('Closed'),
  })
  
  return (
    <>
      <button {...getTriggerProps()}>Open Modal</button>
      
      {(isOpen || animationState !== 'idle') && (
        <Portal>
          <div {...getOverlayProps()} className="modal-overlay">
            <div {...getContainerProps()} className="modal-container">
              <div {...getContentProps()} className="modal-content">
                <div className="modal-header">
                  <h2 {...getTitleProps()}>Modal Title</h2>
                  <button {...getCloseButtonProps()}>×</button>
                </div>
                
                <div className="modal-body">
                  <p {...getDescriptionProps()}>Modal description</p>
                  <p>More content here...</p>
                </div>
                
                <div className="modal-footer">
                  <button onClick={close}>Cancel</button>
                  <button className="primary" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}


// ============ useConfirm HOOK ============

function DeleteButton({ itemId }) {
  const confirm = useConfirm()
  
  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    })
    
    if (confirmed) {
      await deleteItem(itemId)
    }
  }
  
  return (
    <button onClick={handleDelete} className="danger">
      Delete
    </button>
  )
}


// ============ useAlert HOOK ============

function SaveButton({ onSave }) {
  const alert = useAlert()
  
  const handleSave = async () => {
    try {
      await onSave()
      await alert({
        title: 'Success',
        message: 'Your changes have been saved.',
        variant: 'success',
      })
    } catch (error) {
      await alert({
        title: 'Error',
        message: 'Failed to save changes.',
        variant: 'error',
      })
    }
  }
  
  return (
    <button onClick={handleSave} className="primary">
      Save
    </button>
  )
}


// ============ usePrompt HOOK ============

function RenameButton({ currentName, onRename }) {
  const prompt = usePrompt()
  
  const handleRename = async () => {
    const newName = await prompt({
      title: 'Rename',
      message: 'Enter a new name:',
      defaultValue: currentName,
      validate: (value) => {
        if (!value.trim()) return 'Name is required'
        if (value.length > 50) return 'Name too long'
        return true
      },
    })
    
    if (newName && newName !== currentName) {
      onRename(newName)
    }
  }
  
  return (
    <button onClick={handleRename}>
      Rename
    </button>
  )
}
```

---

## REACT COMPONENTS

```tsx
// ============ BASIC MODAL ============

function BasicModal() {
  const [open, setOpen] = useState(false)
  
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <button>Open Modal</button>
      </ModalTrigger>
      
      <ModalPortal>
        <ModalOverlay />
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Modal Title</ModalTitle>
              <ModalClose />
            </ModalHeader>
            
            <ModalBody>
              <ModalDescription>
                This is the modal description.
              </ModalDescription>
              <p>More content here...</p>
            </ModalBody>
            
            <ModalFooter>
              <ModalClose asChild>
                <button>Cancel</button>
              </ModalClose>
              <button className="primary" onClick={handleSave}>
                Save
              </button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </ModalPortal>
    </Modal>
  )
}


// ============ UNCONTROLLED MODAL ============

<Modal defaultOpen={false}>
  <ModalTrigger>Open</ModalTrigger>
  <ModalPortal>
    <ModalOverlay />
    <ModalContent>...</ModalContent>
  </ModalPortal>
</Modal>


// ============ CONTROLLED MODAL ============

<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>...</ModalContent>
</Modal>


// ============ WITH ANIMATION ============

<Modal animated animationDuration={200}>
  <ModalPortal>
    <ModalOverlay className="animate-fade" />
    <ModalContainer>
      <ModalContent className="animate-scale">
        ...
      </ModalContent>
    </ModalContainer>
  </ModalPortal>
</Modal>


// ============ NESTED MODALS ============

<Modal>
  <ModalTrigger>Open First</ModalTrigger>
  <ModalPortal>
    <ModalOverlay />
    <ModalContent>
      <ModalTitle>First Modal</ModalTitle>
      <ModalBody>
        <p>This is the first modal.</p>
        
        {/* Nested modal */}
        <Modal>
          <ModalTrigger>Open Second</ModalTrigger>
          <ModalPortal>
            <ModalOverlay />
            <ModalContent>
              <ModalTitle>Second Modal</ModalTitle>
              <ModalBody>
                <p>This is a nested modal.</p>
              </ModalBody>
            </ModalContent>
          </ModalPortal>
        </Modal>
      </ModalBody>
    </ModalContent>
  </ModalPortal>
</Modal>


// ============ SIZES ============

<ModalContent size="sm">...</ModalContent>   {/* max-width: 400px */}
<ModalContent size="md">...</ModalContent>   {/* max-width: 500px */}
<ModalContent size="lg">...</ModalContent>   {/* max-width: 600px */}
<ModalContent size="xl">...</ModalContent>   {/* max-width: 800px */}
<ModalContent size="full">...</ModalContent> {/* Full screen */}


// ============ POSITIONS ============

<ModalContainer position="center">...</ModalContainer>  {/* Default */}
<ModalContainer position="top">...</ModalContainer>     {/* Top of screen */}


// ============ CONFIRM DIALOG ============

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete Item"
  description="Are you sure you want to delete this item?"
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>


// ============ ALERT DIALOG ============

<AlertDialog
  open={showAlert}
  onOpenChange={setShowAlert}
  title="Success"
  description="Your changes have been saved."
  confirmText="OK"
  variant="success"
  onConfirm={() => setShowAlert(false)}
/>


// ============ PROMPT DIALOG ============

<PromptDialog
  open={showPrompt}
  onOpenChange={setShowPrompt}
  title="Rename"
  description="Enter a new name:"
  placeholder="Name"
  defaultValue={currentName}
  confirmText="Rename"
  cancelText="Cancel"
  onConfirm={(value) => {
    rename(value)
    setShowPrompt(false)
  }}
  onCancel={() => setShowPrompt(false)}
/>
```

---

## IMPERATIVE API

```tsx
import { modals } from '@oxog/modalkit/react'


// ============ PROVIDER REQUIRED ============

// Wrap app with ModalProvider
function App() {
  return (
    <ModalProvider>
      <MyApp />
      {/* Modals rendered here */}
    </ModalProvider>
  )
}


// ============ OPEN MODAL IMPERATIVELY ============

// Simple modal
const modalId = modals.open({
  title: 'Hello',
  content: <p>Modal content</p>,
})

// With all options
const modalId = modals.open({
  title: 'Edit Profile',
  content: <ProfileForm />,
  size: 'lg',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  onClose: () => console.log('Closed'),
})

// With render function (access to close)
modals.open({
  content: ({ close }) => (
    <div>
      <p>Custom content</p>
      <button onClick={close}>Close</button>
    </div>
  ),
})


// ============ CLOSE MODAL ============

// Close specific modal
modals.close(modalId)

// Close all modals
modals.closeAll()


// ============ CONFIRM ============

const confirmed = await modals.confirm({
  title: 'Confirm',
  message: 'Are you sure?',
  confirmText: 'Yes',
  cancelText: 'No',
  variant: 'danger',
})

if (confirmed) {
  // User confirmed
}


// ============ ALERT ============

await modals.alert({
  title: 'Success',
  message: 'Operation completed!',
  variant: 'success',
})


// ============ PROMPT ============

const value = await modals.prompt({
  title: 'Input Required',
  message: 'Enter your name:',
  placeholder: 'Name',
  validate: (v) => v.length >= 2 || 'Name too short',
})

if (value) {
  console.log('Entered:', value)
}


// ============ CUSTOM COMPONENT ============

// Open any component as modal
modals.open({
  content: ({ close }) => (
    <MyCustomModalContent onComplete={() => {
      // Do something
      close()
    }} />
  ),
})
```

---

## ACCESSIBILITY

```typescript
// Built-in WAI-ARIA support

/*
ROLES AND ATTRIBUTES:
- role="dialog" (default) or role="alertdialog"
- aria-modal="true"
- aria-labelledby (linked to ModalTitle)
- aria-describedby (linked to ModalDescription)
- aria-label (custom label)

TRIGGER BUTTON:
- aria-haspopup="dialog"
- aria-expanded (true when open)

CLOSE BUTTON:
- aria-label="Close"

FOCUS MANAGEMENT:
- Focus trapped within modal
- Auto-focus first focusable element (or initialFocusRef)
- Tab cycles through focusable elements
- Shift+Tab cycles backwards
- Focus returns to trigger on close (or finalFocusRef)

KEYBOARD:
- Escape: Close modal (if closeOnEscape)
- Tab: Cycle focus forward
- Shift+Tab: Cycle focus backward

SCREEN READER:
- Announces modal opening
- Reads title and description
- Indicates modal is open
- Announces when closed
*/


// ============ CUSTOM ARIA ============

<Modal>
  <ModalContent
    role="alertdialog"
    aria-label="Delete confirmation"
    aria-describedby="delete-description"
  >
    <p id="delete-description">
      This action cannot be undone.
    </p>
  </ModalContent>
</Modal>


// ============ ALERT DIALOG ROLE ============

// Use role="alertdialog" for important messages that require action
<Modal>
  <ModalContent role="alertdialog">
    <ModalTitle>Error</ModalTitle>
    <ModalDescription>
      Your session has expired. Please log in again.
    </ModalDescription>
    <button onClick={login}>Log In</button>
  </ModalContent>
</Modal>
```

---

## TECHNICAL REQUIREMENTS

| Requirement | Value |
|-------------|-------|
| Runtime | Browser |
| Module | ESM + CJS |
| TypeScript | Strict mode |
| Dependencies | ZERO |
| Test Coverage | 100% |
| Bundle Size | < 3KB core |

---

## PROJECT STRUCTURE

```
modalkit/
├── src/
│   ├── index.ts                    # Main exports
│   ├── types.ts                    # Type definitions
│   │
│   ├── core/
│   │   ├── modal.ts                # Main Modal class
│   │   ├── state.ts                # State management
│   │   ├── stack.ts                # Modal stack manager
│   │   └── config.ts               # Config defaults
│   │
│   ├── dialogs/
│   │   ├── confirm.ts              # Confirm dialog
│   │   ├── alert.ts                # Alert dialog
│   │   └── prompt.ts               # Prompt dialog
│   │
│   ├── features/
│   │   ├── focus-trap.ts           # Focus trap
│   │   ├── scroll-lock.ts          # Scroll lock
│   │   ├── portal.ts               # Portal rendering
│   │   ├── animation.ts            # Animation handling
│   │   └── keyboard.ts             # Keyboard handling
│   │
│   ├── props/
│   │   ├── overlay.ts              # Overlay props
│   │   ├── container.ts            # Container props
│   │   ├── content.ts              # Content props
│   │   ├── trigger.ts              # Trigger props
│   │   └── close.ts                # Close button props
│   │
│   ├── utils/
│   │   ├── dom.ts                  # DOM utilities
│   │   ├── focus.ts                # Focus utilities
│   │   ├── id.ts                   # ID generation
│   │   └── events.ts               # Event emitter
│   │
│   └── adapters/
│       └── react/
│           ├── index.ts
│           ├── context.ts          # ModalProvider context
│           ├── hooks/
│           │   ├── useModal.ts
│           │   ├── useModalContext.ts
│           │   ├── useConfirm.ts
│           │   ├── useAlert.ts
│           │   └── usePrompt.ts
│           ├── components/
│           │   ├── Modal.tsx
│           │   ├── ModalTrigger.tsx
│           │   ├── ModalPortal.tsx
│           │   ├── ModalOverlay.tsx
│           │   ├── ModalContainer.tsx
│           │   ├── ModalContent.tsx
│           │   ├── ModalHeader.tsx
│           │   ├── ModalTitle.tsx
│           │   ├── ModalDescription.tsx
│           │   ├── ModalBody.tsx
│           │   ├── ModalFooter.tsx
│           │   ├── ModalClose.tsx
│           │   ├── ConfirmDialog.tsx
│           │   ├── AlertDialog.tsx
│           │   └── PromptDialog.tsx
│           └── imperative/
│               └── modals.ts       # Imperative API
│
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   ├── dialogs/
│   │   ├── features/
│   │   └── props/
│   ├── integration/
│   │   ├── modal.test.ts
│   │   ├── confirm.test.ts
│   │   ├── alert.test.ts
│   │   ├── prompt.test.ts
│   │   ├── stack.test.ts
│   │   ├── focus.test.ts
│   │   ├── animation.test.ts
│   │   └── react.test.tsx
│   └── fixtures/
│
├── examples/
│   ├── basic/
│   ├── confirm/
│   ├── nested/
│   ├── animated/
│   └── react/
│
├── website/
│   └── [See WEBSITE section]
│
├── .github/
│   └── workflows/
│       └── deploy-website.yml
│
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── vitest.config.ts
```

---

## DOCUMENTATION WEBSITE

Build a modern documentation site using React + Vite.

### Technology Stack (MANDATORY)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI framework |
| **Vite** | 5+ | Build tool |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3+ | Styling (npm, NOT CDN) |
| **shadcn/ui** | Latest | UI components |
| **React Router** | 6+ | Routing |
| **Lucide React** | Latest | Icons |
| **Framer Motion** | Latest | Animations |
| **Prism.js** | Latest | Syntax highlighting |

### Fonts (MANDATORY)

- **JetBrains Mono** - ALL code
- **Inter** - Body text

### Required Pages

1. **Home** (`/`)
   - Hero with interactive modal demo
   - Feature highlights
   - Install command
   - Quick examples

2. **Getting Started** (`/docs/getting-started`)
   - Installation
   - Quick start
   - Basic concepts

3. **Basic Modal** (`/docs/basic`)
   - Creating modals
   - Open/close
   - Configuration

4. **Dialogs** (`/docs/dialogs`)
   - Confirm dialog
   - Alert dialog
   - Prompt dialog

5. **Stacking** (`/docs/stacking`)
   - Nested modals
   - Stack management
   - Z-index

6. **Focus Management** (`/docs/focus`)
   - Focus trap
   - Initial focus
   - Return focus

7. **Animation** (`/docs/animation`)
   - Animation states
   - CSS examples
   - Callbacks

8. **Accessibility** (`/docs/accessibility`)
   - ARIA attributes
   - Keyboard navigation
   - Screen readers

9. **API Reference** (`/docs/api/*`)
   - createModal
   - Modal instance
   - Stack API
   - Types

10. **React Guide** (`/docs/react/*`)
    - Hooks
    - Components
    - Imperative API

11. **Examples** (`/examples`)
    - Basic modal
    - Confirm dialog
    - Nested modals
    - Animated modal

### Design Theme

- Purple/violet accent (#8b5cf6) - Modal theme
- Dark mode default
- Light mode support

### GitHub Actions

```yaml
# .github/workflows/deploy-website.yml
name: Deploy Website

on:
  push:
    branches: [main]
    paths:
      - 'website/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/package-lock.json
      - run: cd website && npm ci
      - run: cd website && npm run build
      - run: echo "modalkit.oxog.dev" > website/dist/CNAME
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## README.md

````markdown
# ModalKit

<div align="center">
  <img src="website/public/logo.svg" alt="ModalKit" width="120" />
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

- 🪟 **Modal/Dialog** - Flexible modal component
- ✅ **Confirm** - Promise-based confirm dialog
- ⚠️ **Alert** - Alert notifications
- ✏️ **Prompt** - Input prompt with validation
- 📚 **Stacking** - Nested/stacked modals
- 🎯 **Focus Trap** - Automatic focus management
- 🔒 **Scroll Lock** - Body scroll prevention
- ⌨️ **Keyboard** - Escape to close, tab navigation
- 🎬 **Animation** - CSS animation support
- 🌀 **Portal** - Render to document body
- 📢 **Imperative** - Programmatic API
- ♿ **Accessible** - WAI-ARIA compliant
- 🎨 **Headless** - Full styling control
- ⚛️ **React** - Hooks & components
- 📦 **Zero Dependencies**
- ⚡ **< 3KB** - Tiny bundle

## Installation

```bash
npm install @oxog/modalkit
```

## Quick Start

```typescript
import { createModal, confirm, alert } from '@oxog/modalkit'

// Basic modal
const modal = createModal({
  closeOnEscape: true,
  trapFocus: true,
})

modal.open()

// Confirm dialog
const confirmed = await confirm('Are you sure?')

// Alert dialog
await alert('Success!')
```

## React

```tsx
import { Modal, ModalContent, useConfirm } from '@oxog/modalkit/react'

// Component
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <ModalContent>Hello World</ModalContent>
</Modal>

// Hook
const confirm = useConfirm()
const result = await confirm({ title: 'Confirm', message: 'Sure?' })
```

## Documentation

Visit [modalkit.oxog.dev](https://modalkit.oxog.dev) for full documentation.

## License

MIT © [Ersin KOÇ](https://github.com/ersinkoc)
````

---

## IMPLEMENTATION CHECKLIST

### Before Implementation
- [ ] Create SPECIFICATION.md
- [ ] Create IMPLEMENTATION.md
- [ ] Create TASKS.md

### Core
- [ ] Modal class
- [ ] State management
- [ ] Modal stack manager
- [ ] Config handling

### Dialogs
- [ ] Confirm dialog
- [ ] Alert dialog
- [ ] Prompt dialog

### Features
- [ ] Focus trap
- [ ] Scroll lock
- [ ] Portal rendering
- [ ] Animation handling
- [ ] Keyboard handling

### Props Getters
- [ ] Overlay props
- [ ] Container props
- [ ] Content props
- [ ] Trigger props
- [ ] Close button props

### React Adapter
- [ ] ModalProvider
- [ ] useModal hook
- [ ] useConfirm hook
- [ ] useAlert hook
- [ ] usePrompt hook
- [ ] Modal components
- [ ] Dialog components
- [ ] Imperative API

### Testing
- [ ] 100% coverage
- [ ] All tests passing

### Website
- [ ] React + Vite setup
- [ ] All pages
- [ ] Interactive examples
- [ ] GitHub Actions

---

## BEGIN IMPLEMENTATION

Start by creating SPECIFICATION.md with the complete package specification. Then proceed with IMPLEMENTATION.md and TASKS.md before writing any actual code.

Remember: This package will be published to NPM. It must be production-ready, zero-dependency, fully tested, and professionally documented.

**Date: 2025-12-31**
**Author: Ersin KOÇ**
**Repository: github.com/ersinkoc/modalkit**
**Website: modalkit.oxog.dev**
