import { expect, Page } from "@playwright/test";

export class SinglePageFormSuccessPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get successHeading() {
    return this.page.getByRole("heading", {
      name: "Descriptive success message (H2)",
    });
  }

  get referenceNumber() {
    return this.page.getByText(/^Reference:\s*\d+$/);
  }

  get whatHappensNextHeading() {
    return this.page.getByRole("heading", {
      name: "What happens next?",
    });
  }

  get needHelpHeading() {
    return this.page.getByRole("heading", {
      name: "Need help?",
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/single-page-form-success$/);

    await expect(this.successHeading).toBeVisible();
  }

  async expectSuccessMessage(): Promise<void> {
    await expect(this.successHeading).toBeVisible();

    await expect(
      this.page.getByText("Supporting paragraph for the success message", {
        exact: true,
      }),
    ).toBeVisible();
  }

  async expectReferenceNumber(): Promise<void> {
    await expect(this.referenceNumber).toBeVisible();
  }

  async expectWhatHappensNext(): Promise<void> {
    await expect(this.whatHappensNextHeading).toBeVisible();
  }

  async expectNeedHelp(): Promise<void> {
    await expect(this.needHelpHeading).toBeVisible();
  }
}
