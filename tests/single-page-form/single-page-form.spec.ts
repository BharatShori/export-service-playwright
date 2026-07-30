import { test, expect } from "@playwright/test";
import { SinglePageFormData } from "../data/single-page-form.data";
import { validSinglePageFormData } from "../data/single-page-form.data";
import { SinglePageFormPage } from "../../pages/SinglePageFormPage";
import { SinglePageFormSuccessPage } from "../../pages/SinglePageFormSuccessPage";

test.describe("Single Page Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/example-site/category/subcategory/single-page-form");
  });

  test("SPF01 - should display validation errors when submitting an empty form", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.submit();

    await singlePageForm.expectValidationErrors();
    await singlePageForm.expectRequiredFieldErrors();
  });

  test("SPF02 - should navigate to the relevant field when clicking an error summary link", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.submit();

    const linkFieldPairs = [
      [singlePageForm.abnErrorLink, singlePageForm.abnInput],
      [singlePageForm.acnErrorLink, singlePageForm.acnInput],
      [singlePageForm.businessNameErrorLink, singlePageForm.businessNameInput],
      [singlePageForm.entityNameErrorLink, singlePageForm.entityNameInput],
      [singlePageForm.entityNumberErrorLink, singlePageForm.entityNumberInput],
      [singlePageForm.dateErrorLink, singlePageForm.periodActiveStartDateInput],
      [
        singlePageForm.streetAddressErrorLink,
        singlePageForm.streetAddressInput,
      ],
      [singlePageForm.suburbErrorLink, singlePageForm.suburbInput],
      [singlePageForm.stateErrorLink, singlePageForm.stateSelect],
      [singlePageForm.postcodeErrorLink, singlePageForm.postcodeInput],
      [
        singlePageForm.postalAddressErrorLink,
        singlePageForm.postalAddressInput,
      ],
      [singlePageForm.postalSuburbErrorLink, singlePageForm.postalSuburbInput],
      [singlePageForm.postalStateErrorLink, singlePageForm.postalStateSelect],
      [
        singlePageForm.postalPostcodeErrorLink,
        singlePageForm.postalPostcodeInput,
      ],
    ] as const;

    for (const [link, field] of linkFieldPairs) {
      await singlePageForm.clickErrorLinkAndExpectFocus(link, field);
    }
  });

  test("SPF03 - should successfully submit the single-page form with a separate postal address", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);
    const successPage = new SinglePageFormSuccessPage(page);

    await singlePageForm.fillForm(validSinglePageFormData);
    await singlePageForm.fillPostalAddress();
    await singlePageForm.submit();

    await successPage.expectLoaded();
    await successPage.expectSuccessMessage();
    await successPage.expectReferenceNumber();
    await successPage.expectWhatHappensNext();
    await successPage.expectNeedHelp();
  });

  test("SPF04 - should successfully submit the single-page form when postal address matches street address", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);
    const successPage = new SinglePageFormSuccessPage(page);

    await singlePageForm.fillForm(validSinglePageFormData);
    await singlePageForm.selectSameAsStreetAddress();
    await singlePageForm.submit();

    await successPage.expectLoaded();
    await successPage.expectSuccessMessage();
    await successPage.expectReferenceNumber();
    await successPage.expectWhatHappensNext();
    await successPage.expectNeedHelp();
  });

  test("SPF05 - should show postal address fields again when same as street address is unchecked", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.fillForm(validSinglePageFormData);
    await singlePageForm.selectSameAsStreetAddress();
    await singlePageForm.expectPostalAddressFieldsHidden();

    await singlePageForm.unselectSameAsStreetAddress();
    await singlePageForm.expectPostalAddressFieldsVisible();
  });
});
