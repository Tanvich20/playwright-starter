import { Page } from '@playwright/test';

export class Login {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/practice/login.php');
  }
}
