# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ModalKit is a zero-dependency headless modal/dialog library with stacking, focus trap, and animations. It provides:
- Framework-agnostic core (`@oxog/modalkit`) with props getters pattern
- React adapter (`@oxog/modalkit/react`) with hooks and components
- Built-in dialogs: Confirm, Alert, and Prompt (promise-based)
- Full WAI-ARIA accessibility support
- Bundle size: ~6KB gzipped (core) / ~10KB gzipped (with React)

## Commands

```bash
# Development
npm run dev          # Watch mode build with tsup
npm run build        # Full build (core + React + copy to website)
npm run build:core   # Build core library only
npm run build:react  # Build React adapter only

# Testing
npm test             # Run Vitest in watch mode
npm run test:run     # Run Vitest once (CI mode)
npm run test:coverage # Run tests with coverage report

# Quality
npm run lint         # ESLint on src with .ts/.tsx
npm run typecheck    # TypeScript type checking (noEmit)
```

## Architecture

Single package with dual entry points:
- `@oxog/modalkit` - Framework-agnostic core
- `@oxog/modalkit/react` - React adapter

### Layered Architecture

```
User Application
    │
    v
React Adapter (optional)
    ├─ Hooks: useModal, useConfirm, useAlert, usePrompt
    ├─ Components: Modal, ModalTrigger, ModalContent, etc.
    └─ Imperative API: modals.open(), modals.close()
    │
    v
Core Library
    ├─ Modal Factory (createModal)
    ├─ Modal Stack (singleton)
    ├─ Dialogs: confirm, alert, prompt
    └─ Props Getters (overlay, container, content, etc.)
    │
    v
Features
    ├─ Focus Trap (createFocusTrap)
    ├─ Scroll Lock (reference counted)
    ├─ Animation (state machine)
    ├─ Keyboard (escape handling)
    └─ Portal (DOM rendering)
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/core/` | Core modal logic: modal.ts, state.ts, stack.ts, config.ts |
| `src/features/` | Focus trap, scroll lock, animation, keyboard, portal |
| `src/dialogs/` | confirm.ts, alert.ts, prompt.ts |
| `src/utils/` | dom.ts, focus.ts, id.ts, events.ts |
| `src/adapters/react/` | React adapter (hooks, components, context) |
| `tests/` | Vitest unit and integration tests |
| `website/` | Documentation site (React + Vite) |

## Non-Negotiable Rules

1. **ZERO DEPENDENCIES** - `dependencies` in package.json must be empty. Only React as peerDependency allowed.

2. **100% TEST COVERAGE** - All tests must pass with 100% coverage (98% lines, 90% branches, 98% functions).

3. **TYPESCRIPT STRICT MODE** - `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`.

4. **BUNDLE SIZE TARGET** - Core ~6KB gzipped, React ~10KB gzipped. Focus on keeping features minimal and tree-shakeable.

5. **NO EXTERNAL LINKS** - Only GitHub repo and docs site allowed (no social media, Discord, email).

## Core API

**Core entry (`@oxog/modalkit`):**
```typescript
createModal(config?: ModalConfig): Modal
modalStack: ModalStack
confirm(options: ConfirmOptions): Promise<boolean>
alert(options: AlertOptions): Promise<void>
prompt(options: PromptOptions): Promise<string | null>
```

**React entry (`@oxog/modalkit/react`):**
```typescript
// Provider
<ModalProvider>{children}</ModalProvider>

// Hooks
useModal(config?): UseModalReturn
useConfirm(): (options) => Promise<boolean>
useAlert(): (options) => Promise<void>
usePrompt(): (options) => Promise<string | null>

// Imperative API
modals.open(config): string
modals.close(id)
```

## Browser Support

Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

## References

- Full API specification: [docs/modalkit-claude-code-prompt.md](docs/modalkit-claude-code-prompt.md)
- Documentation site: https://modalkit.oxog.dev
