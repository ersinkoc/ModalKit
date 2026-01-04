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
import { X, Layers } from 'lucide-react'

function NestedModal({ level }: { level: number }) {
  const [open, setOpen] = useState(false)

  const colors = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600'
  ]
  const bgColors = [
    'border-purple-500/30',
    'border-blue-500/30',
    'border-green-500/30',
    'border-orange-500/30'
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 bg-gradient-to-r ${colors[level % colors.length]} text-white rounded-lg transition-all flex items-center gap-2 cursor-pointer`}
      >
        <Layers className="w-4 h-4" />
        {level === 0 ? 'Open Stacked Modals' : `Open Level ${level + 1}`}
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/40" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center p-4">
            <ModalContent
              className={`bg-gray-900 border ${bgColors[level % bgColors.length]} rounded-2xl shadow-2xl w-full max-w-md p-6`}
              style={{ marginTop: level * 20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <ModalTitle className="text-xl font-semibold text-white">
                  Modal Level {level + 1}
                </ModalTitle>
                <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </ModalClose>
              </div>

              <ModalDescription className="text-gray-400 mb-6">
                This is modal level {level + 1}. ModalKit handles stacking automatically,
                managing z-index, focus, and keyboard navigation for each layer.
              </ModalDescription>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                {level < 3 && (
                  <NestedModal level={level + 1} />
                )}
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}

export default function StackingDemo() {
  return <NestedModal level={0} />
}

export const stackingCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'

function NestedModal({ level }: { level: number }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Level {level + 1}
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/40" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6">
              <ModalTitle>Modal Level {level + 1}</ModalTitle>

              {level < 3 && <NestedModal level={level + 1} />}
              <ModalClose>Close</ModalClose>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`
