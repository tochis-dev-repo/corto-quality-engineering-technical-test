import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly gotoUserRegistrationButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.gotoUserRegistrationButton = page.locator('#newUser');
  }

  async goto(): Promise<void> {
    const baseUrl = process.env.BASE_URL ?? 'https://demoqa.com';
    await this.page.goto(`${baseUrl}/login`);
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.usernameInput, 'Username input is not visible').toBeVisible();
    await expect(this.passwordInput, 'Password input is not visible').toBeVisible();
    await expect(this.loginButton, 'Login button is not visible').toBeVisible();
    await expect(this.gotoUserRegistrationButton, 'Go to user registration button is not visible').toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}