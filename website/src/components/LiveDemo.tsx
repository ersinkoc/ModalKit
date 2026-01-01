import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import CodeBlock from './CodeBlock'

interface LiveDemoProps {
  title: string
  description?: string
  code: string
  language?: string
  children: ReactNode
}

export default function LiveDemo({
  title,
  description,
  code,
  language = 'tsx',
  children
}: LiveDemoProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50 mb-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className={clsx(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            showCode
              ? 'bg-purple-500/20 text-purple-400'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          )}
        >
          {showCode ? 'Hide Code' : 'View Code'}
        </button>
      </div>

      {/* Demo Area */}
      <div className="p-6 bg-gray-950/50">
        <div className="flex items-center justify-center min-h-[120px]">
          {children}
        </div>
      </div>

      {/* Code */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-800"
          >
            <CodeBlock code={code} language={language} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
