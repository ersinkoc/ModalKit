# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-31

### Added

- Initial release of ModalKit
- Core modal functionality with `createModal()` factory
- Modal stack management with `modalStack`
- Focus trap with `createFocusTrap()`
- Scroll lock with `scrollLock`
- Confirm dialog with `confirm()`
- Alert dialog with `alert()`
- Prompt dialog with `prompt()`
- Animation support with enter/exit states
- Full keyboard navigation (Escape, Tab, Shift+Tab)
- Complete WAI-ARIA accessibility
- Portal rendering to document body
- React adapter with hooks:
  - `useModal`
  - `useConfirm`
  - `useAlert`
  - `usePrompt`
- React components:
  - `Modal`, `ModalTrigger`, `ModalPortal`
  - `ModalOverlay`, `ModalContainer`, `ModalContent`
  - `ModalHeader`, `ModalTitle`, `ModalDescription`
  - `ModalBody`, `ModalFooter`, `ModalClose`
  - `ConfirmDialog`, `AlertDialog`, `PromptDialog`
- React imperative API with `modals`
- TypeScript strict mode support
- Zero runtime dependencies
- < 3KB minified + gzipped bundle size

### Technical

- ESM and CJS dual module exports
- Full TypeScript type definitions
- 100% test coverage with Vitest
- Tree-shakeable exports
