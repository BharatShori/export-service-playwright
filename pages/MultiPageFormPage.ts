import { expect, Locator, Page } from "@playwright/test";

export class MultiPageFormPage {
  readonly page: Page;

  // Landing page
  readonly pageHeading: Locator;
  readonly getStartedLink: Locator;

  // Form navigation
  readonly backButton: Locator;
  readonly saveAndContinueButton: Locator;
  readonly saveAndExitButton: Locator;
  readonly cancelButton: Locator;

  // Progress / sections
  readonly conditionalForkStep: Locator;
  readonly submitEvidenceStep: Locator;
  readonly selectDateStep: Locator;
  readonly conditionalRevealStep: Locator;
  readonly reviewAndSubmitStep: Locator;

  // Conditional fork
  readonly conditionalForkQuestion: Locator;
  readonly conditionalForkOptionA: Locator;
  readonly conditionalForkOptionB: Locator;
  readonly conditionalForkOptionC: Locator;
  readonly conditionalForkError: Locator;

  // Submit evidence
  readonly describeActionsField: Locator;
  readonly fileInput: Locator;
  readonly selectFilesButton: Locator;
  readonly uploadedFile: Locator;
  readonly removeFileButton: Locator;

  // Select date
  readonly dateField: Locator;
  readonly chooseDateButton: Locator;
  readonly dateError: Locator;

  // Conditional reveal
  readonly conditionalCheckboxA: Locator;
  readonly conditionalCheckboxB: Locator;
  readonly conditionalCheckboxC: Locator;
  readonly conditionalCheckboxD: Locator;
  readonly conditionalField: Locator;

  // Review and submit
  readonly declarationCheckbox: Locator;
  readonly declarationError: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // --------------------------------------------------
    // Landing page
    // --------------------------------------------------

    this.pageHeading = page.getByRole("heading", {
      name: /multi-page form/i,
    });

    this.getStartedLink = page.getByRole("link", {
      name: /get started/i,
    });

    // --------------------------------------------------
    // Form navigation
    // --------------------------------------------------

    this.backButton = page.getByRole("button", {
      name: /^back$/i,
    });

    this.saveAndContinueButton = page.getByRole("button", {
      name: /save and continue/i,
    });

    this.saveAndExitButton = page.getByRole("button", {
      name: /save and exit/i,
    });

    this.cancelButton = page.getByRole("button", {
      name: /^cancel$/i,
    });

    // --------------------------------------------------
    // Progress / sections
    // --------------------------------------------------

    this.conditionalForkStep = page.getByText("Conditional fork", {
      exact: true,
    });

    this.submitEvidenceStep = page.getByText("Submit evidence", {
      exact: true,
    });

    this.selectDateStep = page.getByText("Select date", { exact: true });

    this.conditionalRevealStep = page.getByText("Conditional reveal", {
      exact: true,
    });

    this.reviewAndSubmitStep = page.getByText("Review and submit", {
      exact: true,
    });

    // --------------------------------------------------
    // Conditional fork
    // --------------------------------------------------

    this.conditionalForkQuestion = page.getByRole("group", {
      name: /fieldset question/i,
    });

    this.conditionalForkOptionA = page.locator(
      'input[type="radio"][name="example"][value="A"]',
    );

    this.conditionalForkOptionB = page.locator(
      'input[type="radio"][name="example"][value="B"]',
    );

    this.conditionalForkOptionC = page.locator(
      'input[type="radio"][name="example"][value="C"]',
    );

    this.conditionalForkError = page.getByText("Select an option", {
      exact: true,
    });

    // --------------------------------------------------
    // Submit evidence
    // --------------------------------------------------

    this.describeActionsField = page.locator("#description");

    this.fileInput = page.locator('input[type="file"][name="files"]');

    this.selectFilesButton = page.getByRole("button", {
      name: /select files/i,
    });

    this.uploadedFile = page.locator('[data-field-container="true"]').filter({
      hasText: /select file to upload/i,
    });

    this.removeFileButton = page.getByRole("button", {
      name: /remove/i,
    });

    // --------------------------------------------------
    // Select date
    // --------------------------------------------------

    this.dateField = page.locator("#date");

    this.chooseDateButton = page.getByRole("button", {
      name: /choose date/i,
    });

    this.dateError = page.getByText("Select a date", { exact: true });

    // --------------------------------------------------
    // Conditional reveal
    // --------------------------------------------------

    this.conditionalCheckboxA = page.getByRole("checkbox", {
      name: "Checkbox label A",
    });

    this.conditionalCheckboxB = page.getByRole("checkbox", {
      name: "Checkbox label B",
    });

    this.conditionalCheckboxC = page.getByRole("checkbox", {
      name: "Checkbox label C",
    });

    this.conditionalCheckboxD = page.getByRole("checkbox", {
      name: "Checkbox label D",
    });

    this.conditionalField = page.locator("#conditionalField");

    // --------------------------------------------------
    // Review and submit
    // --------------------------------------------------

    this.declarationCheckbox = page.getByRole("checkbox", {
      name: /i confirm that i have read and agree/i,
    });

    this.declarationError = page.getByText(
      "You must read and agree with the declaration",
      { exact: true },
    );

    this.submitButton = page.getByRole("button", {
      name: /^submit$/i,
    });
  }

  // --------------------------------------------------
  // Landing page actions
  // --------------------------------------------------

  async open() {
    await this.page.goto("/example-site/category/subcategory/multi-page-form");
  }

  async startForm() {
    await this.getStartedLink.click();
  }

  // --------------------------------------------------
  // Form navigation
  // --------------------------------------------------

  async saveAndContinue() {
    await this.saveAndContinueButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async saveAndExit() {
    await this.saveAndExitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  // --------------------------------------------------
  // Conditional fork
  // --------------------------------------------------
  async selectConditionalForkOptionA() {
    await this.conditionalForkOptionA.check({ force: true });
  }

  async selectConditionalForkOptionB() {
    await this.conditionalForkOptionB.check({ force: true });
  }
  async selectConditionalForkOptionC() {
    await this.conditionalForkOptionC.check({ force: true });
  }

  // --------------------------------------------------
  // Submit evidence
  // --------------------------------------------------

  async enterEvidenceDescription(description: string) {
    await this.describeActionsField.fill(description);
  }

  async uploadEvidenceFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async removeUploadedFile() {
    await this.removeFileButton.click();
  }

  // --------------------------------------------------
  // Select date
  // --------------------------------------------------

  async enterDate(date: string) {
    await this.dateField.fill(date);
  }

  async openDatePicker() {
    await this.chooseDateButton.click();
  }

  // --------------------------------------------------
  // Conditional reveal
  // --------------------------------------------------

  async selectConditionalCheckboxA() {
    await this.conditionalCheckboxA.check({ force: true });
  }

  async selectConditionalCheckboxB() {
    await this.conditionalCheckboxB.check({ force: true });
  }

  async selectConditionalCheckboxC() {
    await this.conditionalCheckboxC.check({ force: true });
  }

  async selectConditionalCheckboxD() {
    await this.conditionalCheckboxD.check({ force: true });
  }

  async enterConditionalField(value: string) {
    await this.conditionalField.fill(value);
  }

  // --------------------------------------------------
  // Review and submit
  // --------------------------------------------------

  async agreeToDeclaration() {
    await this.declarationCheckbox.check();
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
