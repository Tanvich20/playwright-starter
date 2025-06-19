import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://www.tutorialspoint.com/selenium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    channel: 'chrome',
    trace: 'on', // or 'on-first-retry'
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]]
});
