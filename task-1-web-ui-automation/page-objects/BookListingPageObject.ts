import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookListingPageObject extends BasePage {
  readonly table: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly rows: Locator;

  readonly titleHeader: Locator;
  readonly authorHeader: Locator;
  readonly publisherHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.table = page.locator('table');
    this.previousButton = page.locator('button', { hasText: 'Previous' });
    this.nextButton = page.locator('button', { hasText: 'Next' });
    this.rows = page.locator('tbody tr');

    this.titleHeader = page.locator('thead th').nth(1);
    this.authorHeader = page.locator('thead th').nth(2);
    this.publisherHeader = page.locator('thead th').nth(3);
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.table, 'Book listing table is not visible').toBeVisible();
    await expect(this.previousButton, 'Previous button is not visible').toBeVisible();
    await expect(this.nextButton, 'Next button is not visible').toBeVisible();
    await expect(this.titleHeader, 'Title header is not visible').toBeVisible();
    await expect(this.authorHeader, 'Author header is not visible').toBeVisible();
    await expect(this.publisherHeader, 'Publisher header is not visible').toBeVisible();
  }

  async clickPreviousButton(): Promise<void> {
    await this.previousButton.click();
  }

  async clickNextButton(): Promise<void> {
    await this.nextButton.click();
  }

  async clickTitleHeader(): Promise<void> {
    await this.titleHeader.click();
  }

  async clickAuthorHeader(): Promise<void> {
    await this.authorHeader.click();
  }

  async clickPublisherHeader(): Promise<void> {
    await this.publisherHeader.click();
  }

  async getNumberOfRows(): Promise<number> {
    return await this.rows.count();
  }

  async getTitles(): Promise<string[]> {
    const rows = this.rows;
    const count = await rows.count();
    const titles: string[] = [];

    for (let i = 0; i < count; i++) {
      const title = await rows.nth(i).locator('td').nth(1).textContent();
      titles.push((title ?? '').trim());
    }

    return titles;
  }

  async getAuthors(): Promise<string[]> {
    const rows = this.rows;
    const count = await rows.count();
    const authors: string[] = [];

    for (let i = 0; i < count; i++) {
      const author = await rows.nth(i).locator('td').nth(2).textContent();
      authors.push((author ?? '').trim());
    }

    return authors;
  }

  async getPublishers(): Promise<string[]> {
    const rows = this.rows;
    const count = await rows.count();
    const publishers: string[] = [];

    for (let i = 0; i < count; i++) {
      const publisher = await rows.nth(i).locator('td').nth(3).textContent();
      publishers.push((publisher ?? '').trim());
    }

    return publishers;
  }

  async clickOnRow(rowIndex: number): Promise<void> {
    await this.rows.nth(rowIndex).locator('td').nth(1).click();
  }

  async getRowData(rowIndex: number): Promise<{
    title: string;
    author: string;
    publisher: string;
  }> {
    const row = this.rows.nth(rowIndex);

    const title = ((await row.locator('td').nth(1).textContent()) ?? '').trim();
    const author = ((await row.locator('td').nth(2).textContent()) ?? '').trim();
    const publisher = ((await row.locator('td').nth(3).textContent()) ?? '').trim();

    return { title, author, publisher };
  }

  async isPreviousButtonDisabled(): Promise<boolean> {
    return await this.previousButton.isDisabled();
  }

  async isNextButtonDisabled(): Promise<boolean> {
    return await this.nextButton.isDisabled();
  }
}