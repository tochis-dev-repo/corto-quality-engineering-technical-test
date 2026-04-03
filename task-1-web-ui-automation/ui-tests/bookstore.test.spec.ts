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