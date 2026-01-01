import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(() => callback(Date.now()), 0) as unknown as number
}

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id)
}

// Mock window.getComputedStyle for scroll lock tests
const originalGetComputedStyle = window.getComputedStyle
window.getComputedStyle = (element: Element, pseudoElt?: string | null) => {
  const styles = originalGetComputedStyle(element, pseudoElt)
  return {
    ...styles,
    overflow: element === document.body ? 'auto' : styles.overflow,
    paddingRight: element === document.body ? '0px' : styles.paddingRight,
  } as CSSStyleDeclaration
}

// Helper to create a container for tests
export function createTestContainer(): HTMLDivElement {
  const container = document.createElement('div')
  container.id = 'test-container'
  document.body.appendChild(container)
  return container
}

// Helper to cleanup test container
export function cleanupTestContainer(container: HTMLElement): void {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

// Helper to wait for next tick
export function nextTick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

// Helper to wait for animation frame
export function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

// Helper to wait for specific duration
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Reset DOM after each test
afterEach(() => {
  // Clean up any modals or portals left in the DOM
  document.querySelectorAll('[data-modalkit-portal]').forEach((el) => el.remove())

  // Reset body styles
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  // Clear all timers
  vi.clearAllTimers()
})

// Use fake timers by default but allow real timers when needed
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})
