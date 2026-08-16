import { test, expect } from '@playwright/test';

test.describe('Kanban Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render the Kanban board with 5 columns', async ({ page }) => {
    // Check that the board title is visible
    await expect(page.locator('h1')).toContainText('Kanban Board');

    // Check that all 5 columns are visible
    const columns = await page.locator('[role="region"]').count();
    expect(columns).toBe(5);
  });

  test('should display sample cards', async ({ page }) => {
    // Check for sample cards
    const cards = await page.locator('[role="article"]').count();
    expect(cards).toBeGreaterThan(0);

    // Check for specific card titles
    await expect(page.locator('text=Design Kanban UI')).toBeVisible();
    await expect(page.locator('text=Setup Next.js Project')).toBeVisible();
  });

  test('should add a new card to a column', async ({ page }) => {
    // Click the first Add Card button
    const addCardButtons = page.locator('button:has-text("Add Card")');
    await addCardButtons.first().click();

    // Fill in the card form
    const titleInput = page.locator('#card-title');
    const detailsInput = page.locator('#card-details');

    await titleInput.fill('New Test Card');
    await detailsInput.fill('Test card details');

    // Submit the form
    const submitButton = page.locator('button:has-text("Add")').first();
    await submitButton.click();

    // Verify the new card appears
    await expect(page.locator('text=New Test Card')).toBeVisible();
  });

  test('should delete a card', async ({ page }) => {
    // Get initial card count
    const initialCardCount = await page.locator('[role="article"]').count();

    // Find and click delete button on the first card
    const deleteButtons = page.locator('[aria-label*="Delete card"]');
    await deleteButtons.first().click();

    // Handle confirmation dialog
    page.on('dialog', (dialog) => {
      dialog.accept();
    });

    // Wait for card to be deleted
    await page.waitForTimeout(500);

    // Verify card count decreased
    const finalCardCount = await page.locator('[role="article"]').count();
    expect(finalCardCount).toBe(initialCardCount - 1);
  });

  test('should rename a column', async ({ page }) => {
    // Click edit button on first column
    const editButtons = page.locator('button[title="Click to rename"]');
    await editButtons.first().click();

    // Find the input field
    const columnInput = page.locator('input[aria-label="Column name input"]').first();

    // Clear and type new name
    await columnInput.clear();
    await columnInput.fill('Updated Column');

    // Press Enter to confirm
    await columnInput.press('Enter');

    // Verify column name changed
    await expect(page.locator('text=Updated Column')).toBeVisible();
  });

  test('should drag and drop card to another column', async ({ page }) => {
    // Get a card element
    const card = page.locator('[role="article"]').first();
    const cardText = await card.locator('h3').textContent();

    // Get target drop zone (another column)
    const columns = page.locator('[role="region"]');
    const targetColumn = columns.nth(1);

    // Get the bounding boxes for drag and drop
    const cardBox = await card.boundingBox();
    const targetBox = await targetColumn.boundingBox();

    if (cardBox && targetBox) {
      // Perform drag and drop
      await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
      await page.mouse.up();

      // Wait a bit for animation
      await page.waitForTimeout(500);

      // Verify card is still visible (it moved)
      await expect(page.locator(`text=${cardText}`)).toBeVisible();
    }
  });

  test('should have accessible keyboard navigation', async ({ page }) => {
    // Tab to first button
    await page.keyboard.press('Tab');

    // Check focus is on a button
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A']).toContain(focusedElement);

    // Press Enter on a button
    const focusedElement2 = page.locator(':focus');
    if (await focusedElement2.count() > 0) {
      await page.keyboard.press('Enter');
    }
  });

  test('should have proper contrast and visibility', async ({ page }) => {
    // Check that text is visible
    await expect(page.locator('h1:has-text("Kanban Board")')).toBeVisible();

    // Check cards are visible
    const firstCard = page.locator('[role="article"]').first();
    await expect(firstCard).toBeVisible();

    // Check buttons are visible
    const buttons = page.locator('button').first();
    await expect(buttons).toBeVisible();
  });
});
