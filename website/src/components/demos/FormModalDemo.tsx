import { useState, useEffect } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'
import { X, User, Mail, Lock, Send } from 'lucide-react'

export default function FormModalDemo() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setFormData({ name: '', email: '', password: '' })
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        Sign Up Form
      </button>

      <Modal open={open} onOpenChange={setOpen} animated>
        <ModalPortal>
          <ModalOverlay
            className="fixed inset-0 backdrop-blur-sm transition-opacity duration-200"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: isVisible ? 1 : 0,
            }}
          />
          <ModalContainer className="fixed inset-0 flex items-center justify-center p-4">
            <ModalContent
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-200"
              style={{
                backgroundColor: '#111827',
                maxWidth: '28rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <ModalTitle
                  className="text-xl font-semibold text-white"
                  style={{ color: 'white', fontSize: '1.25rem' }}
                >
                  Create Account
                </ModalTitle>
                <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </ModalClose>
              </div>

              {submitted ? (
                <div className="p-8 text-center">
                  <div
                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      animation: 'scale-in 0.3s ease-out',
                    }}
                  >
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Account Created!</h3>
                  <p className="text-gray-400">Welcome, {formData.name}!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all font-medium"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              )}
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}

export const formModalCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'

function SignUpModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Sign Up</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0 flex items-center justify-center">
            <ModalContent className="bg-white rounded-xl p-6 max-w-md">
              <ModalTitle>Create Account</ModalTitle>
              <ModalClose>×</ModalClose>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
                <button type="submit">Create Account</button>
              </form>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`
