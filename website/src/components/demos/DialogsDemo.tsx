import { useState } from 'react'
import { AlertCircle, HelpCircle, MessageSquare } from 'lucide-react'

// Note: The dialogs API requires ModalProvider at the app root
// For this demo, we'll show a simplified version

export default function DialogsDemo() {
  const [result, setResult] = useState<string>('')
  const [showInfo, setShowInfo] = useState(false)

  const handleAlert = () => {
    setShowInfo(true)
    setResult('Alert shown!')
    setTimeout(() => setShowInfo(false), 2000)
  }

  const handleConfirm = () => {
    const confirmed = window.confirm('Are you sure you want to proceed with this action?')
    setResult(confirmed ? 'Confirmed!' : 'Cancelled')
  }

  const handlePrompt = () => {
    const name = window.prompt('Please enter your name:', '')
    setResult(name ? `Hello, ${name}!` : 'No name entered')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleAlert}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Alert
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          Confirm
        </button>
        <button
          onClick={handlePrompt}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Prompt
        </button>
      </div>

      {showInfo && (
        <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
          This is an alert notification!
        </div>
      )}

      {result && (
        <div className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm">
          Result: <span className="text-white font-medium">{result}</span>
        </div>
      )}
    </div>
  )
}

export const dialogsCode = `import { useAlert, useConfirm, usePrompt } from '@oxog/modalkit/react'

function DialogsExample() {
  const alert = useAlert()
  const confirm = useConfirm()
  const prompt = usePrompt()

  // Alert dialog
  const handleAlert = async () => {
    await alert({
      title: 'Information',
      message: 'This is an alert dialog.',
      variant: 'info' // 'info' | 'success' | 'warning' | 'error'
    })
  }

  // Confirm dialog - returns boolean
  const handleConfirm = async () => {
    const confirmed = await confirm({
      title: 'Confirm Action',
      message: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'No'
    })
    console.log('User confirmed:', confirmed)
  }

  // Prompt dialog - returns string or null
  const handlePrompt = async () => {
    const name = await prompt({
      title: 'Enter Name',
      message: 'Please enter your name:',
      placeholder: 'John Doe',
      required: true
    })
    if (name) {
      console.log('User entered:', name)
    }
  }

  return (
    <>
      <button onClick={handleAlert}>Show Alert</button>
      <button onClick={handleConfirm}>Show Confirm</button>
      <button onClick={handlePrompt}>Show Prompt</button>
    </>
  )
}`
