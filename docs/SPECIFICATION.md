# ModalKit - Complete Package Specification

## Overview

**Package Name:** `@oxog/modalkit`
**Version:** 1.0.0
**License:** MIT
**Author:** Ersin KOÇ
**Repository:** https://github.com/ersinkoc/modalkit
**Documentation:** https://modalkit.oxog.dev

**Description:**
Zero-dependency headless modal/dialog library with stacking, focus trap, and animations. Framework-agnostic core with React adapter included.

---

## Package Identity

| Property | Value |
|----------|-------|
| NPM Package | `@oxog/modalkit` |
| GitHub Repository | `https://github.com/ersinkoc/modalkit` |
| Documentation Site | `https://modalkit.oxog.dev` |
| Bundle Size (Core) | < 3KB minified + gzipped |
| Bundle Size (React) | < 5KB minified + gzipped |
| Dependencies | ZERO |
| Test Coverage | 100% |

---

## Feature Set

### Core Features

1. **Basic Modal/Dialog**
   - Configurable open/close behavior
   - Controlled and uncontrolled modes
   - Portal rendering to document body
   - Custom portal target support

2. **Confirm Dialog**
   - Promise-based API
   - Custom button configuration
   - Variant support (default, danger, warning)

3. **Alert Dialog**
   - Promise-based API
   - Variant support (default, success, warning, error, info)

4. **Prompt Dialog**
   - Promise-based API
   - Input validation
   - Multiple input types (text, password, email, number, tel, url)

5. **Modal Stacking**
   - Nested/stacked modals
   - Automatic z-index management
   - Stack order tracking
   - Close top-most functionality

6. **Focus Management**
   - Automatic focus trapping
   - Custom initial focus
   - Focus restoration on close
   - Tab navigation cycling

7. **Scroll Lock**
   - Body scroll prevention
   - Scrollbar width compensation
   - Reference counting for multiple modals

8. **Animation Support**
   - Enter/exit animation states
   - CSS animation integration
   - Animation callbacks
   - Configurable duration

9. **Keyboard Navigation**
   - Escape to close
   - Tab/Shift+Tab cycling
   - Full keyboard accessibility

10. **Accessibility (WAI-ARIA)**
    - role="dialog" / role="alertdialog"
    - aria-modal="true"
    - aria-labelledby / aria-describedby
    - Screen reader announcements

---

## API Specification

### Factory Function

```typescript
function createModal(config?: ModalConfig): Modal
```

### Modal Configuration

```typescript
interface ModalConfig {
  // Initial state
  open?: boolean
  defaultOpen?: boolean

  // Close behavior
  closeOnOverlayClick?: boolean  // default: true
  closeOnEscape?: boolean        // default: true

  // Scroll behavior
  preventScroll?: boolean        // default: true
  scrollBehavior?: 'inside' | 'outside'  // default: 'inside'

  // Focus behavior
  trapFocus?: boolean            // default: true
  autoFocus?: boolean            // default: true
  restoreFocus?: boolean         // default: true
  initialFocusRef?: HTMLElement | (() => HTMLElement | null) | null
  finalFocusRef?: HTMLElement | (() => HTMLElement | null) | null

  // Stacking
  stackable?: boolean            // default: true
  closeOnStackedOpen?: boolean   // default: false

  // Animation
  animated?: boolean             // default: false
  animationDuration?: number     // default: 200

  // Portal
  portalTarget?: HTMLElement | string | null
  disablePortal?: boolean        // default: false

  // Callbacks
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: (open: boolean) => void
  onAnimationStart?: (type: 'enter' | 'exit') => void
  onAnimationEnd?: (type: 'enter' | 'exit') => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onOverlayClick?: (event: MouseEvent) => void

  // Accessibility
  id?: string
  role?: 'dialog' | 'alertdialog'  // default: 'dialog'
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}
```

### Modal Instance

```typescript
interface Modal {
  // State queries
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
```

### Modal State

```typescript
interface ModalState {
  open: boolean
  animationState: AnimationState
  stackOrder: number
  isTopMost: boolean
  mounted: boolean
}

type AnimationState =
  | 'idle'      // Closed, no animation
  | 'entering'  // Opening animation
  | 'entered'   // Open, animation complete
  | 'exiting'   // Closing animation
  | 'exited'    // Closed, ready for unmount
```

### Modal Stack

```typescript
interface ModalStack {
  count(): number
  isEmpty(): boolean
  getAll(): Modal[]
  getTopMost(): Modal | null
  getByOrder(order: number): Modal | null
  closeAll(): void
  closeTopMost(): void
  on(event: 'push', handler: (modal: Modal) => void): () => void
  on(event: 'pop', handler: (modal: Modal) => void): () => void
  on(event: 'change', handler: (modals: Modal[]) => void): () => void
  off(event: StackEvent, handler: Function): void
}
```

### Confirm Dialog

```typescript
function confirm(message: string): Promise<boolean>
function confirm(options: ConfirmOptions): Promise<boolean>
function confirm(options: ConfirmOptionsAdvanced): Promise<string | boolean>

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string      // default: 'Confirm'
  cancelText?: string       // default: 'Cancel'
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
```

### Alert Dialog

```typescript
function alert(message: string): Promise<void>
function alert(options: AlertOptions): Promise<void>

interface AlertOptions {
  title?: string
  message: string
  confirmText?: string      // default: 'OK'
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}
```

### Prompt Dialog

```typescript
function prompt(message: string): Promise<string | null>
function prompt(options: PromptOptions): Promise<string | null>

interface PromptOptions {
  title?: string
  message?: string
  placeholder?: string
  defaultValue?: string
  confirmText?: string      // default: 'OK'
  cancelText?: string       // default: 'Cancel'
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  validate?: (value: string) => boolean | string
  required?: boolean
  minLength?: number
  maxLength?: number
}
```

### Focus Trap

```typescript
function createFocusTrap(config: FocusTrapConfig): FocusTrap

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
```

### Scroll Lock

```typescript
interface ScrollLock {
  lock(): void
  unlock(): void
  isLocked(): boolean
}

const scrollLock: ScrollLock
```

---

## Props Getters Specification

### PortalProps
```typescript
interface PortalProps {
  'data-modalkit-portal': ''
  'data-state': AnimationState
}
```

### OverlayProps
```typescript
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
```

### ContainerProps
```typescript
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
```

### ContentProps
```typescript
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
```

### TitleProps
```typescript
interface TitleProps {
  id: string
  'data-modalkit-title': ''
}
```

### DescriptionProps
```typescript
interface DescriptionProps {
  id: string
  'data-modalkit-description': ''
}
```

### CloseButtonProps
```typescript
interface CloseButtonProps {
  type: 'button'
  'aria-label': string
  'data-modalkit-close': ''
  onClick: (e: MouseEvent) => void
}
```

### TriggerProps
```typescript
interface TriggerProps {
  type: 'button'
  'aria-haspopup': 'dialog'
  'aria-expanded': boolean
  'data-modalkit-trigger': ''
  onClick: (e: MouseEvent) => void
}
```

---

## React Adapter Specification

### Provider

```tsx
<ModalProvider>
  {children}
</ModalProvider>
```

### Hooks

```typescript
// Main modal hook
function useModal(config?: ModalConfig): UseModalReturn

interface UseModalReturn {
  isOpen: boolean
  animationState: AnimationState
  stackOrder: number
  isTopMost: boolean
  open: () => void
  close: () => void
  toggle: () => void
  focusFirst: () => void
  focusLast: () => void
  getTriggerProps: () => TriggerProps
  getOverlayProps: () => OverlayProps
  getContainerProps: () => ContainerProps
  getContentProps: () => ContentProps
  getTitleProps: (id?: string) => TitleProps
  getDescriptionProps: (id?: string) => DescriptionProps
  getCloseButtonProps: () => CloseButtonProps
}

// Dialog hooks
function useConfirm(): (options: ConfirmOptions | string) => Promise<boolean>
function useAlert(): (options: AlertOptions | string) => Promise<void>
function usePrompt(): (options: PromptOptions | string) => Promise<string | null>

// Context hook
function useModalContext(): ModalContextValue
```

### Components

```tsx
// Main components
<Modal open={boolean} onOpenChange={(open) => void} {...config}>
<ModalTrigger asChild={boolean}>
<ModalPortal container={HTMLElement}>
<ModalOverlay className={string} style={object}>
<ModalContainer position={'center' | 'top'}>
<ModalContent size={'sm' | 'md' | 'lg' | 'xl' | 'full'} role={'dialog' | 'alertdialog'}>
<ModalHeader>
<ModalTitle>
<ModalDescription>
<ModalBody>
<ModalFooter>
<ModalClose asChild={boolean}>

// Pre-built dialogs
<ConfirmDialog
  open={boolean}
  onOpenChange={(open) => void}
  title={string}
  description={string}
  confirmText={string}
  cancelText={string}
  variant={'default' | 'danger' | 'warning'}
  onConfirm={() => void}
  onCancel={() => void}
/>

<AlertDialog
  open={boolean}
  onOpenChange={(open) => void}
  title={string}
  description={string}
  confirmText={string}
  variant={'default' | 'success' | 'warning' | 'error' | 'info'}
  onConfirm={() => void}
/>

<PromptDialog
  open={boolean}
  onOpenChange={(open) => void}
  title={string}
  description={string}
  placeholder={string}
  defaultValue={string}
  confirmText={string}
  cancelText={string}
  onConfirm={(value) => void}
  onCancel={() => void}
/>
```

### Imperative API

```typescript
import { modals } from '@oxog/modalkit/react'

// Open modal
const id = modals.open({ title, content, ...options })

// Close modal
modals.close(id)
modals.closeAll()

// Dialogs
const confirmed = await modals.confirm({ title, message, ...options })
await modals.alert({ title, message, ...options })
const value = await modals.prompt({ title, message, ...options })
```

---

## Export Structure

### Main Entry (`@oxog/modalkit`)
```typescript
export { createModal } from './core/modal'
export { modalStack } from './core/stack'
export { createFocusTrap } from './features/focus-trap'
export { scrollLock } from './features/scroll-lock'
export { confirm } from './dialogs/confirm'
export { alert } from './dialogs/alert'
export { prompt } from './dialogs/prompt'
export * from './types'
```

### React Entry (`@oxog/modalkit/react`)
```typescript
// Provider
export { ModalProvider } from './context'

// Hooks
export { useModal } from './hooks/useModal'
export { useModalContext } from './hooks/useModalContext'
export { useConfirm } from './hooks/useConfirm'
export { useAlert } from './hooks/useAlert'
export { usePrompt } from './hooks/usePrompt'

// Components
export { Modal } from './components/Modal'
export { ModalTrigger } from './components/ModalTrigger'
export { ModalPortal } from './components/ModalPortal'
export { ModalOverlay } from './components/ModalOverlay'
export { ModalContainer } from './components/ModalContainer'
export { ModalContent } from './components/ModalContent'
export { ModalHeader } from './components/ModalHeader'
export { ModalTitle } from './components/ModalTitle'
export { ModalDescription } from './components/ModalDescription'
export { ModalBody } from './components/ModalBody'
export { ModalFooter } from './components/ModalFooter'
export { ModalClose } from './components/ModalClose'
export { ConfirmDialog } from './components/ConfirmDialog'
export { AlertDialog } from './components/AlertDialog'
export { PromptDialog } from './components/PromptDialog'

// Imperative
export { modals } from './imperative/modals'
```

---

## Technical Requirements

| Requirement | Specification |
|-------------|---------------|
| TypeScript | Strict mode enabled |
| Module Format | ESM + CJS dual publish |
| Browser Support | ES2020+ |
| Node.js | 18+ |
| Build Tool | tsup |
| Test Framework | Vitest |
| Test Coverage | 100% lines, branches, functions |
| Bundle Analysis | Included in build |

---

## Accessibility Requirements

### ARIA Attributes
- `role="dialog"` for standard modals
- `role="alertdialog"` for important alerts
- `aria-modal="true"` always present
- `aria-labelledby` linked to title
- `aria-describedby` linked to description
- `aria-label` for custom labels

### Keyboard Navigation
- `Escape` closes modal (configurable)
- `Tab` moves focus forward
- `Shift+Tab` moves focus backward
- Focus trapped within modal
- Focus cycles at boundaries

### Screen Reader Support
- Modal opening announced
- Title and description read
- Close action announced
- Focus indicators visible

---

## Z-Index Management

| Element | Z-Index Formula |
|---------|-----------------|
| Base | 1000 |
| Overlay | base + (stackOrder * 10) |
| Container | base + (stackOrder * 10) + 1 |
| Content | base + (stackOrder * 10) + 2 |

Example for 3 stacked modals:
- Modal 1: overlay=1000, container=1001, content=1002
- Modal 2: overlay=1010, container=1011, content=1012
- Modal 3: overlay=1020, container=1021, content=1022

---

## Animation States

```
idle -> entering -> entered
                      |
                      v
                   exiting -> exited -> idle
```

| State | Description |
|-------|-------------|
| `idle` | Modal closed, not mounted |
| `entering` | Opening animation in progress |
| `entered` | Open, animation complete |
| `exiting` | Closing animation in progress |
| `exited` | Closed, ready for unmount |

---

## Bundle Size Budget

| Component | Budget |
|-----------|--------|
| Core (createModal, stack, types) | < 2KB |
| Focus Trap | < 0.5KB |
| Scroll Lock | < 0.3KB |
| Dialogs (confirm, alert, prompt) | < 0.5KB |
| **Total Core** | **< 3KB** |
| React Adapter | < 2KB |
| **Total with React** | **< 5KB** |

All sizes are minified + gzipped.

---

## File Structure

```
src/
├── index.ts              # Main exports
├── types.ts              # All type definitions
│
├── core/
│   ├── modal.ts          # Modal class/factory
│   ├── state.ts          # State management
│   ├── stack.ts          # Modal stack
│   └── config.ts         # Default config
│
├── dialogs/
│   ├── confirm.ts        # Confirm dialog
│   ├── alert.ts          # Alert dialog
│   └── prompt.ts         # Prompt dialog
│
├── features/
│   ├── focus-trap.ts     # Focus trap
│   ├── scroll-lock.ts    # Scroll lock
│   ├── portal.ts         # Portal utils
│   ├── animation.ts      # Animation handling
│   └── keyboard.ts       # Keyboard handling
│
├── props/
│   ├── overlay.ts        # Overlay props
│   ├── container.ts      # Container props
│   ├── content.ts        # Content props
│   ├── trigger.ts        # Trigger props
│   └── close.ts          # Close button props
│
├── utils/
│   ├── dom.ts            # DOM utilities
│   ├── focus.ts          # Focus utilities
│   ├── id.ts             # ID generation
│   └── events.ts         # Event emitter
│
└── adapters/
    └── react/
        ├── index.ts
        ├── context.tsx
        ├── hooks/
        ├── components/
        └── imperative/
```

---

## Testing Strategy

### Unit Tests
- Each module tested in isolation
- Mock DOM APIs where needed
- Test all edge cases

### Integration Tests
- Full modal lifecycle
- Stack interactions
- Focus trap behavior
- Animation sequences
- React component integration

### Coverage Requirements
- Lines: 100%
- Branches: 100%
- Functions: 100%
- Statements: 100%

---

## Documentation Site

**URL:** https://modalkit.oxog.dev

### Pages
1. Home - Hero + demo
2. Getting Started - Installation + quick start
3. Basic Modal - Core usage
4. Dialogs - Confirm, Alert, Prompt
5. Stacking - Nested modals
6. Focus Management - Focus trap
7. Animation - Animation states + CSS
8. Accessibility - ARIA + keyboard
9. API Reference - Full API docs
10. React Guide - React integration
11. Examples - Interactive demos

### Tech Stack
- React 18+
- Vite 5+
- TypeScript 5+
- Tailwind CSS 3+ (npm, NOT CDN)
- shadcn/ui
- React Router 6+
- Lucide React
- Framer Motion
- Prism.js

### Fonts
- JetBrains Mono (code)
- Inter (body)

### Theme
- Purple/violet accent (#8b5cf6)
- Dark mode default
- Light mode support
