import { expect, test } from "@playwright/test";

test("loads the kanban board with dummy data", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("kanban-board")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
  await expect(page.getByTestId("column-col-backlog")).toBeVisible();
  await expect(page.getByText("Research competitors")).toBeVisible();
});

test("adds a new card to a column", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("add-card-btn-col-backlog").click();
  await page.getByTestId("add-card-title").fill("E2E test card");
  await page.getByTestId("add-card-details").fill("Created by Playwright");
  await page.getByTestId("add-card-submit").click();

  await expect(page.getByText("E2E test card")).toBeVisible();
  await expect(page.getByText("Created by Playwright")).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  await page.goto("/");

  const card = page.getByTestId("card-c1");
  await expect(card).toBeVisible();
  await card.hover();
  await page.getByTestId("delete-card-c1").click();

  await expect(page.getByTestId("card-c1")).not.toBeVisible();
});

test("renames a column", async ({ page }) => {
  await page.goto("/");

  const column = page.getByTestId("column-col-done");
  await column.getByTestId("column-title").click();
  const input = column.getByTestId("column-title-input");
  await input.fill("Completed");
  await input.press("Enter");

  await expect(column.getByTestId("column-title")).toHaveText("Completed");
});

test("drags a card to another column", async ({ page }) => {
  await page.goto("/");

  const card = page.getByTestId("card-c4");
  const targetColumn = page.getByTestId("column-col-done");

  await expect(card).toBeVisible();
  await card.dragTo(targetColumn);

  await expect(targetColumn.getByTestId("card-c4")).toBeVisible();
});
