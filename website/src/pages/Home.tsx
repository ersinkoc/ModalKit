import { Link } from 'react-router-dom'
import { ArrowRight, Package, Zap, Shield, Layers, Eye, Keyboard, Github, ExternalLink } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import LiveDemo from '../components/LiveDemo'
import {
  BasicModalDemo,
  basicModalCode,
  AnimatedModalDemo,
  animatedModalCode,
  DialogsDemo,
  dialogsCode,
  StackingDemo,
  stackingCode
} from '../components/demos'

const features = [
  {
    icon: Package,
    title: 'Zero Dependencies',
    description: 'No external dependencies. Pure TypeScript implementation keeps your bundle small.',
  },
  {
    icon: Zap,
    title: 'Tiny Bundle',
    description: 'Core ~3KB gzipped. Performance-first design for modern applications.',
  },
  {
    icon: Shield,
    title: 'Type Safe',
    description: 'Written in strict TypeScript with full type inference and autocompletion.',
  },
  {
    icon: Layers,
    title: 'Headless UI',
    description: 'Complete styling freedom with props getters pattern. No CSS included.',
  },
  {
    icon: Eye,
    title: 'Accessible',
    description: 'WAI-ARIA compliant with focus trap, keyboard navigation, and screen reader support.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard First',
    description: 'Full keyboard support including Escape to close and Tab navigation.',
  },
]

const installCode = `npm install @oxog/modalkit`

const coreApiCode = `import { createModal } from '@oxog/modalkit'

const modal = createModal({
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
})

// Open/close modal
modal.open()
modal.close()
modal.toggle()

// Get props for your elements
const overlayProps = modal.getOverlayProps()
const contentProps = modal.getContentProps()

// Subscribe to state changes
modal.subscribe((state) => {
  console.log('Open:', state.open)
  console.log('Animation:', state.animationState)
})`

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              v1.0.0 Released
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Headless Modal Library
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                for Modern Web Apps
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              A zero-dependency, type-safe, accessible modal and dialog solution.
              Complete styling freedom with props getters pattern.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/docs/getting-started"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/oxog/modalkit"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors border border-gray-700 flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            {/* Install command */}
            <div className="max-w-md mx-auto">
              <CodeBlock code={installCode} language="bash" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-20 border-t border-gray-800 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Try It Live
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience ModalKit's features firsthand. Click the buttons below to see the modals in action.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LiveDemo
              title="Basic Modal"
              description="A simple, accessible modal with all the essentials"
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

            <LiveDemo
              title="Built-in Dialogs"
              description="Promise-based alert, confirm, and prompt dialogs"
              code={dialogsCode}
            >
              <DialogsDemo />
            </LiveDemo>

            <LiveDemo
              title="Modal Stacking"
              description="Multiple modals with automatic z-index management"
              code={stackingCode}
            >
              <StackingDemo />
            </LiveDemo>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why ModalKit?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with modern best practices and developer experience in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core API Example */}
      <section className="py-20 border-t border-gray-800 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Framework Agnostic Core
              </h2>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                The core library works with any framework or vanilla JavaScript.
                Use props getters to integrate with your existing UI.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span className="text-gray-300">Factory function pattern for creating modals</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span className="text-gray-300">Props getters return all necessary attributes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span className="text-gray-300">Subscription-based reactivity system</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <span className="text-gray-300">Works with Vue, Svelte, Angular, or vanilla JS</span>
                </li>
              </ul>

              <Link
                to="/docs/api"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
              >
                View API Reference
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <CodeBlock code={coreApiCode} language="typescript" filename="modal.ts" />
            </div>
          </div>
        </div>
      </section>

      {/* More Examples Link */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Explore More Examples
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Discover form modals, drawers, image galleries, and more creative uses of ModalKit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/examples"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              View All Examples
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/docs/getting-started"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors border border-gray-700"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-gray-800 bg-gradient-to-b from-gray-950 to-purple-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Build?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Install ModalKit and create beautiful, accessible modals in minutes.
          </p>
          <div className="max-w-md mx-auto">
            <CodeBlock code={installCode} language="bash" />
          </div>
        </div>
      </section>
    </div>
  )
}
