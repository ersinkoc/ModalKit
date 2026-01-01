/**
 * Imperative modals API for React
 *
 * Note: This requires the ModalProvider to be mounted in the app.
 * For standalone usage without React context, use the core
 * confirm(), alert(), prompt() functions from '@oxog/modalkit'.
 */

import { confirm as coreConfirm } from '../../../dialogs/confirm'
import { alert as coreAlert } from '../../../dialogs/alert'
import { prompt as corePrompt } from '../../../dialogs/prompt'
import type {
  ConfirmOptions,
  ConfirmOptionsAdvanced,
  AlertOptions,
  PromptOptions,
} from '../../../types'

/**
 * Show a confirm dialog
 */
function confirm(message: string): Promise<boolean>
function confirm(options: ConfirmOptions): Promise<boolean>
function confirm(options: ConfirmOptionsAdvanced): Promise<string | boolean>
function confirm(
  messageOrOptions: string | ConfirmOptions | ConfirmOptionsAdvanced
): Promise<boolean | string> {
  if (typeof messageOrOptions === 'string') {
    return coreConfirm(messageOrOptions)
  }
  if ('buttons' in messageOrOptions && messageOrOptions.buttons) {
    return coreConfirm(messageOrOptions as ConfirmOptionsAdvanced)
  }
  return coreConfirm(messageOrOptions as ConfirmOptions)
}

/**
 * Show an alert dialog
 */
function alert(message: string): Promise<void>
function alert(options: AlertOptions): Promise<void>
function alert(messageOrOptions: string | AlertOptions): Promise<void> {
  if (typeof messageOrOptions === 'string') {
    return coreAlert(messageOrOptions)
  }
  return coreAlert(messageOrOptions)
}

/**
 * Show a prompt dialog
 */
function prompt(message: string): Promise<string | null>
function prompt(options: PromptOptions): Promise<string | null>
function prompt(messageOrOptions: string | PromptOptions): Promise<string | null> {
  if (typeof messageOrOptions === 'string') {
    return corePrompt(messageOrOptions)
  }
  return corePrompt(messageOrOptions)
}

/**
 * Imperative modals API
 *
 * These functions use the core implementation and work without React context.
 * They render dialogs directly to the DOM.
 */
export const modals = {
  confirm,
  alert,
  prompt,
}
