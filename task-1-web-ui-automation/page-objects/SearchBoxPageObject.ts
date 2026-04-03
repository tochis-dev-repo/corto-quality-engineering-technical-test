import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchBoxPageObject extends BasePage {
  readonly searchBoxContainer: Locator;
  readonly searchTextBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.searchBoxContainer = page.locator('.input-group');
    this.searchTextBox = this.searchBoxContainer.locator('#searchBox');
    this.searchButton = this.searchBoxContainer.locator('button');
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.searchTextBox).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async search(text: string): Promise<void> {
    await this.searchTextBox.fill(text);
    await this.searchButton.click();
  }

  async clear(): Promise<void> {
    await this.searchTextBox.clear();
  }

  async getValue(): Promise<string> {
    return await this.searchTextBox.inputValue();
  }
}