import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Page elements
  readonly pageHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;

  // Validation / error elements
  readonly errorSummary: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole("heading", {
      name: /sign in/i,
    });
    this.emailInput = page.locator("#email");
    // this.emailInput = page.getByRole("textbox", { name: "email}" });

    this.passwordInput = page.locator("#password");

    this.signInButton = page.getByRole("button", {
      name: /sign in/i,
    });

    this.forgotPasswordLink = page.getByRole("link", {
      name: /forgot password/i,
    });

    this.createAccountLink = page.getByRole("link", {
      name: /create account|sign up/i,
    });

    this.errorSummary = page.getByRole("heading", {
      name: /there is a problem/i,
    });

    this.emailError = page.locator("#field-email-message");

    this.passwordError = page.locator("#field-password-message");
  }

  async goto(): Promise<void> {
    await this.page.goto("/example-site/sign-in-form");
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(
      "https://design-system.agriculture.gov.au/example-site/sign-in-form",
    );

    await expect(this.pageHeading).toBeVisible();

    await expect(this.emailInput).toBeVisible();

    await expect(this.passwordInput).toBeVisible();

    await expect(this.signInButton).toBeVisible();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async expectValidationErrorSummary(): Promise<void> {
    await expect(this.errorSummary).toBeVisible();
  }

  async expectEmailError(): Promise<void> {
    await expect(this.emailError).toBeVisible();
  }

  async expectPasswordError(): Promise<void> {
    await expect(this.passwordError).toBeVisible();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
  }

  async expectEmailFocused(): Promise<void> {
    await expect(this.emailInput).toBeFocused();
  }

  async expectPasswordFocused(): Promise<void> {
    await expect(this.passwordInput).toBeFocused();
  }
}
