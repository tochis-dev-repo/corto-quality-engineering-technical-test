import { Page } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    // Default navigation method
  }

  async pageObjectTests(): Promise<void> {
    // Default: page object validation method
  }
}