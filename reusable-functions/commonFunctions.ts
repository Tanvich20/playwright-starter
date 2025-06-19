import { Page } from 'playwright';

export async function waitForSelector(page: Page, selector: string) {
  await page.waitForSelector(selector, { timeout: 5000 });
}
