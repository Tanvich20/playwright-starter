import { Page } from 'playwright';

export async function clickButton(page: Page, selector: string): Promise<void> {
  await page.click(selector);
}

export async function verifyText(page: Page, selector: string, expected: string): Promise<boolean> {
  const text = await page.textContent(selector);
  return text === expected;
}

export async function loginWithoutPassword(page: Page) {
  await page.fill('#email', 'test@example.com');
  await page.click("input[value='Login']");
  // Suppose the app throws an error internally or fails silently
  if (!(await page.locator('.form-control error').isVisible())) {
    throw new Error('password field validation error not shown');
  }
}
