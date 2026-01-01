import CodeBlock from '../../components/CodeBlock'

const basicAnimationCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  animated: true,
  animationDuration: 200, // milliseconds
})

// Subscribe to animation state changes
modal.subscribe((state) => {
  console.log('Animation state:', state.animationState)
  // 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'
})`

const animationStatesCode = `// Animation state machine:
//
// CLOSED: idle
//    |
//    v (open())
// OPENING: entering -> entered
//    |
//    v (close())
// CLOSING: exiting -> exited -> idle
//
// States:
// - idle: Modal is closed, not animating
// - entering: Modal is opening (animation in progress)
// - entered: Modal is fully open
// - exiting: Modal is closing (animation in progress)
// - exited: Modal has finished closing, about to become idle`

const cssAnimationCode = `/* Example CSS animations */
.modal-overlay {
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.modal-overlay[data-state="entering"],
.modal-overlay[data-state="entered"] {
  opacity: 1;
}

.modal-overlay[data-state="exiting"] {
  opacity: 0;
}

.modal-content {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

.modal-content[data-state="entering"],
.modal-content[data-state="entered"] {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-content[data-state="exiting"] {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}`

const reactAnimationCode = `import { Modal, ModalContent, ModalOverlay, ModalPortal } from '@oxog/modalkit/react'

function AnimatedModal() {
  return (
    <Modal animated animationDuration={200}>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay className="modal-overlay" />
        <ModalContainer>
          <ModalContent className="modal-content">
            <h2>Animated Modal</h2>
            <p>This modal has smooth animations.</p>
          </ModalContent>
        </ModalContainer>
      </ModalPortal>
    </Modal>
  )
}

// CSS
const styles = \`
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 200ms;
}

.modal-overlay[data-state="entering"],
.modal-overlay[data-state="entered"] {
  opacity: 1;
}

.modal-content {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 200ms, opacity 200ms;
}

.modal-content[data-state="entering"],
.modal-content[data-state="entered"] {
  transform: scale(1);
  opacity: 1;
}
\``

const dataAttributesCode = `// ModalKit adds data-state attribute to elements
// Use this in your CSS for animations

<div data-state="idle">...</div>      // Closed
<div data-state="entering">...</div>  // Opening animation
<div data-state="entered">...</div>   // Fully open
<div data-state="exiting">...</div>   // Closing animation
<div data-state="exited">...</div>    // Just closed

// The getOverlayProps() and getContentProps() include:
{
  'data-state': 'entering' // or other states
}`

const slideAnimationCode = `/* Slide from bottom */
.modal-content {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}

.modal-content[data-state="entering"],
.modal-content[data-state="entered"] {
  transform: translateY(0);
  opacity: 1;
}

.modal-content[data-state="exiting"] {
  transform: translateY(100%);
  opacity: 0;
}

/* Slide from right (drawer) */
.drawer-content {
  transform: translateX(100%);
  transition: transform 300ms ease-out;
}

.drawer-content[data-state="entering"],
.drawer-content[data-state="entered"] {
  transform: translateX(0);
}

.drawer-content[data-state="exiting"] {
  transform: translateX(100%);
}`

const callbacksCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  animated: true,
  animationDuration: 200,

  // Called when modal starts opening
  onOpen: () => {
    console.log('Modal opening')
  },

  // Called when modal is fully open (after animation)
  onOpened: () => {
    console.log('Modal fully opened')
  },

  // Called when modal starts closing
  onClose: () => {
    console.log('Modal closing')
  },

  // Called when modal is fully closed (after animation)
  onClosed: () => {
    console.log('Modal fully closed')
  },
})`

const disableAnimationCode = `// Disable animations for specific scenarios
const modal = createModal({
  animated: false,
})

// Or conditionally based on user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

const modal2 = createModal({
  animated: !prefersReducedMotion,
  animationDuration: prefersReducedMotion ? 0 : 200,
})`

export default function Animation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose-custom">
        <h1>Animation</h1>
        <p>
          ModalKit provides a flexible animation system based on state
          transitions. You have complete control over animations using CSS
          transitions or any animation library.
        </p>

        <h2>Basic Setup</h2>
        <p>
          Enable animations by setting the <code>animated</code> prop:
        </p>
        <CodeBlock code={basicAnimationCode} language="typescript" filename="animation.ts" />

        <h2>Animation States</h2>
        <p>
          ModalKit uses a state machine to track animation progress:
        </p>
        <CodeBlock code={animationStatesCode} language="typescript" />

        <h2>CSS Animations</h2>
        <p>
          Use CSS transitions with the <code>data-state</code> attribute:
        </p>
        <CodeBlock code={cssAnimationCode} language="css" filename="modal.css" />

        <h2>Data Attributes</h2>
        <p>
          ModalKit automatically adds <code>data-state</code> attributes to
          elements for CSS targeting:
        </p>
        <CodeBlock code={dataAttributesCode} language="tsx" />

        <h2>React Example</h2>
        <p>
          Complete React example with CSS animations:
        </p>
        <CodeBlock code={reactAnimationCode} language="tsx" filename="AnimatedModal.tsx" />

        <h2>Animation Variants</h2>

        <h3>Slide Animations</h3>
        <p>
          Create slide-in effects for modals and drawers:
        </p>
        <CodeBlock code={slideAnimationCode} language="css" filename="slide.css" />

        <h2>Animation Callbacks</h2>
        <p>
          Listen to animation lifecycle events:
        </p>
        <CodeBlock code={callbacksCode} language="typescript" />

        <h2>Reduced Motion</h2>
        <p>
          Respect user preferences for reduced motion:
        </p>
        <CodeBlock code={disableAnimationCode} language="typescript" />

        <h2>Animation Tips</h2>
        <ul>
          <li>
            <strong>Keep animations short:</strong> 150-300ms is ideal for
            modals
          </li>
          <li>
            <strong>Use easing:</strong> <code>ease-out</code> for opening,{' '}
            <code>ease-in</code> for closing
          </li>
          <li>
            <strong>Animate transform and opacity:</strong> These properties
            are GPU-accelerated
          </li>
          <li>
            <strong>Sync duration:</strong> Match CSS transition duration with{' '}
            <code>animationDuration</code> prop
          </li>
          <li>
            <strong>Test on mobile:</strong> Ensure animations are smooth on
            lower-powered devices
          </li>
        </ul>

        <h2>Performance</h2>
        <ul>
          <li>
            Use <code>transform</code> and <code>opacity</code> for animations
            (GPU-accelerated)
          </li>
          <li>
            Avoid animating <code>width</code>, <code>height</code>, or{' '}
            <code>top</code>/<code>left</code>
          </li>
          <li>
            Use <code>will-change: transform, opacity</code> sparingly
          </li>
          <li>
            Consider disabling animations for users who prefer reduced motion
          </li>
        </ul>
      </div>
    </div>
  )
}
