/**
 * usePrompt hook for React
 */

import { useCallback } from 'react'
import { prompt as promptFn } from '../../../dialogs/prompt'
import type { PromptOptions } from '../../../types'

/**
 * Hook to show prompt dialogs
 */
export function usePrompt() {
  return useCallback(
    (messageOrOptions: string | PromptOptions): Promise<string | null> => {
      if (typeof messageOrOptions === 'string') {
        return promptFn(messageOrOptions)
      }
      return promptFn(messageOrOptions)
    },
    []
  )
}
