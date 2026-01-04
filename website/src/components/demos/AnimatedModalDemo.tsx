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
import { X, Sparkles } from 'lucide-react'

export default function AnimatedModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-5 h-5" />
        Animated Modal
      </button>

      <Modal open={open} onOpenChange={setOpen} animated>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center p-4">
            <ModalContent className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <ModalTitle className="text-xl font-semibold text-white">
                  Smooth Animations
                </ModalTitle>
                <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </ModalClose>
              </div>

              <ModalDescription className="text-gray-400 mb-6">
                This modal uses smooth CSS transitions for animations.
              </ModalDescription>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all cursor-pointer"
                >
                  Beautiful!
                </button>
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}

export const animatedModalCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'
import { motion, AnimatePresence } from 'framer-motion'

function AnimatedModal() {
  const [open, setOpen] = useState(false)

  // For CSS transitions, you can use the animated prop
  // and apply transition classes to your components

  // Or use Framer Motion with a wrapper:
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <Modal open={open} onOpenChange={setOpen} animated>
        <AnimatePresence>
          {open && (
            <ModalPortal>
              {/* Wrap in motion.div for animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ModalOverlay className="fixed inset-0 bg-black/60" />
              </motion.div>

              <ModalContainer className="fixed inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25 }}
                >
                  <ModalContent className="bg-white rounded-xl p-6">
                    <ModalTitle>Animated Modal</ModalTitle>
                    <ModalClose>×</ModalClose>
                  </ModalContent>
                </motion.div>
              </ModalContainer>
            </ModalPortal>
          )}
        </AnimatePresence>
      </Modal>
    </>
  )
}`
