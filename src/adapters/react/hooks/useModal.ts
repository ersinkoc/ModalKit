/**
 * useModal hook for React
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createModal } from '../../../core/modal'
import type {
  Modal,
  ModalConfig,
  ModalState,
  AnimationState,
  TriggerProps,
  OverlayProps,
  ContainerProps,
  ContentProps,
  TitleProps,
  DescriptionProps,
  CloseButtonProps,
} from '../../../types'

/**
 * Return type for useModal hook
 */
export interface UseModalReturn {
  // State
  isOpen: boolean
  animationState: AnimationState
  stackOrder: number
  isTopMost: boolean

  // Actions
  open: () => void
  close: () => void
  toggle: () => void

  // Focus
  focusFirst: () => void
  focusLast: () => void

  // Props getters
  getTriggerProps: () => TriggerProps
  getOverlayProps: () => OverlayProps
  getContainerProps: () => ContainerProps
  getContentProps: () => ContentProps
  getTitleProps: (id?: string) => TitleProps
  getDescriptionProps: (id?: string) => DescriptionProps
  getCloseButtonProps: () => CloseButtonProps

  // Modal instance (for advanced usage)
  modal: Modal
}

/**
 * Hook to create and manage a modal
 */
export function useModal(config?: ModalConfig): UseModalReturn {
  // Create modal instance once
  const modalRef = useRef<Modal | null>(null)
  const configRef = useRef<string>('')

  if (!modalRef.current) {
    modalRef.current = createModal(config)
  }

  // Track state
  const [state, setState] = useState<ModalState>(() =>
    modalRef.current!.getState()
  )

  // Update config when it changes - use string comparison to avoid reference issues
  useEffect(() => {
    const configString = JSON.stringify(config)
    if (configRef.current !== configString && config) {
      configRef.current = configString
      modalRef.current?.setConfig(config)
    }
  }, [config])

  // Handle controlled mode
  useEffect(() => {
    if (config?.open !== undefined) {
      if (config.open && !modalRef.current?.isOpen()) {
        modalRef.current?.open()
      } else if (!config.open && modalRef.current?.isOpen()) {
        modalRef.current?.close()
      }
    }
  }, [config?.open])

  // Subscribe to state changes
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    return modal.subscribe((newState) => {
      setState(newState)
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      modalRef.current?.destroy()
    }
  }, [])

  // Memoize methods
  const open = useCallback(() => modalRef.current?.open(), [])
  const close = useCallback(() => modalRef.current?.close(), [])
  const toggle = useCallback(() => modalRef.current?.toggle(), [])
  const focusFirst = useCallback(() => modalRef.current?.focusFirst(), [])
  const focusLast = useCallback(() => modalRef.current?.focusLast(), [])

  // Props getters
  const getTriggerProps = useCallback(
    () => modalRef.current!.getTriggerProps(),
    []
  )
  const getOverlayProps = useCallback(
    () => modalRef.current!.getOverlayProps(),
    []
  )
  const getContainerProps = useCallback(
    () => modalRef.current!.getContainerProps(),
    []
  )
  const getContentProps = useCallback(
    () => modalRef.current!.getContentProps(),
    []
  )
  const getTitleProps = useCallback(
    (id?: string) => modalRef.current!.getTitleProps(id),
    []
  )
  const getDescriptionProps = useCallback(
    (id?: string) => modalRef.current!.getDescriptionProps(id),
    []
  )
  const getCloseButtonProps = useCallback(
    () => modalRef.current!.getCloseButtonProps(),
    []
  )

  return useMemo(
    () => ({
      isOpen: state.open,
      animationState: state.animationState,
      stackOrder: state.stackOrder,
      isTopMost: state.isTopMost,
      open,
      close,
      toggle,
      focusFirst,
      focusLast,
      getTriggerProps,
      getOverlayProps,
      getContainerProps,
      getContentProps,
      getTitleProps,
      getDescriptionProps,
      getCloseButtonProps,
      modal: modalRef.current!,
    }),
    [
      state,
      open,
      close,
      toggle,
      focusFirst,
      focusLast,
      getTriggerProps,
      getOverlayProps,
      getContainerProps,
      getContentProps,
      getTitleProps,
      getDescriptionProps,
      getCloseButtonProps,
    ]
  )
}
