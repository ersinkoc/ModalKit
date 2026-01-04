import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from '@oxog/modalkit/react'
import { X, Settings, Play, RotateCcw } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

type AnimationType = 'none' | 'fade' | 'scale' | 'slide-up' | 'slide-down'
type PositionType = 'center' | 'top' | 'bottom'

interface PlaygroundConfig {
  closeOnEscape: boolean
  closeOnOverlayClick: boolean
  trapFocus: boolean
  animation: AnimationType
  position: PositionType
  showOverlay: boolean
  overlayBlur: boolean
}

const defaultConfig: PlaygroundConfig = {
  closeOnEscape: true,
  closeOnOverlayClick: true,
  trapFocus: true,
  animation: 'scale',
  position: 'center',
  showOverlay: true,
  overlayBlur: true,
}

function generateCode(config: PlaygroundConfig): string {
  return `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from '@oxog/modalkit/react'

function MyModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        closeOnEscape={${config.closeOnEscape}}
        closeOnOverlayClick={${config.closeOnOverlayClick}}
        trapFocus={${config.trapFocus}}
      >
        <ModalPortal>
          ${config.showOverlay ? `<ModalOverlay
            className="fixed inset-0${config.overlayBlur ? ' backdrop-blur-sm' : ''}"
          />` : ''}
          <ModalContainer className="fixed inset-0 flex ${config.position === 'top' ? 'items-start pt-20' : config.position === 'bottom' ? 'items-end pb-20' : 'items-center'} justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Modal Title</ModalTitle>
              <ModalDescription>
                Your modal content here.
              </ModalDescription>
              <ModalClose>×</ModalClose>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`
}

export default function Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig)
  const [open, setOpen] = useState(false)

  const updateConfig = <K extends keyof PlaygroundConfig>(key: K, value: PlaygroundConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetConfig = () => setConfig(defaultConfig)

  const positionClasses = {
    center: 'items-center',
    top: 'items-start pt-20',
    bottom: 'items-end pb-20',
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Playground
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Customize modal behavior and see the generated code in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="border border-gray-800 rounded-xl bg-gray-900/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <h2 className="font-semibold text-white">Configuration</h2>
                </div>
                <button
                  onClick={resetConfig}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Behavior */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Behavior</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.closeOnEscape}
                        onChange={(e) => updateConfig('closeOnEscape', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-400">Close on Escape</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.closeOnOverlayClick}
                        onChange={(e) => updateConfig('closeOnOverlayClick', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-400">Close on Overlay Click</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.trapFocus}
                        onChange={(e) => updateConfig('trapFocus', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-400">Trap Focus</span>
                    </label>
                  </div>
                </div>

                {/* Overlay */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Overlay</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.showOverlay}
                        onChange={(e) => updateConfig('showOverlay', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-400">Show Overlay</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.overlayBlur}
                        onChange={(e) => updateConfig('overlayBlur', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                        disabled={!config.showOverlay}
                      />
                      <span className={config.showOverlay ? 'text-gray-400' : 'text-gray-600'}>Backdrop Blur</span>
                    </label>
                  </div>
                </div>

                {/* Animation */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Animation</h3>
                  <select
                    value={config.animation}
                    onChange={(e) => updateConfig('animation', e.target.value as AnimationType)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  >
                    <option value="none">None</option>
                    <option value="fade">Fade</option>
                    <option value="scale">Scale</option>
                    <option value="slide-up">Slide Up</option>
                    <option value="slide-down">Slide Down</option>
                  </select>
                </div>

                {/* Position */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Position</h3>
                  <div className="flex gap-2">
                    {(['top', 'center', 'bottom'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => updateConfig('position', pos)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          config.position === pos
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Button */}
            <button
              onClick={() => setOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5" />
              Preview Modal
            </button>
          </div>

          {/* Generated Code */}
          <div>
            <div className="border border-gray-800 rounded-xl bg-gray-900/50 overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="font-semibold text-white">Generated Code</h2>
              </div>
              <div className="max-h-[600px] overflow-auto">
                <CodeBlock code={generateCode(config)} language="tsx" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Preview */}
        <Modal
          open={open}
          onOpenChange={setOpen}
          closeOnEscape={config.closeOnEscape}
          closeOnOverlayClick={config.closeOnOverlayClick}
          trapFocus={config.trapFocus}
          animated={config.animation !== 'none'}
        >
          <ModalPortal>
            {config.showOverlay && (
              <ModalOverlay
                className={`fixed inset-0 bg-black/60${config.overlayBlur ? ' backdrop-blur-sm' : ''}`}
              />
            )}

            <ModalContainer className={`fixed inset-0 flex ${positionClasses[config.position]} justify-center p-4`}>
              <ModalContent className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <ModalTitle className="text-xl font-semibold text-white">
                    Preview Modal
                  </ModalTitle>
                  <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer">
                    <X className="w-5 h-5" />
                  </ModalClose>
                </div>

                <ModalDescription className="text-gray-400 mb-6">
                  This is a preview of your configured modal. Try pressing
                  Escape, clicking outside, or tabbing through the focusable
                  elements to test the behavior.
                </ModalDescription>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Test focus trap..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </ModalContent>
            </ModalContainer>
          </ModalPortal>
        </Modal>
      </div>
    </div>
  )
}
