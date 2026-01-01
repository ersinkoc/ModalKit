/**
 * useAlert hook for React
 */

import { useCallback } from 'react'
import { alert as alertFn } from '../../../dialogs/alert'
import type { AlertOptions } from '../../../types'

/**
 * Hook to show alert dialogs
 */
export function useAlert() {
  return useCallback(
    (messageOrOptions: string | AlertOptions): Promise<void> => {
      if (typeof messageOrOptions === 'string') {
        return alertFn(messageOrOptions)
      }
      return alertFn(messageOrOptions)
    },
    []
  )
}
