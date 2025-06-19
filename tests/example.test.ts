import { test, expect } from '@playwright/test';
import { Login } from '../page-objects/login.po';

test('Login should succeed with valid credentials', async ({ page }) => {
  const loginPage = new Login(page);
  await loginPage.goto();
});
