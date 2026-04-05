import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookDetailsPage extends BasePage {
  private readonly labelLocatorText = '#userName-value';

  readonly isbnWrapper: Locator;
  readonly titleWrapper: Locator;
  readonly subTitleWrapper: Locator;
  readonly authorWrapper: Locator;
  readonly publisherWrapper: Locator;
  readonly pagesWrapper: Locator;
  readonly descriptionWrapper: Locator;
  readonly websiteWrapper: Locator;

  readonly isbnValue: Locator;
  readonly titleValue: Locator;
  readonly subTitleValue: Locator;
  readonly authorValue: Locator;
  readonly publisherValue: Locator;
  readonly pagesValue: Locator;
  readonly descriptionValue: Locator;
  readonly websiteValue: Locator;

  readonly BackToBookStoreButton: Locator;

  constructor(page: Page) {
    super(page);

    this.isbnWrapper = page.locator('#ISBN-wrapper');
    this.titleWrapper = page.locator('#title-wrapper');
    this.subTitleWrapper = page.locator('#subtitle-wrapper');
    this.authorWrapper = page.locator('#author-wrapper');
    this.publisherWrapper = page.locator('#publisher-wrapper');
    this.pagesWrapper = page.locator('#pages-wrapper');
    this.descriptionWrapper = page.locator('#description-wrapper');
    this.websiteWrapper = page.locator('#website-wrapper');

    this.isbnValue = this.isbnWrapper.locator(this.labelLocatorText);
    this.titleValue = this.titleWrapper.locator(this.labelLocatorText);
    this.subTitleValue = this.subTitleWrapper.locator(this.labelLocatorText);
    this.authorValue = this.authorWrapper.locator(this.labelLocatorText);
    this.publisherValue = this.publisherWrapper.locator(this.labelLocatorText);
    this.pagesValue = this.pagesWrapper.locator(this.labelLocatorText);
    this.descriptionValue = this.descriptionWrapper.locator(this.labelLocatorText);
    this.websiteValue = this.websiteWrapper.locator(this.labelLocatorText);

    this.BackToBookStoreButton = page.locator('button', { hasText: 'Back to Book Store' });
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.isbnValue, 'ISBN value is not visible').toBeVisible();
    await expect(this.titleValue, 'Title value is not visible').toBeVisible();
    await expect(this.subTitleValue, 'Subtitle value is not visible').toBeVisible();
    await expect(this.authorValue, 'Author value is not visible').toBeVisible();
    await expect(this.publisherValue, 'Publisher value is not visible').toBeVisible();
    await expect(this.pagesValue, 'Pages value is not visible').toBeVisible();
    await expect(this.descriptionValue, 'Description value is not visible').toBeVisible();
    await expect(this.websiteValue, 'Website value is not visible').toBeVisible();
    await expect(this.BackToBookStoreButton, 'Back to book store button is not visible').toBeVisible();
  }

  async getIsbn(): Promise<string> {
    return ((await this.isbnValue.textContent()) ?? '').trim();
  }

  async getTitle(): Promise<string> {
    return ((await this.titleValue.textContent()) ?? '').trim();
  }

  async getSubTitle(): Promise<string> {
    return ((await this.subTitleValue.textContent()) ?? '').trim();
  }

  async getAuthor(): Promise<string> {
    return ((await this.authorValue.textContent()) ?? '').trim();
  }

  async getPublisher(): Promise<string> {
    return ((await this.publisherValue.textContent()) ?? '').trim();
  }

  async getPages(): Promise<string> {
    return ((await this.pagesValue.textContent()) ?? '').trim();
  }

  async getDescription(): Promise<string> {
    return ((await this.descriptionValue.textContent()) ?? '').trim();
  }

  async getWebsite(): Promise<string> {
    return ((await this.websiteValue.textContent()) ?? '').trim();
  }

  async getBookDetails(): Promise<{
    isbn: string;
    title: string;
    subTitle: string;
    author: string;
    publisher: string;
    pages: string;
    description: string;
    website: string;
  }> {
    return {
      isbn: await this.getIsbn(),
      title: await this.getTitle(),
      subTitle: await this.getSubTitle(),
      author: await this.getAuthor(),
      publisher: await this.getPublisher(),
      pages: await this.getPages(),
      description: await this.getDescription(),
      website: await this.getWebsite(),
    };
  }
}