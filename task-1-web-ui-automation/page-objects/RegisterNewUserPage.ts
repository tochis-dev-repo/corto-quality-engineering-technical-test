import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterNewUserPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly backToLoginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.userNameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#register');
    this.backToLoginButton = page.locator('#gotologin');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demoqa.com/register');
  }

  async pageObjectTests(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.userNameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
    await expect(this.backToLoginButton).toBeVisible();
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async enterUserName(userName: string): Promise<void> {
    await this.userNameInput.fill(userName);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async registerNewUser(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterUserName(userName);
    await this.enterPassword(password);
    await this.registerButton.click();
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async clickBackToLoginButton(): Promise<void> {
    await this.backToLoginButton.click();
  }
}