import {test, expect} from '@playwright/test';
import { BooksPage } from '../page-objects/BooksPage';
import { LoginPage } from '../page-objects/LoginPage';
import { BookDetailsPage } from '../page-objects/BookDetailsPage';
import { validDataSet, invalidDataSet } from '../test-data/book-list-test-data';

test.describe('Book Store Basic Functionality', () => {
    test('search for a valid book title and validate results', async ({ page }) => {
        const test_book_title = validDataSet[0].title;
        const booksPage = new BooksPage(page);
        await booksPage.goto();
        await booksPage.searchBoxObject.search(test_book_title);
        await booksPage.bookListingObject.getRowData(0).then(rowData => {
            expect(rowData.title).toBe(test_book_title);
        });
    });
    test('search for an invalid book title and validate that no results are displayed', async ({ page }) => {
        const test_book_title = invalidDataSet[0].title;
        const booksPage = new BooksPage(page);
        await booksPage.goto();
        await booksPage.searchBoxObject.search(test_book_title);
        await expect(booksPage.bookListingObject.getNumberOfRows()).resolves.toBe(0);
    });
    test('Select a book from the list and validate that the correct book details are displayed', async ({ page }) => {
        const test_book_title = validDataSet[0].title;
        const test_book_author = validDataSet[0].author;
        const test_book_publisher = validDataSet[0].publisher;
        const booksPage = new BooksPage(page);
        await booksPage.goto();
        await booksPage.searchBoxObject.search(test_book_title);
        await booksPage.bookListingObject.clickOnRow(0);
        const bookDetailsPage = new BookDetailsPage(page);
        bookDetailsPage.pageObjectTests();
        const bookDetailsTitle = await bookDetailsPage.getTitle();
        const bookDetailsAuthor = await bookDetailsPage.getAuthor();
        const bookDetailsPublisher = await bookDetailsPage.getPublisher();
        await expect(bookDetailsTitle).toBe(test_book_title);
        await expect(bookDetailsAuthor).toBe(test_book_author);
        await expect(bookDetailsPublisher).toBe(test_book_publisher);
    });
    test('Ensure that every book listed has a title, author, and publisher displayed', async ({ page }) => {
        const booksPage = new BooksPage(page);
        await booksPage.goto();
        await booksPage.bookListingObject.pageObjectTests();
        const numberOfBooks = await booksPage.getNumberOfBooksInList();
        for (let i = 0; i < numberOfBooks; i++) {
            const rowData = await booksPage.bookListingObject.getRowData(i);
            await expect(rowData.title, `Book ${i + 1} does not have a title`).toBeTruthy();
            await expect(rowData.author, `Book ${i + 1} does not have an author`).toBeTruthy();
            await expect(rowData.publisher, `Book ${i + 1} does not have a publisher`).toBeTruthy();
        }
    });
    test('Ensure title header click changes the sorting order of the book list by title', async ({ page }) => {
        const booksPage = new BooksPage(page);
        await booksPage.goto();

        const initialTitles = await booksPage.getBookNamesInList();

        await booksPage.bookListingObject.clickTitleHeader();

        const firstClickTitles = await booksPage.getBookNamesInList();
        const firstClickOrder = getSortOrder(firstClickTitles);

        expect(firstClickOrder).toBe('ascending');
        expect(firstClickTitles).not.toEqual(initialTitles);

        await booksPage.bookListingObject.clickTitleHeader();

        const secondClickTitles = await booksPage.getBookNamesInList();
        const secondClickOrder = getSortOrder(secondClickTitles);

        expect(secondClickOrder).toBe('descending');
        });
    test('Ensure author header click changes the sorting order of the book list by author', async ({ page }) => {
        const booksPage = new BooksPage(page);
        await booksPage.goto();

        const initialAuthors = await booksPage.getAuthorsInList();

        await booksPage.bookListingObject.clickAuthorHeader();

        const firstClickAuthors = await booksPage.getAuthorsInList();
        const firstClickOrder = getSortOrder(firstClickAuthors);

        expect(firstClickOrder).toBe('ascending');
        expect(firstClickAuthors).not.toEqual(initialAuthors);

        await booksPage.bookListingObject.clickAuthorHeader();

        const secondClickAuthors = await booksPage.getAuthorsInList();
        const secondClickOrder = getSortOrder(secondClickAuthors);

        expect(secondClickOrder).toBe('descending');
        });
    test('Ensure publisher header click changes the sorting order of the book list by publisher', async ({ page }) => {
        const booksPage = new BooksPage(page);
        await booksPage.goto();

        const initialPublishers = await booksPage.getPublishersInList();

        await booksPage.bookListingObject.clickPublisherHeader();

        const firstClickPublishers = await booksPage.getPublishersInList();
        const firstClickOrder = getSortOrder(firstClickPublishers);

        expect(firstClickOrder).toBe('ascending');
        expect(firstClickPublishers).not.toEqual(initialPublishers);

        await booksPage.bookListingObject.clickPublisherHeader();

        const secondClickPublishers = await booksPage.getPublishersInList();
        const secondClickOrder = getSortOrder(secondClickPublishers);

        expect(secondClickOrder).toBe('descending');
    });
});


test.describe('Book Store Go To Login Functionality', () => {
    test('click on the login button and validate that the user is navigated to the login page', async ({ page }) => {
        const booksPage = new BooksPage(page);
        const loginPage = new LoginPage(page);
        await booksPage.goto();
        await booksPage.clickGotoLogin();
        await loginPage.pageObjectTests();
    });
});

function isAscending(values: string[]): boolean {
  const sorted = [...values].sort((a, b) => a.localeCompare(b));
  return JSON.stringify(values) === JSON.stringify(sorted);
}

function isDescending(values: string[]): boolean {
  const sorted = [...values].sort((a, b) => b.localeCompare(a));
  return JSON.stringify(values) === JSON.stringify(sorted);
}

function getSortOrder(values: string[]): 'ascending' | 'descending' | 'default' {
  if (isAscending(values)) {
    return 'ascending';
  }

  if (isDescending(values)) {
    return 'descending';
  }

  return 'default';
}
