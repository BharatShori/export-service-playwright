import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import { SinglePageFormPage } from "../../pages/SinglePageFormPage";

test.describe("Single-page form - Accessibility", () => {
  test("SPFA01 - should have no serious or critical accessibility violations", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.goto();

    const accessibilityScanResults = await new AxeBuilder({
      page,
    }).analyze();

    const seriousOrCriticalViolations =
      accessibilityScanResults.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );

    expect(seriousOrCriticalViolations).toEqual([]);
  });

  test("SPFA02 - form fields should have accessible labels", async ({
    page,
  }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.goto();

    await expect(singlePageForm.abnInput).toHaveAccessibleName(
      "Australian Business Number (ABN)",
    );

    await expect(singlePageForm.acnInput).toHaveAccessibleName(
      "Australian Company Number (ACN)",
    );

    await expect(singlePageForm.businessNameInput).toHaveAccessibleName(
      "Business name",
    );

    await expect(singlePageForm.registrationDateInput).toHaveAccessibleName(
      /Registration date \(e\.g\. \d{2}\/\d{2}\/\d{4}\)/,
    );

    await expect(singlePageForm.entityNameInput).toHaveAccessibleName(
      "Entity name",
    );

    await expect(singlePageForm.entityNumberInput).toHaveAccessibleName(
      "Entity number",
    );

    await expect(
      singlePageForm.periodActiveStartDateInput,
    ).toHaveAccessibleName(/Start date \(e\.g\. \d{2}\/\d{2}\/\d{4}\)/);

    await expect(singlePageForm.periodActiveEndDateInput).toHaveAccessibleName(
      /End date \(e\.g\. \d{2}\/\d{2}\/\d{4}\)/,
    );

    await expect(singlePageForm.streetAddressInput).toHaveAccessibleName(
      "Street address",
    );

    await expect(singlePageForm.suburbInput).toHaveAccessibleName(
      "Suburb, town or city",
    );

    await expect(singlePageForm.stateSelect).toHaveAccessibleName(
      "State or territory",
    );

    await expect(singlePageForm.postcodeInput).toHaveAccessibleName("Postcode");

    await expect(singlePageForm.postalAddressInput).toHaveAccessibleName(
      "Postal address",
    );

    await expect(singlePageForm.postalSuburbInput).toHaveAccessibleName(
      "Suburb, town or city",
    );

    await expect(singlePageForm.postalStateSelect).toHaveAccessibleName(
      "State or territory",
    );

    await expect(singlePageForm.postalPostcodeInput).toHaveAccessibleName(
      "Postcode",
    );

    await expect(
      singlePageForm.sameAsStreetAddressCheckbox,
    ).toHaveAccessibleName("Same as street address");
  });

  test("SPFA03 - validation errors should be accessible", async ({ page }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.goto();

    await singlePageForm.submit();

    await expect(singlePageForm.abnInput).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    await expect(singlePageForm.abnInput).toHaveAttribute(
      "aria-describedby",
      "field-abn-message",
    );

    await expect(page.locator("#field-abn-message")).toHaveText(
      "Enter your ABN",
    );
  });

  test("SPFA04 - error summary should be accessible", async ({ page }) => {
    const singlePageForm = new SinglePageFormPage(page);

    await singlePageForm.goto();

    await singlePageForm.submit();

    await expect(
      page.getByRole("heading", {
        name: "There is a problem",
      }),
    ).toBeVisible();

    const errorLinks = [
      ["Enter your ABN", "#abn"],
      ["Enter your ACN", "#acn"],
      ["Enter your business name", "#businessName"],
      ["Enter your entity name", "#entityName"],
      ["Enter your entity number", "#entityNumber"],
      ["Enter a valid date", "#periodActive"],
      ["Enter your street address", "#streetAddress"],
      // ["Enter your suburb, town or city", "#suburbTownCity"],
      // ["Enter your state", "#state"],
      // ["Enter your postcode", "#postcode"],
      ["Enter your postal address", "#postalAddress"],
      // ["Enter your suburb, town or city", "#postalSuburbTownCity"],
      // ["Enter your state", "#postalState"],
      // ["Enter your postcode", "#postalPostcode"],
    ] as const;

    for (const [name, href] of errorLinks) {
      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute(
        "href",
        "/example-site/category/subcategory/single-page-form" + href,
      );
    }
  });
});
