import LiveDemo from '../components/LiveDemo'
import {
  BasicModalDemo,
  basicModalCode,
  AnimatedModalDemo,
  animatedModalCode,
  DialogsDemo,
  dialogsCode,
  StackingDemo,
  stackingCode,
  FormModalDemo,
  formModalCode,
  DrawerDemo,
  drawerCode
} from '../components/demos'

export default function Examples() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Examples
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore interactive examples showcasing ModalKit's capabilities.
            Click any demo to try it out.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="space-y-12">
          {/* Basic Modals */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">
                1
              </span>
              Basic Modals
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <LiveDemo
                title="Simple Modal"
                description="A basic modal with title, description, and close button"
                code={basicModalCode}
              >
                <BasicModalDemo />
              </LiveDemo>

              <LiveDemo
                title="Animated Modal"
                description="Smooth CSS transitions with customizable timing"
                code={animatedModalCode}
              >
                <AnimatedModalDemo />
              </LiveDemo>
            </div>
          </section>

          {/* Dialogs */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
                2
              </span>
              Built-in Dialogs
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <LiveDemo
                title="Alert, Confirm & Prompt"
                description="Promise-based dialog functions for common use cases"
                code={dialogsCode}
              >
                <DialogsDemo />
              </LiveDemo>

              <div className="border border-gray-800 rounded-xl bg-gray-900/50 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-4">Dialog Features</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Async/await Promise-based API
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Multiple variants: info, success, warning, error
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Built-in validation for prompt inputs
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Customizable button text and styling
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Keyboard accessible (Enter to confirm, Escape to cancel)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advanced */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm font-bold">
                3
              </span>
              Advanced Patterns
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <LiveDemo
                title="Modal Stacking"
                description="Nested modals with automatic z-index and focus management"
                code={stackingCode}
              >
                <StackingDemo />
              </LiveDemo>

              <LiveDemo
                title="Form Modal"
                description="Modal with form, validation, and loading states"
                code={formModalCode}
              >
                <FormModalDemo />
              </LiveDemo>
            </div>
          </section>

          {/* Layout Variations */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold">
                4
              </span>
              Layout Variations
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <LiveDemo
                title="Slide-in Drawer"
                description="Side drawer with smooth CSS transitions for navigation"
                code={drawerCode}
              >
                <DrawerDemo />
              </LiveDemo>

              <div className="border border-gray-800 rounded-xl bg-gray-900/50 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-4">More Patterns</h3>
                <p className="text-gray-400 mb-4">
                  ModalKit's headless architecture supports any modal pattern:
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Bottom sheets for mobile
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Full-screen modals
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Image lightbox galleries
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Command palettes (Cmd+K)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Toast notifications as modals
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Want to see the source code for these examples?
          </p>
          <a
            href="https://github.com/oxog/modalkit/tree/main/website/src/components/demos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
