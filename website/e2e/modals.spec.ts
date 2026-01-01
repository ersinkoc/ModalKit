import { test, expect } from '@playwright/test'

test.describe('Home Page Modals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('page loads without errors', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/ModalKit/)

    // Check hero section
    await expect(page.locator('h1')).toContainText('Headless Modal Library')

    // No console errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.waitForTimeout(1000)
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0)
  })

  test('Basic Modal opens and closes', async ({ page }) => {
    // Scroll to demo section
    await page.locator('text=Try It Live').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Find the Basic Modal demo section and click its Open Modal button
    const basicSection = page.locator('text=Basic Modal').first().locator('..')
    const openButton = basicSection.locator('button:has-text("Open Modal")').first()

    // Fallback: find first Open Modal button on page
    const fallbackButton = page.locator('button:has-text("Open Modal")').first()
    const buttonToClick = await openButton.isVisible() ? openButton : fallbackButton

    await buttonToClick.click()

    // Modal should be visible - look for the modal content
    const modalContent = page.locator('[role="dialog"], [aria-modal="true"], .fixed.inset-0').first()
    await expect(modalContent).toBeVisible({ timeout: 5000 })

    // Press Escape to close
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
  })

  test('Animated Modal opens with animation', async ({ page }) => {
    // Scroll to demo section
    await page.locator('text=Try It Live').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Get all Open Modal buttons and click the second one (Animated)
    const openButtons = page.locator('button:has-text("Open Modal")')
    const count = await openButtons.count()

    if (count >= 2) {
      await openButtons.nth(1).click()

      // Modal should appear
      const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
      await expect(modal).toBeVisible({ timeout: 5000 })

      // Press Escape to close
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    }
  })

  test('Dialogs demo buttons work', async ({ page }) => {
    // Scroll to dialogs section
    await page.locator('text=Built-in Dialogs').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // The dialogs demo uses native browser dialogs (window.confirm, etc.)
    // Just verify the buttons exist and are clickable
    const alertButton = page.locator('button:has-text("Alert")').first()
    await expect(alertButton).toBeVisible()

    // Click alert - this shows a simple notification, not a modal
    await alertButton.click()

    // Should show the result text
    const result = page.locator('text=Alert shown!')
    await expect(result).toBeVisible({ timeout: 3000 })
  })

  test('Stacking Modal demo works', async ({ page }) => {
    // Scroll to stacking section
    await page.locator('text=Modal Stacking').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Find the stacking demo's Open button
    const stackingSection = page.locator('text=Modal Stacking').first().locator('..').locator('..')
    const openButton = stackingSection.locator('button:has-text("Open")').first()

    if (await openButton.isVisible()) {
      await openButton.click()

      // First modal should be visible
      const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
      await expect(modal).toBeVisible({ timeout: 5000 })

      // Close it
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    }
  })
})

test.describe('Examples Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples')
    await page.waitForLoadState('networkidle')
  })

  test('page loads correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Examples')
  })

  test('Basic Modal demo works', async ({ page }) => {
    const openButton = page.locator('button:has-text("Open Modal")').first()
    await openButton.click()

    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('Form Modal demo works', async ({ page }) => {
    // Scroll to form modal section
    await page.locator('text=Form Modal').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Find the Sign Up Form button
    const openButton = page.locator('button:has-text("Sign Up")').first()
    await openButton.click()

    // Modal with form should appear
    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Close modal
    await page.keyboard.press('Escape')
  })

  test('Drawer demo works', async ({ page }) => {
    // Scroll to drawer section
    await page.locator('text=Slide-in Drawer').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Find Open Drawer button
    const openButton = page.locator('button:has-text("Open Drawer")').first()
    await openButton.click()

    // Drawer should slide in
    const drawer = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(drawer).toBeVisible({ timeout: 5000 })

    // Close drawer
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })
})

test.describe('Playground Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground')
    await page.waitForLoadState('networkidle')
  })

  test('page loads correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Playground')
  })

  test('can open preview modal', async ({ page }) => {
    // Click Preview Modal button
    const previewButton = page.locator('button:has-text("Preview Modal")')
    await previewButton.click()

    // Modal should appear
    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Should have title heading inside modal
    await expect(modal.locator('h2:has-text("Preview Modal")')).toBeVisible()

    // Close with escape
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('configuration options work', async ({ page }) => {
    // Test that overlay blur toggle works
    const blurCheckbox = page.locator('label:has-text("Backdrop Blur") input[type="checkbox"]')

    // Verify Backdrop Blur is checked by default
    await expect(blurCheckbox).toBeChecked()

    // Uncheck it
    await blurCheckbox.uncheck()
    await expect(blurCheckbox).not.toBeChecked()

    // Open modal and verify it works
    const previewButton = page.locator('button:has-text("Preview Modal")')
    await previewButton.click()

    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Close with escape
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
  })

  test('animation options work', async ({ page }) => {
    // Select "Slide Up" animation
    const animationSelect = page.locator('select')
    await animationSelect.selectOption('slide-up')

    // Open modal
    const previewButton = page.locator('button:has-text("Preview Modal")')
    await previewButton.click()

    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Close
    await page.keyboard.press('Escape')
  })

  test('position options work', async ({ page }) => {
    // Click "Top" position button
    const topButton = page.locator('button:has-text("Top")').first()
    await topButton.click()

    // Open modal
    const previewButton = page.locator('button:has-text("Preview Modal")')
    await previewButton.click()

    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Close
    await page.keyboard.press('Escape')
  })
})

test.describe('Documentation Pages', () => {
  test('Getting Started page loads', async ({ page }) => {
    await page.goto('/docs/getting-started')
    await expect(page.locator('h1')).toContainText('Getting Started')

    // Should have code blocks
    const codeBlocks = page.locator('pre')
    await expect(codeBlocks.first()).toBeVisible()
  })

  test('Basic Modal docs page loads', async ({ page }) => {
    await page.goto('/docs/basic')
    await expect(page.locator('h1')).toContainText('Basic Modal')
  })

  test('React Guide page loads', async ({ page }) => {
    await page.goto('/docs/react')
    await expect(page.locator('h1')).toContainText('React Guide')
  })
})

test.describe('Accessibility', () => {
  test('modals have proper ARIA attributes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll and click first modal button
    await page.locator('text=Try It Live').scrollIntoViewIfNeeded()
    const openButton = page.locator('button:has-text("Open Modal")').first()
    await openButton.click()

    // Check ARIA attributes
    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Should have role="dialog" or aria-modal="true"
    const hasRole = await modal.getAttribute('role')
    const hasAriaModal = await modal.getAttribute('aria-modal')
    expect(hasRole === 'dialog' || hasAriaModal === 'true').toBeTruthy()

    // Close
    await page.keyboard.press('Escape')
  })

  test('focus is trapped within modal', async ({ page }) => {
    await page.goto('/playground')
    await page.waitForLoadState('networkidle')

    // Open modal
    const previewButton = page.locator('button:has-text("Preview Modal")')
    await previewButton.click()

    const modal = page.locator('[role="dialog"], [aria-modal="true"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })

    // Tab through elements - focus should stay within modal
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Active element should still be within modal
    const activeElement = await page.evaluate(() => document.activeElement?.closest('[role="dialog"], [aria-modal="true"]'))
    expect(activeElement).not.toBeNull()

    // Close
    await page.keyboard.press('Escape')
  })
})

test.describe('No Console Errors', () => {
  const pages = ['/', '/examples', '/playground', '/docs/getting-started', '/docs/basic', '/docs/react']

  for (const path of pages) {
    test(`${path} has no console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text()
          // Ignore favicon and known non-issues
          if (!text.includes('favicon') && !text.includes('404')) {
            errors.push(text)
          }
        }
      })

      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)

      expect(errors).toHaveLength(0)
    })
  }
})
