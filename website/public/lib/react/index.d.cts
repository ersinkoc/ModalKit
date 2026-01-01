import React, { ReactNode, ReactElement, CSSProperties } from 'react';

/**
 * Type of animation being performed
 */
type AnimationType = 'enter' | 'exit';
/**
 * Current state of the modal animation
 */
type AnimationState = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited';
/**
 * Configuration options for creating a modal
 */
interface ModalConfig {
    /** Whether the modal is currently open (controlled mode) */
    open?: boolean;
    /** Initial open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Close modal when clicking outside content (default: true) */
    closeOnOverlayClick?: boolean;
    /** Close modal when pressing Escape key (default: true) */
    closeOnEscape?: boolean;
    /** Lock body scroll when modal is open (default: true) */
    preventScroll?: boolean;
    /** Where scrolling is allowed: 'inside' modal or 'outside' (default: 'inside') */
    scrollBehavior?: 'inside' | 'outside';
    /** Trap focus within the modal (default: true) */
    trapFocus?: boolean;
    /** Auto-focus first focusable element on open (default: true) */
    autoFocus?: boolean;
    /** Restore focus to trigger element on close (default: true) */
    restoreFocus?: boolean;
    /** Element to focus when modal opens */
    initialFocusRef?: HTMLElement | (() => HTMLElement | null) | null;
    /** Element to focus when modal closes */
    finalFocusRef?: HTMLElement | (() => HTMLElement | null) | null;
    /** Allow multiple modals to stack (default: true) */
    stackable?: boolean;
    /** Close current modal when new one opens (default: false) */
    closeOnStackedOpen?: boolean;
    /** Enable enter/exit animations (default: false) */
    animated?: boolean;
    /** Animation duration in milliseconds (default: 200) */
    animationDuration?: number;
    /** Target element for portal rendering */
    portalTarget?: HTMLElement | string | null;
    /** Disable portal and render in place (default: false) */
    disablePortal?: boolean;
    /** Called when modal opens */
    onOpen?: () => void;
    /** Called when modal closes */
    onClose?: () => void;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Called when animation starts */
    onAnimationStart?: (type: AnimationType) => void;
    /** Called when animation ends */
    onAnimationEnd?: (type: AnimationType) => void;
    /** Called when Escape key is pressed */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /** Called when overlay is clicked */
    onOverlayClick?: (event: MouseEvent) => void;
    /** Custom ID for the modal */
    id?: string;
    /** ARIA role: 'dialog' or 'alertdialog' (default: 'dialog') */
    role?: 'dialog' | 'alertdialog';
    /** Custom aria-label */
    ariaLabel?: string;
    /** ID of element that labels the modal */
    ariaLabelledBy?: string;
    /** ID of element that describes the modal */
    ariaDescribedBy?: string;
}
/**
 * Current state of a modal instance
 */
interface ModalState {
    /** Whether the modal is open */
    open: boolean;
    /** Current animation state */
    animationState: AnimationState;
    /** Position in the modal stack (1-based) */
    stackOrder: number;
    /** Whether this is the top-most modal */
    isTopMost: boolean;
    /** Whether the modal is mounted in DOM */
    mounted: boolean;
}
/**
 * Props for the portal wrapper element
 */
interface PortalProps {
    'data-modalkit-portal': '';
    'data-state': AnimationState;
}
/**
 * Props for the overlay/backdrop element
 */
interface OverlayProps {
    ref: (el: HTMLElement | null) => void;
    'data-modalkit-overlay': '';
    'data-state': AnimationState;
    style: {
        position: 'fixed';
        inset: '0';
        zIndex: number;
    };
    onClick: (e: MouseEvent) => void;
}
/**
 * Props for the container element
 */
interface ContainerProps {
    ref: (el: HTMLElement | null) => void;
    'data-modalkit-container': '';
    'data-state': AnimationState;
    style: {
        position: 'fixed';
        inset: '0';
        display: 'flex';
        alignItems: string;
        justifyContent: string;
        zIndex: number;
        overflow: string;
    };
    onClick: (e: MouseEvent) => void;
}
/**
 * Props for the content element
 */
interface ContentProps {
    ref: (el: HTMLElement | null) => void;
    role: 'dialog' | 'alertdialog';
    'aria-modal': true;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'data-modalkit-content': '';
    'data-state': AnimationState;
    tabIndex: -1;
    onKeyDown: (e: KeyboardEvent) => void;
}
/**
 * Props for the title element
 */
interface TitleProps {
    id: string;
    'data-modalkit-title': '';
}
/**
 * Props for the description element
 */
interface DescriptionProps {
    id: string;
    'data-modalkit-description': '';
}
/**
 * Props for the close button
 */
interface CloseButtonProps {
    type: 'button';
    'aria-label': string;
    'data-modalkit-close': '';
    onClick: (e: MouseEvent) => void;
}
/**
 * Props for the trigger button
 */
interface TriggerProps {
    type: 'button';
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
    'data-modalkit-trigger': '';
    onClick: (e: MouseEvent) => void;
}
/**
 * Modal instance API
 */
interface Modal$1 {
    /** Check if modal is open */
    isOpen(): boolean;
    /** Check if modal is mounted in DOM */
    isMounted(): boolean;
    /** Get full modal state */
    getState(): ModalState;
    /** Subscribe to state changes */
    subscribe(callback: (state: ModalState) => void): () => void;
    /** Open the modal */
    open(): void;
    /** Close the modal */
    close(): void;
    /** Toggle open/close state */
    toggle(): void;
    /** Get position in modal stack */
    getStackOrder(): number;
    /** Check if this is the top-most modal */
    isTopMost(): boolean;
    /** Check if animation is in progress */
    isAnimating(): boolean;
    /** Get current animation state */
    getAnimationState(): AnimationState;
    /** Focus the first focusable element */
    focusFirst(): void;
    /** Focus the last focusable element */
    focusLast(): void;
    /** Check if element is inside the modal */
    contains(element: Element | null): boolean;
    /** Get the portal target element */
    getPortalTarget(): HTMLElement;
    /** Get props for portal element */
    getPortalProps(): PortalProps;
    /** Get props for overlay element */
    getOverlayProps(): OverlayProps;
    /** Get props for container element */
    getContainerProps(): ContainerProps;
    /** Get props for content element */
    getContentProps(): ContentProps;
    /** Get props for title element */
    getTitleProps(id?: string): TitleProps;
    /** Get props for description element */
    getDescriptionProps(id?: string): DescriptionProps;
    /** Get props for close button */
    getCloseButtonProps(): CloseButtonProps;
    /** Get props for trigger button */
    getTriggerProps(): TriggerProps;
    /** Get current configuration */
    getConfig(): ModalConfig;
    /** Update configuration */
    setConfig(config: Partial<ModalConfig>): void;
    /** Destroy the modal instance and cleanup */
    destroy(): void;
}
/**
 * Options for confirm dialog
 */
interface ConfirmOptions {
    /** Dialog title */
    title?: string;
    /** Dialog message */
    message: string;
    /** Confirm button text (default: 'Confirm') */
    confirmText?: string;
    /** Cancel button text (default: 'Cancel') */
    cancelText?: string;
    /** Visual variant */
    variant?: 'default' | 'danger' | 'warning';
    /** Close on overlay click */
    closeOnOverlayClick?: boolean;
    /** Close on Escape key */
    closeOnEscape?: boolean;
}
/**
 * Custom button configuration for confirm dialog
 */
interface ConfirmButton {
    /** Button text */
    text: string;
    /** Value returned when clicked */
    value: string | boolean;
    /** Visual variant */
    variant?: 'default' | 'primary' | 'danger' | 'warning';
    /** Auto-focus this button */
    autoFocus?: boolean;
}
/**
 * Advanced confirm options with custom buttons
 */
interface ConfirmOptionsAdvanced extends ConfirmOptions {
    /** Custom button configurations */
    buttons?: ConfirmButton[];
}
/**
 * Options for alert dialog
 */
interface AlertOptions {
    /** Dialog title */
    title?: string;
    /** Dialog message */
    message: string;
    /** Confirm button text (default: 'OK') */
    confirmText?: string;
    /** Visual variant */
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}
/**
 * Options for prompt dialog
 */
interface PromptOptions {
    /** Dialog title */
    title?: string;
    /** Dialog message */
    message?: string;
    /** Input placeholder */
    placeholder?: string;
    /** Default input value */
    defaultValue?: string;
    /** Confirm button text (default: 'OK') */
    confirmText?: string;
    /** Cancel button text (default: 'Cancel') */
    cancelText?: string;
    /** Input type */
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    /** Validation function */
    validate?: (value: string) => boolean | string;
    /** Whether input is required */
    required?: boolean;
    /** Minimum input length */
    minLength?: number;
    /** Maximum input length */
    maxLength?: number;
}

/**
 * React context for ModalKit
 */

/**
 * Modal instance wrapper for imperative API
 */
interface ManagedModal {
    id: string;
    modal: Modal$1;
    content: ReactNode | ((props: {
        close: () => void;
    }) => ReactNode);
    config: ModalConfig;
}
/**
 * Context value interface
 */
interface ModalContextValue$1 {
    modals: Map<string, ManagedModal>;
    openModal: (config: {
        id?: string;
        content: ReactNode | ((props: {
            close: () => void;
        }) => ReactNode);
        title?: string;
        size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    } & Partial<ModalConfig>) => string;
    closeModal: (id: string) => void;
    closeAll: () => void;
    _forceUpdate: () => void;
}
/**
 * Hook to access modal context
 */
declare function useModalContext(): ModalContextValue$1;
/**
 * Provider props
 */
interface ModalProviderProps {
    children: ReactNode;
}
/**
 * Modal provider component
 */
declare function ModalProvider({ children }: ModalProviderProps): React.ReactElement;

/**
 * useModal hook for React
 */

/**
 * Return type for useModal hook
 */
interface UseModalReturn {
    isOpen: boolean;
    animationState: AnimationState;
    stackOrder: number;
    isTopMost: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    focusFirst: () => void;
    focusLast: () => void;
    getTriggerProps: () => TriggerProps;
    getOverlayProps: () => OverlayProps;
    getContainerProps: () => ContainerProps;
    getContentProps: () => ContentProps;
    getTitleProps: (id?: string) => TitleProps;
    getDescriptionProps: (id?: string) => DescriptionProps;
    getCloseButtonProps: () => CloseButtonProps;
    modal: Modal$1;
}
/**
 * Hook to create and manage a modal
 */
declare function useModal(config?: ModalConfig): UseModalReturn;

/**
 * useConfirm hook for React
 */

/**
 * Hook to show confirm dialogs
 */
declare function useConfirm(): (messageOrOptions: string | ConfirmOptions | ConfirmOptionsAdvanced) => Promise<boolean | string>;

/**
 * useAlert hook for React
 */

/**
 * Hook to show alert dialogs
 */
declare function useAlert(): (messageOrOptions: string | AlertOptions) => Promise<void>;

/**
 * usePrompt hook for React
 */

/**
 * Hook to show prompt dialogs
 */
declare function usePrompt(): (messageOrOptions: string | PromptOptions) => Promise<string | null>;

/**
 * Modal compound component for React
 */

/**
 * Modal context value
 */
interface ModalContextValue {
    modal: Modal$1;
    state: ModalState;
}
/**
 * Hook to access modal context within compound components
 */
declare function useModalComponentContext(): ModalContextValue;
/**
 * Modal component props
 */
interface ModalProps extends Omit<ModalConfig, 'open' | 'defaultOpen'> {
    /** Whether the modal is open (controlled) */
    open?: boolean;
    /** Initial open state (uncontrolled) */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Children */
    children: ReactNode;
}
/**
 * Modal root component
 */
declare function Modal({ open, defaultOpen, onOpenChange, children, ...config }: ModalProps): React.ReactElement;

/**
 * ModalTrigger component
 */

/**
 * ModalTrigger props
 */
interface ModalTriggerProps {
    /** Render as child element instead of button */
    asChild?: boolean;
    /** Children */
    children: React.ReactNode;
    /** Additional class name */
    className?: string;
}
/**
 * Modal trigger button component
 */
declare function ModalTrigger({ asChild, children, className, }: ModalTriggerProps): ReactElement;

/**
 * ModalPortal component
 */

/**
 * ModalPortal props
 */
interface ModalPortalProps {
    /** Container element for portal */
    container?: HTMLElement;
    /** Children */
    children: ReactNode;
}
/**
 * Modal portal component - renders children in a portal
 */
declare function ModalPortal({ container, children, }: ModalPortalProps): ReactElement | null;

/**
 * ModalOverlay component
 */

/**
 * ModalOverlay props
 */
interface ModalOverlayProps {
    /** Children */
    children?: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal overlay/backdrop component
 */
declare const ModalOverlay: React.ForwardRefExoticComponent<ModalOverlayProps & React.RefAttributes<HTMLDivElement>>;

/**
 * ModalContainer component
 */

/**
 * Position options
 */
type ModalPosition = 'center' | 'top';
/**
 * ModalContainer props
 */
interface ModalContainerProps {
    /** Position of modal content */
    position?: ModalPosition;
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal container component - handles positioning
 */
declare const ModalContainer: React.ForwardRefExoticComponent<ModalContainerProps & React.RefAttributes<HTMLDivElement>>;

/**
 * ModalContent component
 */

/**
 * Size options
 */
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
/**
 * ModalContent props
 */
interface ModalContentProps {
    /** Size of the modal */
    size?: ModalSize;
    /** ARIA role override */
    role?: 'dialog' | 'alertdialog';
    /** Custom aria-label */
    'aria-label'?: string;
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal content component - the actual modal box
 */
declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * ModalHeader component
 */

/**
 * ModalHeader props
 */
interface ModalHeaderProps {
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal header component - contains title and close button
 */
declare function ModalHeader({ children, className, style, }: ModalHeaderProps): ReactElement;

/**
 * ModalTitle component
 */

/**
 * ModalTitle props
 */
interface ModalTitleProps {
    /** Custom ID */
    id?: string;
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal title component
 */
declare function ModalTitle({ id, children, className, style, }: ModalTitleProps): ReactElement;

/**
 * ModalDescription component
 */

/**
 * ModalDescription props
 */
interface ModalDescriptionProps {
    /** Custom ID */
    id?: string;
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal description component
 */
declare function ModalDescription({ id, children, className, style, }: ModalDescriptionProps): ReactElement;

/**
 * ModalBody component
 */

/**
 * ModalBody props
 */
interface ModalBodyProps {
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal body component - main content area
 */
declare function ModalBody({ children, className, style, }: ModalBodyProps): ReactElement;

/**
 * ModalFooter component
 */

/**
 * ModalFooter props
 */
interface ModalFooterProps {
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal footer component - contains action buttons
 */
declare function ModalFooter({ children, className, style, }: ModalFooterProps): ReactElement;

/**
 * ModalClose component
 */

/**
 * ModalClose props
 */
interface ModalCloseProps {
    /** Render as child element instead of button */
    asChild?: boolean;
    /** Custom aria-label */
    'aria-label'?: string;
    /** Children */
    children?: React.ReactNode;
    /** Additional class name */
    className?: string;
    /** Additional styles */
    style?: CSSProperties;
}
/**
 * Modal close button component
 */
declare function ModalClose({ asChild, 'aria-label': ariaLabel, children, className, style, }: ModalCloseProps): ReactElement;

/**
 * ConfirmDialog component
 */

/**
 * Variant types
 */
type ConfirmDialogVariant = 'default' | 'danger' | 'warning';
/**
 * ConfirmDialog props
 */
interface ConfirmDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when open state changes */
    onOpenChange: (open: boolean) => void;
    /** Dialog title */
    title?: string;
    /** Dialog description/message */
    description: string;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Visual variant */
    variant?: ConfirmDialogVariant;
    /** Called when confirm is clicked */
    onConfirm: () => void;
    /** Called when cancel is clicked */
    onCancel?: () => void;
    /** Additional class name for content */
    className?: string;
    /** Additional styles for content */
    style?: CSSProperties;
}
/**
 * Pre-built confirm dialog component
 */
declare function ConfirmDialog({ open, onOpenChange, title, description, confirmText, cancelText, variant, onConfirm, onCancel, className, style, }: ConfirmDialogProps): ReactElement;

/**
 * AlertDialog component
 */

/**
 * Variant types
 */
type AlertDialogVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/**
 * AlertDialog props
 */
interface AlertDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when open state changes */
    onOpenChange: (open: boolean) => void;
    /** Dialog title */
    title?: string;
    /** Dialog description/message */
    description: string;
    /** Confirm button text */
    confirmText?: string;
    /** Visual variant */
    variant?: AlertDialogVariant;
    /** Called when confirm is clicked */
    onConfirm: () => void;
    /** Additional class name for content */
    className?: string;
    /** Additional styles for content */
    style?: CSSProperties;
}
/**
 * Pre-built alert dialog component
 */
declare function AlertDialog({ open, onOpenChange, title, description, confirmText, variant, onConfirm, className, style, }: AlertDialogProps): ReactElement;

/**
 * PromptDialog component
 */

/**
 * PromptDialog props
 */
interface PromptDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when open state changes */
    onOpenChange: (open: boolean) => void;
    /** Dialog title */
    title?: string;
    /** Dialog description/message */
    description?: string;
    /** Input placeholder */
    placeholder?: string;
    /** Default input value */
    defaultValue?: string;
    /** Confirm button text */
    confirmText?: string;
    /** Cancel button text */
    cancelText?: string;
    /** Input type */
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    /** Validation function */
    validate?: (value: string) => boolean | string;
    /** Whether input is required */
    required?: boolean;
    /** Minimum input length */
    minLength?: number;
    /** Maximum input length */
    maxLength?: number;
    /** Called when confirm is clicked with the input value */
    onConfirm: (value: string) => void;
    /** Called when cancel is clicked */
    onCancel?: () => void;
    /** Additional class name for content */
    className?: string;
    /** Additional styles for content */
    style?: CSSProperties;
}
/**
 * Pre-built prompt dialog component
 */
declare function PromptDialog({ open, onOpenChange, title, description, placeholder, defaultValue, confirmText, cancelText, type, validate, required, minLength, maxLength, onConfirm, onCancel, className, style, }: PromptDialogProps): ReactElement;

/**
 * Imperative modals API for React
 *
 * Note: This requires the ModalProvider to be mounted in the app.
 * For standalone usage without React context, use the core
 * confirm(), alert(), prompt() functions from '@oxog/modalkit'.
 */

/**
 * Show a confirm dialog
 */
declare function confirm(message: string): Promise<boolean>;
declare function confirm(options: ConfirmOptions): Promise<boolean>;
declare function confirm(options: ConfirmOptionsAdvanced): Promise<string | boolean>;
/**
 * Show an alert dialog
 */
declare function alert(message: string): Promise<void>;
declare function alert(options: AlertOptions): Promise<void>;
/**
 * Show a prompt dialog
 */
declare function prompt(message: string): Promise<string | null>;
declare function prompt(options: PromptOptions): Promise<string | null>;
/**
 * Imperative modals API
 *
 * These functions use the core implementation and work without React context.
 * They render dialogs directly to the DOM.
 */
declare const modals: {
    confirm: typeof confirm;
    alert: typeof alert;
    prompt: typeof prompt;
};

export { AlertDialog, type AlertDialogProps, type AlertDialogVariant, type AlertOptions, type AnimationState, type AnimationType, type ConfirmButton, ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant, type ConfirmOptions, type ConfirmOptionsAdvanced, Modal, ModalBody, type ModalBodyProps, ModalClose, type ModalCloseProps, type ModalConfig, ModalContainer, type ModalContainerProps, ModalContent, type ModalContentProps, type ModalContextValue$1 as ModalContextValue, ModalDescription, type ModalDescriptionProps, ModalFooter, type ModalFooterProps, ModalHeader, type ModalHeaderProps, ModalOverlay, type ModalOverlayProps, ModalPortal, type ModalPortalProps, type ModalPosition, type ModalProps, ModalProvider, type ModalProviderProps, type ModalSize, type ModalState, ModalTitle, type ModalTitleProps, ModalTrigger, type ModalTriggerProps, PromptDialog, type PromptDialogProps, type PromptOptions, type UseModalReturn, modals, useAlert, useConfirm, useModal, useModalComponentContext, useModalContext, usePrompt };
