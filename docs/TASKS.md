# ModalKit - Task List

## Phase 1: Project Setup

### Task 1.1: Initialize Project Structure
- [ ] Create package.json with proper configuration
- [ ] Create tsconfig.json with strict mode
- [ ] Create tsup.config.ts for build
- [ ] Create vitest.config.ts for testing
- [ ] Create .gitignore
- [ ] Create .npmignore
- [ ] Create LICENSE (MIT)

**Dependencies:** None
**Estimated Files:** 6

### Task 1.2: Create Source Directory Structure
- [ ] Create src/ directory
- [ ] Create src/core/ directory
- [ ] Create src/dialogs/ directory
- [ ] Create src/features/ directory
- [ ] Create src/props/ directory
- [ ] Create src/utils/ directory
- [ ] Create src/adapters/react/ directory structure

**Dependencies:** Task 1.1
**Estimated Files:** Directory creation only

---

## Phase 2: Core Types

### Task 2.1: Define All Types
- [ ] Create src/types.ts with all type definitions
  - ModalConfig interface
  - ModalState interface
  - AnimationType, AnimationState types
  - Modal interface
  - ModalStack interface
  - Props interfaces (Portal, Overlay, Container, Content, Title, Description, CloseButton, Trigger)
  - Dialog options interfaces (Confirm, Alert, Prompt)
  - FocusTrap interfaces
  - ScrollLock interface

**Dependencies:** Task 1.2
**Estimated Files:** 1

---

## Phase 3: Utilities

### Task 3.1: DOM Utilities
- [ ] Create src/utils/dom.ts
  - getElement() - Get element by selector or element
  - createPortalContainer() - Create portal container element
  - removeElement() - Safely remove element

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 3.2: Focus Utilities
- [ ] Create src/utils/focus.ts
  - FOCUSABLE_SELECTOR constant
  - getFocusableElements() - Get all focusable elements in container
  - getFirstFocusable() - Get first focusable element
  - getLastFocusable() - Get last focusable element
  - isFocusable() - Check if element is focusable
  - saveFocus() - Save current active element
  - restoreFocus() - Restore saved focus

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 3.3: ID Utilities
- [ ] Create src/utils/id.ts
  - generateId() - Generate unique ID with optional prefix
  - createIdGenerator() - Create namespaced ID generator

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 3.4: Event Emitter
- [ ] Create src/utils/events.ts
  - createEventEmitter() - Create typed event emitter
    - on() - Subscribe to event
    - off() - Unsubscribe from event
    - emit() - Emit event
    - clear() - Clear all listeners

**Dependencies:** Task 2.1
**Estimated Files:** 1

---

## Phase 4: Features

### Task 4.1: Focus Trap
- [ ] Create src/features/focus-trap.ts
  - createFocusTrap() factory function
  - Handle Tab key cycling
  - Handle Shift+Tab
  - Initial focus
  - Focus restoration
  - Pause/unpause functionality

**Dependencies:** Task 3.2
**Estimated Files:** 1

### Task 4.2: Scroll Lock
- [ ] Create src/features/scroll-lock.ts
  - scrollLock singleton
  - lock() with reference counting
  - unlock() with reference counting
  - isLocked() check
  - getScrollbarWidth() utility
  - Handle iOS Safari quirks

**Dependencies:** Task 3.1
**Estimated Files:** 1

### Task 4.3: Portal
- [ ] Create src/features/portal.ts
  - getPortalContainer() - Get or create portal container
  - createPortal() - Create portal element
  - removePortal() - Remove portal element

**Dependencies:** Task 3.1
**Estimated Files:** 1

### Task 4.4: Animation Controller
- [ ] Create src/features/animation.ts
  - createAnimationController() factory
  - State machine implementation
  - Timer management
  - Callback invocation

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 4.5: Keyboard Handler
- [ ] Create src/features/keyboard.ts
  - handleKeyDown() - Main keyboard event handler
  - isEscapeKey() - Check for Escape key
  - shouldCloseOnEscape() - Check config

**Dependencies:** Task 2.1
**Estimated Files:** 1

---

## Phase 5: Core Modal

### Task 5.1: Default Configuration
- [ ] Create src/core/config.ts
  - DEFAULT_CONFIG constant
  - mergeConfig() function
  - validateConfig() function (optional validation)

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 5.2: State Management
- [ ] Create src/core/state.ts
  - createState() - Create initial state
  - createStateManager() - State manager with subscribers
    - getState()
    - setState()
    - subscribe()
    - notify()

**Dependencies:** Task 2.1
**Estimated Files:** 1

### Task 5.3: Modal Stack
- [ ] Create src/core/stack.ts
  - createModalStack() factory
  - modalStack singleton export
  - Stack operations (push, pop, remove)
  - Event emission
  - Z-index calculation

**Dependencies:** Task 3.4, Task 5.2
**Estimated Files:** 1

### Task 5.4: Main Modal Factory
- [ ] Create src/core/modal.ts
  - createModal() factory function
  - Internal state management
  - Props getters delegation
  - Feature integration (focus trap, scroll lock, animation)
  - Stack registration
  - Cleanup on destroy

**Dependencies:** Task 4.1, Task 4.2, Task 4.4, Task 4.5, Task 5.1, Task 5.2, Task 5.3
**Estimated Files:** 1

---

## Phase 6: Props Getters

### Task 6.1: Overlay Props
- [ ] Create src/props/overlay.ts
  - getOverlayProps() function
  - Click handler for close on overlay click
  - Style with z-index

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 6.2: Container Props
- [ ] Create src/props/container.ts
  - getContainerProps() function
  - Positioning styles
  - Click handler (stop propagation on content click)

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 6.3: Content Props
- [ ] Create src/props/content.ts
  - getContentProps() function
  - ARIA attributes
  - Keyboard handler
  - Ref callback for focus trap

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 6.4: Trigger Props
- [ ] Create src/props/trigger.ts
  - getTriggerProps() function
  - aria-haspopup, aria-expanded
  - Click handler to open

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 6.5: Close Button Props
- [ ] Create src/props/close.ts
  - getCloseButtonProps() function
  - aria-label
  - Click handler to close

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 6.6: Title and Description Props
- [ ] Create src/props/title.ts
  - getTitleProps() function
  - ID for aria-labelledby
- [ ] Create src/props/description.ts
  - getDescriptionProps() function
  - ID for aria-describedby

**Dependencies:** Task 5.4
**Estimated Files:** 2

### Task 6.7: Portal Props
- [ ] Create src/props/portal.ts
  - getPortalProps() function
  - Data attributes

**Dependencies:** Task 5.4
**Estimated Files:** 1

---

## Phase 7: Dialogs

### Task 7.1: Dialog Base
- [ ] Create src/dialogs/base.ts (if needed)
  - Common dialog utilities
  - DOM rendering helpers

**Dependencies:** Task 5.4
**Estimated Files:** 1

### Task 7.2: Confirm Dialog
- [ ] Create src/dialogs/confirm.ts
  - confirm() function with string or options
  - Promise-based API
  - DOM rendering
  - Button handling
  - Cleanup

**Dependencies:** Task 7.1
**Estimated Files:** 1

### Task 7.3: Alert Dialog
- [ ] Create src/dialogs/alert.ts
  - alert() function with string or options
  - Promise-based API
  - DOM rendering
  - Single button handling
  - Variant support

**Dependencies:** Task 7.1
**Estimated Files:** 1

### Task 7.4: Prompt Dialog
- [ ] Create src/dialogs/prompt.ts
  - prompt() function with string or options
  - Promise-based API
  - Input handling
  - Validation
  - Enter key submit

**Dependencies:** Task 7.1
**Estimated Files:** 1

---

## Phase 8: Main Exports

### Task 8.1: Main Index
- [ ] Create src/index.ts
  - Export createModal
  - Export modalStack
  - Export createFocusTrap
  - Export scrollLock
  - Export confirm, alert, prompt
  - Export all types

**Dependencies:** All Phase 3-7 tasks
**Estimated Files:** 1

---

## Phase 9: React Adapter

### Task 9.1: React Context
- [ ] Create src/adapters/react/context.tsx
  - ModalContext
  - ModalProvider component
  - useModalContext hook

**Dependencies:** Task 8.1
**Estimated Files:** 1

### Task 9.2: useModal Hook
- [ ] Create src/adapters/react/hooks/useModal.ts
  - Hook implementation
  - State synchronization
  - Props getters
  - Cleanup

**Dependencies:** Task 9.1
**Estimated Files:** 1

### Task 9.3: Dialog Hooks
- [ ] Create src/adapters/react/hooks/useConfirm.ts
- [ ] Create src/adapters/react/hooks/useAlert.ts
- [ ] Create src/adapters/react/hooks/usePrompt.ts

**Dependencies:** Task 9.1
**Estimated Files:** 3

### Task 9.4: Modal Component
- [ ] Create src/adapters/react/components/Modal.tsx
  - Compound component root
  - Controlled/uncontrolled modes
  - Context provider

**Dependencies:** Task 9.2
**Estimated Files:** 1

### Task 9.5: Modal Sub-components
- [ ] Create src/adapters/react/components/ModalTrigger.tsx
- [ ] Create src/adapters/react/components/ModalPortal.tsx
- [ ] Create src/adapters/react/components/ModalOverlay.tsx
- [ ] Create src/adapters/react/components/ModalContainer.tsx
- [ ] Create src/adapters/react/components/ModalContent.tsx
- [ ] Create src/adapters/react/components/ModalHeader.tsx
- [ ] Create src/adapters/react/components/ModalTitle.tsx
- [ ] Create src/adapters/react/components/ModalDescription.tsx
- [ ] Create src/adapters/react/components/ModalBody.tsx
- [ ] Create src/adapters/react/components/ModalFooter.tsx
- [ ] Create src/adapters/react/components/ModalClose.tsx

**Dependencies:** Task 9.4
**Estimated Files:** 11

### Task 9.6: Dialog Components
- [ ] Create src/adapters/react/components/ConfirmDialog.tsx
- [ ] Create src/adapters/react/components/AlertDialog.tsx
- [ ] Create src/adapters/react/components/PromptDialog.tsx

**Dependencies:** Task 9.4
**Estimated Files:** 3

### Task 9.7: Imperative API
- [ ] Create src/adapters/react/imperative/modals.ts
  - modals.open()
  - modals.close()
  - modals.closeAll()
  - modals.confirm()
  - modals.alert()
  - modals.prompt()

**Dependencies:** Task 9.1
**Estimated Files:** 1

### Task 9.8: React Exports
- [ ] Create src/adapters/react/index.ts
  - Export all hooks
  - Export all components
  - Export imperative API

**Dependencies:** All Task 9.x
**Estimated Files:** 1

---

## Phase 10: Testing

### Task 10.1: Test Setup
- [ ] Create tests/setup.ts
  - DOM mocks
  - Test utilities
  - Cleanup helpers

**Dependencies:** Task 8.1
**Estimated Files:** 1

### Task 10.2: Utility Tests
- [ ] Create tests/unit/utils/dom.test.ts
- [ ] Create tests/unit/utils/focus.test.ts
- [ ] Create tests/unit/utils/id.test.ts
- [ ] Create tests/unit/utils/events.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 4

### Task 10.3: Feature Tests
- [ ] Create tests/unit/features/focus-trap.test.ts
- [ ] Create tests/unit/features/scroll-lock.test.ts
- [ ] Create tests/unit/features/animation.test.ts
- [ ] Create tests/unit/features/keyboard.test.ts
- [ ] Create tests/unit/features/portal.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 5

### Task 10.4: Core Tests
- [ ] Create tests/unit/core/config.test.ts
- [ ] Create tests/unit/core/state.test.ts
- [ ] Create tests/unit/core/stack.test.ts
- [ ] Create tests/unit/core/modal.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 4

### Task 10.5: Props Tests
- [ ] Create tests/unit/props/overlay.test.ts
- [ ] Create tests/unit/props/container.test.ts
- [ ] Create tests/unit/props/content.test.ts
- [ ] Create tests/unit/props/trigger.test.ts
- [ ] Create tests/unit/props/close.test.ts
- [ ] Create tests/unit/props/title.test.ts
- [ ] Create tests/unit/props/description.test.ts
- [ ] Create tests/unit/props/portal.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 8

### Task 10.6: Dialog Tests
- [ ] Create tests/unit/dialogs/confirm.test.ts
- [ ] Create tests/unit/dialogs/alert.test.ts
- [ ] Create tests/unit/dialogs/prompt.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 3

### Task 10.7: Integration Tests
- [ ] Create tests/integration/modal.test.ts
- [ ] Create tests/integration/stack.test.ts
- [ ] Create tests/integration/focus.test.ts
- [ ] Create tests/integration/animation.test.ts
- [ ] Create tests/integration/confirm.test.ts
- [ ] Create tests/integration/alert.test.ts
- [ ] Create tests/integration/prompt.test.ts

**Dependencies:** Task 10.1
**Estimated Files:** 7

### Task 10.8: React Tests
- [ ] Create tests/integration/react/hooks.test.tsx
- [ ] Create tests/integration/react/components.test.tsx
- [ ] Create tests/integration/react/imperative.test.tsx

**Dependencies:** Task 10.1, Task 9.8
**Estimated Files:** 3

---

## Phase 11: Documentation

### Task 11.1: README
- [ ] Create README.md with full documentation

**Dependencies:** Task 8.1
**Estimated Files:** 1

### Task 11.2: Changelog
- [ ] Create CHANGELOG.md

**Dependencies:** None
**Estimated Files:** 1

---

## Phase 12: Website

### Task 12.1: Website Setup
- [ ] Create website/ directory
- [ ] Initialize Vite + React project
- [ ] Configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Configure fonts (JetBrains Mono, Inter)
- [ ] Setup React Router

**Dependencies:** Task 8.1
**Estimated Files:** Multiple config files

### Task 12.2: Website Layout
- [ ] Create layout components
  - Header with navigation
  - Sidebar for docs
  - Footer
- [ ] Create theme provider (dark/light)

**Dependencies:** Task 12.1
**Estimated Files:** 4-5

### Task 12.3: Home Page
- [ ] Create home page with hero
- [ ] Interactive modal demo
- [ ] Feature highlights
- [ ] Install command

**Dependencies:** Task 12.2
**Estimated Files:** 2-3

### Task 12.4: Documentation Pages
- [ ] Getting Started page
- [ ] Basic Modal page
- [ ] Dialogs page
- [ ] Stacking page
- [ ] Focus Management page
- [ ] Animation page
- [ ] Accessibility page

**Dependencies:** Task 12.2
**Estimated Files:** 7

### Task 12.5: API Reference Pages
- [ ] createModal API
- [ ] Modal instance API
- [ ] Stack API
- [ ] Types reference

**Dependencies:** Task 12.2
**Estimated Files:** 4

### Task 12.6: React Guide Pages
- [ ] Hooks documentation
- [ ] Components documentation
- [ ] Imperative API documentation

**Dependencies:** Task 12.2
**Estimated Files:** 3

### Task 12.7: Examples Page
- [ ] Interactive examples
- [ ] Code snippets with syntax highlighting

**Dependencies:** Task 12.2
**Estimated Files:** 2

### Task 12.8: GitHub Actions
- [ ] Create .github/workflows/deploy-website.yml

**Dependencies:** Task 12.1
**Estimated Files:** 1

---

## Summary

| Phase | Tasks | Estimated Files |
|-------|-------|-----------------|
| 1. Project Setup | 2 | 6 |
| 2. Core Types | 1 | 1 |
| 3. Utilities | 4 | 4 |
| 4. Features | 5 | 5 |
| 5. Core Modal | 4 | 4 |
| 6. Props Getters | 7 | 8 |
| 7. Dialogs | 4 | 4 |
| 8. Main Exports | 1 | 1 |
| 9. React Adapter | 8 | 21 |
| 10. Testing | 8 | 35 |
| 11. Documentation | 2 | 2 |
| 12. Website | 8 | 25+ |
| **Total** | **54** | **~116** |

---

## Execution Order

1. Phase 1: Project Setup
2. Phase 2: Core Types
3. Phase 3: Utilities (can be parallelized)
4. Phase 4: Features (can be parallelized after utilities)
5. Phase 5: Core Modal (depends on Phase 3, 4)
6. Phase 6: Props Getters (depends on Phase 5)
7. Phase 7: Dialogs (depends on Phase 5)
8. Phase 8: Main Exports
9. Phase 9: React Adapter (can start after Phase 8)
10. Phase 10: Testing (can start after each phase)
11. Phase 11: Documentation
12. Phase 12: Website
