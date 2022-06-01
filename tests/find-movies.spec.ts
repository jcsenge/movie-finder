import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Find movies", () => {

  test('should get loading animation while waiting for results', async ({ page }) => {

    // Click #movie-search-input
    await page.locator('#movie-search-input').click();

    // Fill #movie-search-input
    await page.locator('#movie-search-input').fill('hello');

    // Press Enter
    await page.locator('#movie-search-input').press('Enter');

    await expect(page.locator('#loading-spinner')).toBeVisible();

  });

  test('should have movie cards with movie titles as search results', async ({ page }) => {

    test.setTimeout(120000);

    // Click #movie-search-input
    await page.locator('#movie-search-input').click();

    // Fill #movie-search-input
    await page.locator('#movie-search-input').fill('hello');

    // Press Enter
    await page.locator('#movie-search-input').press('Enter');

    await expect(page.locator('#movie-card').first().locator('#movie-title-button')).toBeVisible();

  });


  test('should open movie detail dialog when title clicked', async ({ page }) => {

    // Click #movie-search-input
    await page.locator('#movie-search-input').click();

    // Fill #movie-search-input
    await page.locator('#movie-search-input').fill('hello');

    // Press Enter
    await page.locator('#movie-search-input').press('Enter');

    await (page.locator('#movie-card').first().locator('#movie-title-button')).click();

    await expect(page.locator('#movie-details-dialog')).toBeVisible();
  });

})
