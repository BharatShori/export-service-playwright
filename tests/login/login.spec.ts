import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test("LOGIN-001 - should display the login page", async () => {
    await loginPage.expectPageLoaded();
  });

  test("LOGIN-002 - should show validation errors when submitting an empty login form", async () => {
    await loginPage.clickSignIn();

    await loginPage.expectValidationErrorSummary();

    await loginPage.expectEmailError();

    await loginPage.expectPasswordError();
  });

  test("LOGIN-003 - should show username validation error when username is empty", async () => {
    await loginPage.enterPassword("TestPassword123");

    await loginPage.clickSignIn();

    await loginPage.expectEmailError();
  });

  test("LOGIN-004 - should show password validation error when password is empty", async () => {
    await loginPage.enterEmail("testuser@example.com");

    await loginPage.clickSignIn();

    await loginPage.expectPasswordError();
  });

  test("LOGIN-005 - should reject invalid credentials", async () => {
    await loginPage.signIn("invalid-user", "invalid-password");

    // Replace this assertion with the actual
    // invalid-credentials behaviour observed
    // on the application.
    await expect(loginPage.page).toHaveURL(/\/example-site\/sign-in-form/);
  });

  test("LOGIN-006 - should handle Forgot password link", async () => {
    await loginPage.clickForgotPassword();

    await expect(loginPage.page).toHaveURL(/\/example-site\/sign-in-form/);
  });

  test("LOGIN-007 - should handle Create account link", async () => {
    await loginPage.clickCreateAccount();

    await expect(loginPage.page).toHaveURL(/\/example-site\/sign-in-form/);
  });
});
