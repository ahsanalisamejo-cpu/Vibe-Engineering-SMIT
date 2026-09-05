import { test, expect } from '@playwright/test';

test.describe('Kanban Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the board with header and 5 default columns', async ({ page }) => {
    await expect(page.locator('.brand-title')).toHaveText('Kanban Flow');
    
    // Check 5 columns
    await expect(page.getByTestId('column-col-backlog')).toBeVisible();
    await expect(page.getByTestId('column-col-todo')).toBeVisible();
    await expect(page.getByTestId('column-col-in-progress')).toBeVisible();
    await expect(page.getByTestId('column-col-review')).toBeVisible();
    await expect(page.getByTestId('column-col-done')).toBeVisible();

    // Check dummy cards rendered
    await expect(page.getByText('Research Database Indexing Strategies')).toBeVisible();
    await expect(page.getByText('Define Design Tokens & Accessibility Guidelines')).toBeVisible();
  });

  test('should allow inline renaming of a column', async ({ page }) => {
    const backlogBtn = page.getByTestId('column-title-btn-col-backlog');
    await backlogBtn.click();

    const input = page.getByTestId('column-title-input-col-backlog');
    await expect(input).toBeVisible();

    await input.fill('Icebox Tasks');
    await input.press('Enter');

    await expect(page.getByTestId('column-col-backlog')).toContainText('Icebox Tasks');
  });

  test('should add a new card to a column via the modal dialog', async ({ page }) => {
    const addBtn = page.getByTestId('add-card-btn-col-todo');
    await addBtn.click();

    const modal = page.getByTestId('add-card-modal');
    await expect(modal).toBeVisible();

    await page.getByTestId('card-title-input').fill('Implement E2E Integration Suite');
    await page.getByTestId('card-details-input').fill('Playwright test coverage for all user flows.');
    await page.getByTestId('modal-submit-btn').click();

    await expect(modal).not.toBeVisible();
    await expect(page.getByTestId('column-col-todo')).toContainText('Implement E2E Integration Suite');
    await expect(page.getByTestId('column-col-todo')).toContainText('Playwright test coverage for all user flows.');
  });

  test('should delete an existing card when delete button is clicked', async ({ page }) => {
    const cardTitle = 'Research Database Indexing Strategies';
    await expect(page.getByText(cardTitle)).toBeVisible();

    const deleteBtn = page.getByTestId('delete-card-card-1');
    await deleteBtn.click();

    await expect(page.getByText(cardTitle)).not.toBeVisible();
  });

  test('should verify initial dummy cards and board statistics', async ({ page }) => {
    // 5 columns and 9 total cards initially
    await expect(page.locator('.stat-chip').first()).toContainText('5 Columns');
    await expect(page.locator('.stat-chip').nth(1)).toContainText('9 Tasks');

    // Verify card count badge on Backlog
    await expect(page.getByTestId('column-count-col-backlog')).toHaveText('2');
    await expect(page.getByTestId('column-count-col-done')).toHaveText('2');
  });
});
