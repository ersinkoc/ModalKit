/**
 * Event emitter utilities for ModalKit
 */

import type { EventEmitter } from '../types'

/**
 * Create a typed event emitter
 */
export function createEventEmitter<
  T extends Record<string, unknown[]>
>(): EventEmitter<T> {
  const listeners = new Map<keyof T, Set<Function>>()

  function on<K extends keyof T>(
    event: K,
    handler: (...args: T[K]) => void
  ): () => void {
    if (!listeners.has(event)) {
      listeners.set(event, new Set())
    }
    listeners.get(event)!.add(handler)

    // Return unsubscribe function
    return () => off(event, handler)
  }

  function off<K extends keyof T>(
    event: K,
    handler: (...args: T[K]) => void
  ): void {
    const handlers = listeners.get(event)
    if (handlers) {
      handlers.delete(handler)
      if (handlers.size === 0) {
        listeners.delete(event)
      }
    }
  }

  function emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const handlers = listeners.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(...args)
        } catch (error) {
          console.error(`Error in event handler for "${String(event)}":`, error)
        }
      })
    }
  }

  function clear(): void {
    listeners.clear()
  }

  return { on, off, emit, clear }
}

/**
 * Create a simple subscription manager for state changes
 */
export function createSubscriptionManager<T>(): {
  subscribe: (callback: (value: T) => void) => () => void
  notify: (value: T) => void
  clear: () => void
} {
  const subscribers = new Set<(value: T) => void>()

  function subscribe(callback: (value: T) => void): () => void {
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  }

  function notify(value: T): void {
    subscribers.forEach((callback) => {
      try {
        callback(value)
      } catch (error) {
        console.error('Error in subscriber:', error)
      }
    })
  }

  function clear(): void {
    subscribers.clear()
  }

  return { subscribe, notify, clear }
}
