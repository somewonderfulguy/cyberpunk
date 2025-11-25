import { test, expect } from '@playwright/test';

// Minimal smoke test that ensures the app renders something at "/"
// We keep assertions generic to avoid coupling to specific UI text.

test('homepage loads and displays body', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
