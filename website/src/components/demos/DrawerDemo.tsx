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
import { X, Menu, Home, Settings, User, HelpCircle, LogOut } from 'lucide-react'

export default function DrawerDemo() {
  const [open, setOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
    }
  }, [open])

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 border border-gray-700"
      >
        <Menu className="w-5 h-5" />
        Open Drawer
      </button>

      <Modal open={open} onOpenChange={setOpen} animated>
        <ModalPortal>
          <ModalOverlay
            className="fixed inset-0 transition-opacity duration-200"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: isVisible ? 1 : 0,
            }}
          />
          <ModalContainer className="fixed inset-0">
            <ModalContent
              className="absolute left-0 top-0 bottom-0 w-80 bg-gray-900 border-r border-gray-800 shadow-2xl transition-transform duration-300"
              style={{
                backgroundColor: '#111827',
                width: '20rem',
                height: '100%',
                maxHeight: '100vh',
                borderRadius: 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <ModalTitle
                  className="text-lg font-semibold text-white"
                  style={{ color: 'white', fontSize: '1.125rem' }}
                >
                  Navigation
                </ModalTitle>
                <ModalClose className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </ModalClose>
              </div>

              <nav className="p-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          item.active
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}

export const drawerCode = `import { useState } from 'react'
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalClose,
} from '@oxog/modalkit/react'

function Drawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalPortal>
          <ModalOverlay className="fixed inset-0 bg-black/60" />
          <ModalContainer className="fixed inset-0">
            <ModalContent
              className="absolute left-0 top-0 bottom-0 w-80 bg-white"
              style={{ borderRadius: 0 }}
            >
              <ModalTitle>Menu</ModalTitle>
              <ModalClose>×</ModalClose>
              {/* Menu items */}
            </ModalContent>
          </ModalContainer>
        </ModalPortal>
      </Modal>
    </>
  )
}`
