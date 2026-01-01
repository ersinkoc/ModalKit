import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Github, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documentation', href: '/docs/getting-started' },
  { name: 'Examples', href: '/examples' },
  { name: 'Playground', href: '/playground' },
]

const sidebarNav = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/docs/getting-started' },
      { name: 'Basic Modal', href: '/docs/basic' },
    ],
  },
  {
    title: 'Features',
    items: [
      { name: 'Dialogs', href: '/docs/dialogs' },
      { name: 'Stacking', href: '/docs/stacking' },
      { name: 'Focus Management', href: '/docs/focus' },
      { name: 'Animation', href: '/docs/animation' },
      { name: 'Accessibility', href: '/docs/accessibility' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { name: 'API Reference', href: '/docs/api' },
      { name: 'React Guide', href: '/docs/react' },
    ],
  },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isDocsPage = location.pathname.startsWith('/docs')

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold text-white">ModalKit</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      location.pathname === item.href ||
                        (item.href !== '/' && location.pathname.startsWith(item.href))
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ersinkoc/modalkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                type="button"
                className="md:hidden text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        {isDocsPage && (
          <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
            <nav className="p-6 space-y-8">
              {sidebarNav.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx(
                            'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
                            location.pathname === item.href
                              ? 'bg-primary-600/20 text-primary-400'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          )}
                        >
                          <ChevronRight className="w-4 h-4" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className={clsx('flex-1 min-w-0', isDocsPage ? 'lg:pl-0' : '')}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>MIT License © {new Date().getFullYear()} Ersin KOÇ</p>
          <p className="mt-2">
            <a
              href="https://github.com/ersinkoc/modalkit"
              className="text-primary-400 hover:text-primary-300"
            >
              GitHub
            </a>
            {' • '}
            <a
              href="https://www.npmjs.com/package/@oxog/modalkit"
              className="text-primary-400 hover:text-primary-300"
            >
              npm
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
