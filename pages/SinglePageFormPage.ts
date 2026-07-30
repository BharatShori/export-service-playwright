import { expect, Locator, Page } from "@playwright/test";

export class SinglePageFormPage {
  readonly page: Page;

  // Form fields
  readonly abnInput: Locator;
  readonly acnInput: Locator;
  readonly businessNameInput: Locator;
  readonly registrationDateInput: Locator;
  readonly entityNameInput: Locator;
  readonly entityNumberInput: Locator;

  // Period active
  readonly periodActiveStartDateInput: Locator;
  readonly periodActiveEndDateInput: Locator;

  // Street address
  readonly streetAddressInput: Locator;
  readonly suburbInput: Locator;
  readonly stateSelect: Locator;
  readonly postcodeInput: Locator;

  // Postal address
  readonly sameAsStreetAddressCheckbox: Locator;
  readonly postalAddressInput: Locator;
  readonly postalSuburbInput: Locator;
  readonly postalStateSelect: Locator;
  readonly postalPostcodeInput: Locator;

  // Form controls
  readonly submitButton: Locator;

  // Validation
  readonly errorSummary: Locator;
  readonly errorInstructionText: Locator;
  readonly abnErrorLink: Locator;
  readonly acnErrorLink: Locator;
  readonly businessNameErrorLink: Locator;
  readonly entityNameErrorLink: Locator;
  readonly entityNumberErrorLink: Locator;
  readonly dateErrorLink: Locator;
  readonly streetAddressErrorLink: Locator;
  readonly suburbErrorLink: Locator;
  readonly stateErrorLink: Locator;
  readonly postcodeErrorLink: Locator;
  readonly postalAddressErrorLink: Locator;
  readonly postalSuburbErrorLink: Locator;
  readonly postalStateErrorLink: Locator;
  readonly postalPostcodeErrorLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.abnInput = page.getByRole("textbox", {
      name: "Australian Business Number (ABN)",
    });

    this.acnInput = page.getByRole("textbox", {
      name: "Australian Company Number (ACN)",
    });

    this.businessNameInput = page.getByRole("textbox", {
      name: "Business name",
    });

    this.registrationDateInput = page.getByRole("textbox", {
      name: "Registration date",
    });

    this.entityNameInput = page.getByRole("textbox", {
      name: "Entity name",
    });

    this.entityNumberInput = page.getByRole("textbox", {
      name: "Entity number",
    });

    // Period active
    this.periodActiveStartDateInput = page.getByRole("textbox", {
      name: "Start date",
    });

    this.periodActiveEndDateInput = page.getByRole("textbox", {
      name: "End date",
    });

    // Street address
    this.streetAddressInput = page.getByRole("textbox", {
      name: "Street address",
    });

    this.suburbInput = page
      .getByRole("textbox", {
        name: "Suburb, town or city",
      })
      .first();

    this.stateSelect = page
      .getByRole("combobox", {
        name: "State",
      })
      .first();

    this.postcodeInput = page
      .getByRole("textbox", {
        name: "Postcode",
      })
      .first();

    // Postal address
    this.sameAsStreetAddressCheckbox = page.locator(
      'input[type="checkbox"][name="isPostalAddressSameAsStreetAddress"]',
    );

    this.postalAddressInput = page.getByRole("textbox", {
      name: "Postal address",
    });

    this.postalSuburbInput = page
      .getByRole("textbox", {
        name: "Suburb, town or city",
      })
      .nth(1);

    this.postalStateSelect = page
      .getByRole("combobox", {
        name: "State",
      })
      .nth(1);

    this.postalPostcodeInput = page
      .getByRole("textbox", {
        name: "Postcode",
      })
      .nth(1);

    // Form controls
    this.submitButton = page.getByRole("button", {
      name: "Submit form",
    });

    // Error summary
    this.errorSummary = page.getByText("There is a problem", {
      exact: true,
    });
    this.errorInstructionText = page.getByText(
      "Please correct the following fields and try again",
      { exact: true },
    );
    this.abnErrorLink = page.getByRole("link", { name: "Enter your ABN" });
    this.acnErrorLink = page.getByRole("link", { name: "Enter your ACN" });
    this.businessNameErrorLink = page.getByRole("link", {
      name: "Enter your business name",
    });
    this.entityNameErrorLink = page.getByRole("link", {
      name: "Enter your entity name",
    });
    this.entityNumberErrorLink = page.getByRole("link", {
      name: "Enter your entity number",
    });
    this.dateErrorLink = page.getByRole("link", { name: "Enter a valid date" });
    this.streetAddressErrorLink = page.getByRole("link", {
      name: "Enter your street address",
    });
    this.suburbErrorLink = page.locator('a[href$="#suburbTownCity"]');
    this.stateErrorLink = page.locator('a[href$="#state"]');
    this.postcodeErrorLink = page.locator('a[href$="#postcode"]');
    this.postalAddressErrorLink = page.getByRole("link", {
      name: "Enter your postal address",
    });
    this.postalSuburbErrorLink = page.locator(
      'a[href$="#postalSuburbTownCity"]',
    );
    this.postalStateErrorLink = page.locator('a[href$="#postalState"]');
    this.postalPostcodeErrorLink = page.locator('a[href$="#postalPostcode"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/example-site/category/subcategory/single-page-form");
  }

  async fillForm(data: SinglePageFormData): Promise<void> {
    await this.abnInput.fill(data.abn);

    await this.acnInput.fill(data.acn);

    await this.businessNameInput.fill(data.businessName);

    await this.registrationDateInput.fill(data.registrationDate);

    await this.entityNameInput.fill(data.entityName);

    await this.entityNumberInput.fill(data.entityNumber);

    await this.periodActiveStartDateInput.fill(data.periodActiveStartDate);

    await this.periodActiveEndDateInput.fill(data.periodActiveEndDate);

    await this.streetAddressInput.fill(data.streetAddress);

    await this.suburbInput.fill(data.suburb);

    await this.stateSelect.selectOption({
      label: data.state,
    });

    await this.postcodeInput.fill(data.postcode);
  }

  async fillPostalAddress(): Promise<void> {
    await this.postalAddressInput.fill("2 Postal Street");
    await this.postalSuburbInput.fill("Postal Test");

    await this.postalStateSelect.selectOption({
      label: "VIC",
    });

    await this.postalPostcodeInput.fill("3001");
  }

  async selectSameAsStreetAddress(): Promise<void> {
    await this.sameAsStreetAddressCheckbox.check({ force: true });
  }

  async unselectSameAsStreetAddress(): Promise<void> {
    await this.sameAsStreetAddressCheckbox.uncheck({ force: true });
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async expectValidationErrors(): Promise<void> {
    await expect(this.errorSummary).toBeVisible();
    await expect(this.errorInstructionText).toBeVisible();
    await expect(this.abnErrorLink).toBeVisible();
    await expect(this.acnErrorLink).toBeVisible();
    await expect(this.businessNameErrorLink).toBeVisible();
    await expect(this.entityNameErrorLink).toBeVisible();
    await expect(this.entityNumberErrorLink).toBeVisible();
    await expect(this.dateErrorLink).toBeVisible();
    await expect(this.streetAddressErrorLink).toBeVisible();
    await expect(this.suburbErrorLink).toBeVisible();
    await expect(this.stateErrorLink).toBeVisible();
    await expect(this.postcodeErrorLink).toBeVisible();
    await expect(this.postalAddressErrorLink).toBeVisible();
    await expect(this.postalSuburbErrorLink).toBeVisible();
    await expect(this.postalStateErrorLink).toBeVisible();
    await expect(this.postalPostcodeErrorLink).toBeVisible();
  }

  async expectRequiredFieldErrors(): Promise<void> {
    await this.expectFieldError(this.abnInput, "Enter your ABN");
    await this.expectFieldError(this.acnInput, "Enter your ACN");
    await this.expectFieldError(
      this.businessNameInput,
      "Enter your business name",
    );
    await this.expectFieldError(this.entityNameInput, "Enter your entity name");
    await this.expectFieldError(
      this.entityNumberInput,
      "Enter your entity number",
    );
    await this.expectFieldError(
      this.periodActiveStartDateInput,
      "Enter a valid date",
    );
    await this.expectFieldError(
      this.periodActiveEndDateInput,
      "Enter a valid date",
    );
    await this.expectFieldError(
      this.streetAddressInput,
      "Enter your street address",
    );
    await this.expectFieldError(
      this.suburbInput,
      "Enter your suburb, town or city",
    );
    await this.expectFieldError(this.stateSelect, "Enter your state");
    await this.expectFieldError(this.postcodeInput, "Enter your postcode");
    await this.expectFieldError(
      this.postalAddressInput,
      "Enter your postal address",
    );
    await this.expectFieldError(
      this.postalSuburbInput,
      "Enter your suburb, town or city",
    );
    await this.expectFieldError(this.postalStateSelect, "Enter your state");
    await this.expectFieldError(
      this.postalPostcodeInput,
      "Enter your postcode",
    );
  }

  async expectPostalAddressFieldsHidden(): Promise<void> {
    await expect(this.postalAddressInput).toBeHidden();
    await expect(this.postalSuburbInput).toBeHidden();
    await expect(this.postalStateSelect).toBeHidden();
    await expect(this.postalPostcodeInput).toBeHidden();
  }

  async clickErrorLinkAndExpectFocus(
    link: Locator,
    field: Locator,
  ): Promise<void> {
    await link.click();
    await expect(field).toBeFocused();
  }

  async expectPostalAddressFieldsVisible(): Promise<void> {
    await expect(this.postalAddressInput).toBeVisible();
    await expect(this.postalSuburbInput).toBeVisible();
    await expect(this.postalStateSelect).toBeVisible();
    await expect(this.postalPostcodeInput).toBeVisible();
  }

  async expectFieldError(field: Locator, errorMessage: string): Promise<void> {
    await expect(field).toHaveAttribute("aria-invalid", "true");

    const describedBy = await field.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();

    await expect(this.page.locator(`#${describedBy}`)).toHaveText(errorMessage);
  }
}
