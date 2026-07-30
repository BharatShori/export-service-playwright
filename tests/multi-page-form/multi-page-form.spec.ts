import { test, expect } from "@playwright/test";
import { MultiPageFormPage } from "../../pages/MultiPageFormPage";
import { multiPageFormData } from "../data/multi-page-form.data";

test.describe("Multi-page Form", () => {
  test.beforeEach(async ({ page }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.open();
    await multiPageForm.startForm();
  });

  test("MPF-001 - should open the multi-page form", async ({ page }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await expect(multiPageForm.conditionalForkStep).toBeVisible();
  });

  test("MPF-002 - should show Conditional Fork as the current step", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await expect(multiPageForm.conditionalForkStep).toBeVisible();

    await expect(multiPageForm.saveAndContinueButton).toBeVisible();
  });

  test("MPF-003 - should prevent access to sections that cannot start yet", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.submitEvidenceStep.click();

    await expect(
      page.getByText("This section of the form is not ready to be completed", {
        exact: true,
      }),
    ).toBeVisible();
  });
  test("MPF-004 - should show validation error when Conditional Fork has no selection", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.saveAndContinue();

    await expect(multiPageForm.conditionalForkError).toBeVisible();
  });

  test("MPF-005 - should move focus to Conditional Fork when validation fails", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.saveAndContinue();

    await expect(
      multiPageForm.page
        .locator('input[type="radio"][aria-invalid="true"]')
        .first(),
    ).toBeFocused();
  });

  test("MPF-006 - should continue when Conditional Fork option is selected", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();

    await multiPageForm.saveAndContinue();

    await expect(
      page.getByRole("heading", {
        name: /submit evidence/i,
      }),
    ).toBeVisible();
  });
  test("MPF-007 - should show validation errors when evidence fields are empty", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.saveAndContinue();

    await expect(
      page.getByText("Describe actions taken", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByText("Select file to upload", { exact: true }),
    ).toBeVisible();
  });
  test("MPF-008 - should allow user to upload evidence", async ({ page }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await expect(multiPageForm.removeFileButton).toBeVisible();
  });
  test("MPF-009 - should allow user to remove an uploaded file", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.removeUploadedFile();

    await expect(multiPageForm.removeFileButton).not.toBeVisible();
  });
  test("MPF-010 - should continue after submitting valid evidence", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.saveAndContinue();

    await expect(
      page.getByRole("heading", {
        name: /select date/i,
      }),
    ).toBeVisible();
  });

  test("MPF-011 - should require a date", async ({ page }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.saveAndContinue();

    await multiPageForm.saveAndContinue();

    await expect(multiPageForm.dateError).toBeVisible();
  });

  test("MPF-012 - should continue with a valid date", async ({ page }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.saveAndContinue();

    await multiPageForm.enterDate(multiPageFormData.date);

    await multiPageForm.saveAndContinue();

    await expect(
      page.getByRole("heading", {
        name: /conditional reveal/i,
      }),
    ).toBeVisible();
  });

  test("MPF-013 - should reveal conditional field when applicable checkbox is selected", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.saveAndContinue();

    await multiPageForm.enterDate(multiPageFormData.date);

    await multiPageForm.saveAndContinue();

    await expect(multiPageForm.conditionalField).toBeHidden();

    await multiPageForm.selectConditionalCheckboxB();

    await expect(multiPageForm.conditionalField).toBeVisible();
  });

  test("MPF-014 - should allow user to complete conditional field", async ({
    page,
  }) => {
    const multiPageForm = new MultiPageFormPage(page);

    await multiPageForm.selectConditionalForkOptionA();
    await multiPageForm.saveAndContinue();

    await multiPageForm.enterEvidenceDescription(
      multiPageFormData.evidenceDescription,
    );

    await multiPageForm.uploadEvidenceFile(multiPageFormData.evidenceFile);

    await multiPageForm.saveAndContinue();

    await multiPageForm.enterDate(multiPageFormData.date);

    await multiPageForm.saveAndContinue();

    await multiPageForm.selectConditionalCheckboxB();

    await multiPageForm.enterConditionalField(
      multiPageFormData.conditionalFieldValue,
    );

    await multiPageForm.saveAndContinue();

    await expect(
      page.getByRole("heading", {
        name: /review and submit/i,
      }),
    ).toBeVisible();
  });
});
