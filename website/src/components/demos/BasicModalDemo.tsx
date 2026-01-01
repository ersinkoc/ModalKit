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
import { X } from 'lucide-react'

export default function BasicModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
      >
        Open Modal
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          />
          <ModalContainer className="fixed inset-0 flex items-center justify-center p-4">
            <ModalContent
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6"
              style={{ backgroundColor: '#111827', maxWidth: '28rem' }}
            >
              <div className="flex items-center justify-between mb-4">
                <ModalTitle
                  className="text-xl font-semibold text-white"
                  style={{ color: 'white', fontSize: '1.25rem' }}
                >
                  Welcome to ModalKit
                </ModalTitle>
                <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </ModalClose>
              </div>

              <ModalDescription
                className="text-gray-400 mb-6"
                style={{ color: '#9ca3af' }}
              >
                This is a fully accessible modal built with ModalKit. It includes
                focus trapping, keyboard navigation, and proper ARIA attributes.
              </ModalDescription>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                >
                  Got it!
                </button>
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}

export const basicModalCode = `import { useState } from 'react'
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

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Welcome</ModalTitle>
              <ModalDescription>
                This is a fully accessible modal.
              </ModalDescription>
              <ModalClose>×</ModalClose>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`
