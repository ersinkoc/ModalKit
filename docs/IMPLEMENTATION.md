# ModalKit - Implementation Guide

## Architecture Overview

ModalKit follows a headless UI pattern with a core library that manages state and behavior, providing props getters for rendering. The React adapter wraps this core with React-specific APIs.

```
┌─────────────────────────────────────────────────────────────┐
│                     User Application                        │
├─────────────────────────────────────────────────────────────┤
│  React Adapter (optional)                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   Hooks     │ │ Components  │ │  Imperative API     │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Core Library                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │  Modal   │ │  Stack   │ │ Dialogs  │ │ Props Getters│   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │Focus Trap│ │Scroll Lock│ │Animation │ │  Keyboard    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Utilities                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │   DOM    │ │  Focus   │ │    ID    │ │   Events     │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### 1. Headless UI Pattern

**Decision:** Use props getters pattern instead of rendering components directly.

**Rationale:**
- Full styling control for consumers
- Framework-agnostic core
- Smaller bundle size
- Better testability

**Implementation:**
```typescript
// Props getters return attributes and handlers
const modal = createModal(config)
const contentProps = modal.getContentProps()
// { role: 'dialog', 'aria-modal': true, onKeyDown: handler, ... }
```

### 2. Factory Function over Class

**Decision:** Export `createModal()` factory instead of `Modal` class.

**Rationale:**
- Cleaner API (no `new` keyword)
- Better tree-shaking
- Encapsulated state
- Easier mocking in tests

**Implementation:**
```typescript
export function createModal(config?: ModalConfig): Modal {
  // Internal state
  let state: ModalState = { ... }

  // Return public interface
  return {
    isOpen: () => state.open,
    open: () => { ... },
    close: () => { ... },
    // ...
  }
}
```

### 3. Subscription-based State

**Decision:** Use pub/sub pattern for state updates.

**Rationale:**
- Works with any framework
- Reactive updates without framework-specific reactivity
- Clean integration with React's useEffect/useSyncExternalStore

**Implementation:**
```typescript
const subscribers = new Set<(state: ModalState) => void>()

function subscribe(callback: (state: ModalState) => void): () => void {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

function notifySubscribers() {
  subscribers.forEach(cb => cb(getState()))
}
```

### 4. Singleton Modal Stack

**Decision:** Use a global modal stack singleton.

**Rationale:**
- Consistent z-index management across modals
- Escape key always closes top-most modal
- Simple stack operations (closeAll, closeTopMost)

**Implementation:**
```typescript
// Single global instance
export const modalStack: ModalStack = createModalStack()

// Modals register/unregister on open/close
function open() {
  modalStack.push(this)
}

function close() {
  modalStack.remove(this)
}
```

### 5. Animation State Machine

**Decision:** Use explicit state machine for animations.

**Rationale:**
- Predictable animation behavior
- Easy to sync with CSS animations
- Clear lifecycle hooks

**States:**
```
idle ──open()──> entering ──(duration)──> entered
                                             │
                                          close()
                                             │
                                             v
idle <──(duration)── exiting <───────────────┘
```

### 6. Reference Counting for Scroll Lock

**Decision:** Use ref counting for scroll lock.

**Rationale:**
- Multiple modals can be open
- Scroll only unlocked when all modals close
- Prevents scroll during nested modal transitions

**Implementation:**
```typescript
let lockCount = 0

function lock() {
  if (lockCount === 0) {
    // Actually lock scroll
  }
  lockCount++
}

function unlock() {
  lockCount--
  if (lockCount === 0) {
    // Actually unlock scroll
  }
}
```

---

## Module Breakdown

### Core Modules

#### `core/modal.ts`
Main modal factory function. Creates modal instances with:
- State management
- Props getters
- Lifecycle methods
- Stack integration

#### `core/state.ts`
State management utilities:
- State type definitions
- State update functions
- Subscriber management

#### `core/stack.ts`
Modal stack management:
- Push/pop operations
- Order tracking
- Event emission

#### `core/config.ts`
Default configuration:
- Default values
- Config merging
- Validation

### Feature Modules

#### `features/focus-trap.ts`
Focus trap implementation:
- Focusable element detection
- Tab key handling
- Focus cycling

Key functions:
- `createFocusTrap(config)` - Factory
- `getFocusableElements(container)` - Query focusables
- `focusFirst(container)` - Focus first element
- `focusLast(container)` - Focus last element

#### `features/scroll-lock.ts`
Scroll lock implementation:
- Body overflow management
- Scrollbar width compensation
- iOS Safari handling

Key functions:
- `lock()` - Lock scroll
- `unlock()` - Unlock scroll
- `getScrollbarWidth()` - Calculate scrollbar width

#### `features/animation.ts`
Animation state management:
- State transitions
- Timer management
- Callback invocation

Key functions:
- `createAnimationController(config)` - Factory
- `startEnter()` - Begin enter animation
- `startExit()` - Begin exit animation

#### `features/keyboard.ts`
Keyboard event handling:
- Escape key detection
- Event propagation control

Key functions:
- `handleKeyDown(event, config)` - Main handler
- `isEscapeKey(event)` - Utility

### Props Modules

Each props module exports a function that returns props for that element:

#### `props/overlay.ts`
```typescript
export function getOverlayProps(modal: ModalInternal): OverlayProps
```

#### `props/container.ts`
```typescript
export function getContainerProps(modal: ModalInternal): ContainerProps
```

#### `props/content.ts`
```typescript
export function getContentProps(modal: ModalInternal): ContentProps
```

#### `props/trigger.ts`
```typescript
export function getTriggerProps(modal: ModalInternal): TriggerProps
```

#### `props/close.ts`
```typescript
export function getCloseButtonProps(modal: ModalInternal): CloseButtonProps
```

### Dialog Modules

#### `dialogs/confirm.ts`
Promise-based confirm dialog:
- Creates temporary modal
- Resolves on button click
- Cleans up after resolution

#### `dialogs/alert.ts`
Promise-based alert dialog:
- Single button confirmation
- Variant support

#### `dialogs/prompt.ts`
Promise-based prompt dialog:
- Input handling
- Validation
- Submit on Enter

### Utility Modules

#### `utils/dom.ts`
DOM utilities:
- Element queries
- Attribute helpers
- Portal creation

#### `utils/focus.ts`
Focus utilities:
- Focusable selectors
- Active element tracking
- Focus restoration

#### `utils/id.ts`
ID generation:
- Unique ID generation
- Prefix support

#### `utils/events.ts`
Event emitter:
- Subscribe/unsubscribe
- Emit events
- Type-safe events

---

## React Adapter

### Context Architecture

```typescript
// context.tsx
interface ModalContextValue {
  // Registry of open modals for imperative API
  modals: Map<string, ModalInstance>

  // Methods
  registerModal: (id: string, modal: ModalInstance) => void
  unregisterModal: (id: string) => void

  // Imperative handlers
  openModal: (config: ModalOpenConfig) => string
  closeModal: (id: string) => void
  closeAll: () => void
}
```

### Hooks Implementation

#### `useModal`
```typescript
function useModal(config?: ModalConfig): UseModalReturn {
  // Create modal instance once
  const modalRef = useRef<Modal | null>(null)
  if (!modalRef.current) {
    modalRef.current = createModal(config)
  }

  // Subscribe to state changes
  const [state, setState] = useState(modalRef.current.getState())

  useEffect(() => {
    return modalRef.current!.subscribe(setState)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => modalRef.current?.destroy()
  }, [])

  return {
    isOpen: state.open,
    animationState: state.animationState,
    // ... other state
    open: modalRef.current.open,
    close: modalRef.current.close,
    // ... other methods
  }
}
```

#### `useConfirm`, `useAlert`, `usePrompt`
```typescript
function useConfirm() {
  const context = useModalContext()

  return useCallback(async (options: ConfirmOptions | string) => {
    return new Promise<boolean>((resolve) => {
      const id = context.openModal({
        content: (
          <ConfirmDialogContent
            options={typeof options === 'string' ? { message: options } : options}
            onConfirm={() => {
              context.closeModal(id)
              resolve(true)
            }}
            onCancel={() => {
              context.closeModal(id)
              resolve(false)
            }}
          />
        ),
      })
    })
  }, [context])
}
```

### Component Implementation

Components use compound component pattern with context:

```typescript
// Modal.tsx
interface ModalContextValue {
  modal: Modal
  state: ModalState
}

const ModalContext = createContext<ModalContextValue | null>(null)

function Modal({ open, onOpenChange, children, ...config }: ModalProps) {
  const modal = useMemo(() => createModal({
    ...config,
    open,
    onOpenChange,
  }), [])

  // Sync controlled state
  useEffect(() => {
    if (open !== undefined) {
      if (open) modal.open()
      else modal.close()
    }
  }, [open])

  const [state, setState] = useState(modal.getState())
  useEffect(() => modal.subscribe(setState), [])

  return (
    <ModalContext.Provider value={{ modal, state }}>
      {children}
    </ModalContext.Provider>
  )
}
```

---

## Build Configuration

### tsup Configuration

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig([
  // Core build
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    minify: true,
    treeshake: true,
  },
  // React build
  {
    entry: ['src/adapters/react/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist/react',
    external: ['react', 'react-dom'],
    minify: true,
    treeshake: true,
  },
])
```

### Package.json Exports

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react/index.mjs",
      "require": "./dist/react/index.js",
      "types": "./dist/react/index.d.ts"
    }
  }
}
```

---

## Testing Strategy

### Unit Tests

Each module has corresponding test file:

```
tests/unit/
├── core/
│   ├── modal.test.ts
│   ├── state.test.ts
│   ├── stack.test.ts
│   └── config.test.ts
├── features/
│   ├── focus-trap.test.ts
│   ├── scroll-lock.test.ts
│   ├── animation.test.ts
│   └── keyboard.test.ts
├── props/
│   ├── overlay.test.ts
│   ├── container.test.ts
│   ├── content.test.ts
│   ├── trigger.test.ts
│   └── close.test.ts
├── dialogs/
│   ├── confirm.test.ts
│   ├── alert.test.ts
│   └── prompt.test.ts
└── utils/
    ├── dom.test.ts
    ├── focus.test.ts
    ├── id.test.ts
    └── events.test.ts
```

### Integration Tests

```
tests/integration/
├── modal.test.ts         # Full modal lifecycle
├── stack.test.ts         # Stacking behavior
├── focus.test.ts         # Focus trap integration
├── animation.test.ts     # Animation sequences
├── confirm.test.ts       # Confirm dialog flow
├── alert.test.ts         # Alert dialog flow
├── prompt.test.ts        # Prompt dialog flow
└── react.test.tsx        # React adapter
```

### Test Utilities

```typescript
// tests/fixtures/setup.ts
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 0)
global.cancelAnimationFrame = clearTimeout

// DOM helpers
export function createContainer() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

export function cleanup(container: HTMLElement) {
  container.remove()
}
```

---

## Performance Considerations

### Bundle Size

1. **Tree Shaking**
   - All exports are side-effect free
   - No barrel file re-exports in production code

2. **Code Splitting**
   - React adapter in separate entry
   - Dialogs can be lazy loaded

3. **Minimal Runtime**
   - No runtime type checking
   - Inline small utilities

### Runtime Performance

1. **Event Delegation**
   - Single keydown listener per modal
   - Efficient focus queries

2. **Memoization**
   - Props getters memoize results
   - React components use memo

3. **Lazy Initialization**
   - Focus trap created on open
   - Scroll lock applied only when needed

---

## Browser Compatibility

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Polyfills Not Needed
- ResizeObserver (not used)
- IntersectionObserver (not used)
- fetch (not used)

### Known Quirks

1. **iOS Safari Scroll Lock**
   - Use `-webkit-overflow-scrolling: touch` fix
   - Handle body position fixed approach

2. **Focus Visible**
   - Rely on browser support
   - Don't polyfill :focus-visible

---

## Error Handling

### Validation Errors
```typescript
// Thrown synchronously
throw new Error('ModalKit: container is required for focus trap')
```

### Runtime Errors
```typescript
// Logged but don't throw
console.warn('ModalKit: Could not restore focus, element not found')
```

### TypeScript Errors
- All public APIs fully typed
- No `any` types
- Strict mode enabled
