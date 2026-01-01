/**
 * useConfirm hook for React
 */

import { useCallback } from 'react'
import { confirm as confirmFn } from '../../../dialogs/confirm'
import type { ConfirmOptions, ConfirmOptionsAdvanced } from '../../../types'

/**
 * Hook to show confirm dialogs
 */
export function useConfirm() {
  return useCallback(
    (
      messageOrOptions: string | ConfirmOptions | ConfirmOptionsAdvanced
    ): Promise<boolean | string> => {
      if (typeof messageOrOptions === 'string') {
        return confirmFn(messageOrOptions)
      }
      if ('buttons' in messageOrOptions && messageOrOptions.buttons) {
        return confirmFn(messageOrOptions as ConfirmOptionsAdvanced)
      }
      return confirmFn(messageOrOptions as ConfirmOptions)
    },
    []
  )
}
