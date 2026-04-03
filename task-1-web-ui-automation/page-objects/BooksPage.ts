import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookListingPageObject } from './BookListingPageObject';
import { SearchBoxPageObject } from './SearchBoxPageObject';

export class BooksPage extends BasePage {
  readonly gotoLoginButton: Locator;
  readonly bookListingObject: BookListingPageObject;
  readonly searchBoxObject: SearchBoxPageObject;

  constructor(page: Page) {
    super(page);

    this.gotoLoginButton = page.locator('#login');
    this.searchBoxObject = new SearchBoxPageObject(page);
    this.bookListingObject = new BookListingPageObject(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demoqa.com/books');
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.gotoLoginButton, 'Go to login button is not visible').toBeVisible();
    await this.bookListingObject.pageObjectTests();
    await this.searchBoxObject.pageObjectTests();
  }

  async clickGotoLogin(): Promise<void> {
    await this.gotoLoginButton.click();
  }

  // =============================
  // Delegation methods
  // =============================

  async getNumberOfBooksInList(): Promise<number> {
    return await this.bookListingObject.getNumberOfRows();
  }

  async getBookNamesInList(): Promise<string[]> {
    return await this.bookListingObject.getTitles();
  }

  async getAuthorsInList(): Promise<string[]> {
    return await this.bookListingObject.getAuthors();
  }

  async getPublishersInList(): Promise<string[]> {
    return await this.bookListingObject.getPublishers();
  }

  async searchForBookListing(bookName: string): Promise<void> {
    this.searchBoxObject.search(bookName);
  }
}