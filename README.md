# Export Service – Playwright Automation

## 1. Project Overview

This repository contains an automated end-to-end test suite for the Export Service example site, implemented using **Playwright** and **TypeScript**.

The purpose of the automation is to demonstrate functional and accessibility-focused testing of the following areas:

- Single-page form
- Single-page form success journey
- Multi-page form
- Sign-in / Login
- Accessibility checks for the Single-page form

The automation follows a Page Object Model (POM) approach to separate page interaction logic from test specifications and uses dedicated test data and fixture files where appropriate.

---

## 2. Technology Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright
- **Browser:** Chromium
- **Accessibility Testing:** `@axe-core/playwright`
- **Test Runner:** Playwright Test
- **Test Reporting:** Playwright HTML Reporter
- **Version Control:** Git / GitHub

The Playwright configuration currently uses the following base URL:

`https://design-system.agriculture.gov.au`

The tests are configured to run against the Chromium browser.

---

# 3. Test Coverage

## 3.1 Single-page Form

The Single-page Form tests cover the following scenarios:

### Form validation

- Submit the form without entering any data.
- Verify that the error summary is displayed.
- Verify that the error summary contains links for the affected fields.
- Verify validation errors for all mandatory fields.
- Verify that fields are marked with `aria-invalid="true"` when validation fails.
- Verify that validation messages are associated with the relevant form fields through `aria-describedby`.

The mandatory fields covered include:

- Australian Business Number (ABN)
- Australian Company Number (ACN)
- Business name
- Entity name
- Entity number
- Period active start date
- Period active end date
- Street address
- Suburb / town / city
- State
- Postcode
- Postal address
- Postal suburb / town / city
- Postal state
- Postal postcode

### Error summary navigation

The test suite verifies that the error summary links correctly identify the relevant fields.

It also verifies that selecting an error link moves focus to the corresponding form field.

### Postal address behaviour

The following scenarios are covered:

- Complete the form with a separate postal address.
- Complete the form without a separate postal address by selecting "Same as street address".
- Verify that postal address fields are hidden when "Same as street address" is selected.
- Verify that postal address fields are visible when the option is not selected.

### Successful submission

The test suite verifies that the form can be completed and submitted successfully.

The successful journey is verified through the dedicated success page:

`/example-site/category/subcategory/single-page-form-success`

The success page coverage includes:

- Success message
- Supporting success message text
- Reference number
- "What happens next?" section
- "Need help?" section

---

## 3.2 Single-page Form Accessibility

Accessibility testing is included for the Single-page Form.

The tests verify accessible names and accessible relationships for key form controls, including:

- Form fields
- Labels
- Required fields
- Error states
- Validation messages
- Error summary
- Accessible descriptions
- Period active date fields

The tests also use `@axe-core/playwright` for automated accessibility analysis.

Where the application contains dynamic content, such as the example date displayed in the date field's accessible name, assertions are designed to validate the stable structure of the accessible name rather than hard-code a specific date.

For example, the test validates the expected date format pattern rather than relying on a specific calendar date.

Accessibility testing is intended to complement, rather than replace, manual accessibility testing and testing with assistive technologies.

---

## 3.3 Multi-page Form

The Multi-page Form automation covers the available multi-step journey.

### Landing page

- Navigate to the Multi-page Form landing page.
- Verify the form can be started using the "Get started" link.

### Conditional fork

- Verify the Conditional fork step.
- Verify the radio-button options.
- Verify validation when no option is selected.
- Verify the validation message.
- Verify focus is moved to the radio group after validation.
- Verify the available conditional fork flow.

### Submit evidence

The Submit Evidence step covers:

- Validation when the description is not provided.
- Validation when no file is selected.
- Entering an evidence description.
- Uploading an image file.
- Verifying supported file types.
- Verifying the documented 2 MB maximum file size.
- Removing an uploaded file.
- Continuing to the next step.

The test suite uses a test image stored in:

`tests/fixtures/test-image.png`

### Select date

The Select Date step covers:

- Validation when no date is entered.
- Entering a date.
- Continuing through the form.

The test implementation enters the date directly into the date input. The page also exposes a date-picker control, which is represented in the Page Object Model.

### Conditional reveal

The Conditional Reveal step covers:

- Selecting conditional checkbox options.
- Verifying that the conditional field is revealed.
- Entering data into the conditional field.
- Continuing through the form.

### Declaration and submission

The final step covers:

- Declaration agreement validation.
- Verification of the declaration error when the checkbox is not selected.
- Selecting the declaration agreement.
- Submitting the form.

### Form navigation

The Page Object Model also provides support for:

- Back
- Save and continue
- Save and exit
- Cancel

The test suite also recognises that some sections of the example form are not available for completion until previous steps have been completed.

---

## 3.4 Login

The Login test suite covers the sign-in page.

The scenarios include:

- Verify the sign-in page loads correctly.
- Verify the email and password fields are displayed.
- Verify the Sign In button is displayed.
- Submit the form without entering credentials.
- Verify the validation error summary.
- Verify the email validation error.
- Verify the password validation error.
- Verify validation when the email is missing.
- Verify validation when the password is missing.
- Verify invalid credential behaviour.
- Verify the Forgot Password link behaviour.
- Verify the Create Account / Sign Up link behaviour.

The example site currently does not provide a complete Forgot Password or Create Account journey. The tests therefore document and verify the behaviour observed in the example environment rather than assuming that these journeys are implemented.

No successful authenticated-login scenario is claimed unless valid test credentials are provided by the application owner.

---

# 4. Project Structure

The project follows a Page Object Model structure.

```text
export-service-playwright/
│
├── pages/
│   ├── LoginPage.ts
│   ├── MultiPageFormPage.ts
│   ├── SinglePageFormPage.ts
│   └── SinglePageFormSuccessPage.ts
│
├── tests/
│   ├── data/
│   │   ├── login.data.ts
│   │   ├── multi-page-form.data.ts
│   │   └── single-page-form.data.ts
│   │
│   ├── fixtures/
│   │   └── test-image.png
│   │
│   ├── login/
│   │   └── login.spec.ts
│   │
│   ├── multi-page-form/
│   │   └── multi-page-form.spec.ts
│   │
│   └── single-page-form/
│       ├── single-page-form.spec.ts
│       └── single-page-form-accessibility.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

## Page Objects

### `SinglePageFormPage.ts`

Contains:

- Form field locators
- Postal address locators
- Validation locators
- Form interaction methods
- Postal address behaviour
- Validation assertions
- Error link and focus validation

### `SinglePageFormSuccessPage.ts`

Contains:

- Success page locators
- Reference number validation
- Success message validation
- "What happens next?" validation
- "Need help?" validation

### `MultiPageFormPage.ts`

Contains:

- Multi-page form navigation
- Conditional fork interactions
- Evidence description
- File upload and removal
- Date entry
- Conditional reveal interactions
- Declaration agreement
- Final submission

### `LoginPage.ts`

Contains:

- Email and password fields
- Sign-in interaction
- Validation assertions
- Forgot Password interaction
- Create Account interaction
- Focus assertions

---

## Test Data

Test data is maintained separately from test specifications under:

```text
tests/data/
```

This helps keep test specifications focused on test behaviour and makes test data easier to maintain.

---

## Test Fixtures

Static test assets are maintained under:

```text
tests/fixtures/
```

The current repository includes an image used to test the evidence file upload functionality.

---

# 5. Running the Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test suite:

```bash
npx playwright test tests/single-page-form
```

```bash
npx playwright test tests/multi-page-form
```

```bash
npx playwright test tests/login
```

Run the accessibility tests:

```bash
npx playwright test tests/single-page-form/single-page-form-accessibility.spec.ts
```

View the HTML report:

```bash
npx playwright show-report
```

---

# 6. Considerations for Running Against Production

The current tests target the Export Service example environment. Running the same suite against a production application would require additional considerations.

## Test data

Production test data should be carefully controlled.

Tests should avoid:

- Creating real business records.
- Uploading sensitive or personally identifiable information.
- Modifying real customer data.
- Creating duplicate records.
- Sending real notifications or communications.

Dedicated, non-production test data should be used wherever possible.

## Environment configuration

The base URL should be configurable rather than hard-coded.

For example:

```typescript
use: {
  baseURL: process.env.BASE_URL;
}
```

Different environments could then be selected through environment variables.

Example:

```bash
BASE_URL=https://test.example.com npx playwright test
```

Production execution should only be enabled deliberately and should use an explicit environment configuration.

## Authentication

Credentials should never be hard-coded in source code.

Production credentials should be stored securely using:

- CI/CD secret management
- Environment variables
- Secret stores
- Appropriate authentication mechanisms

Credentials should not be committed to GitHub.

## Data isolation

Production automation should use accounts and data specifically created for automated testing.

Tests should be designed to be:

- Repeatable
- Idempotent where possible
- Safe to re-run
- Independent of previous test execution

## Test execution frequency

Full end-to-end suites should not necessarily run continuously against production.

A sensible approach could include:

- Lightweight smoke tests after deployment.
- Critical-path regression tests on a scheduled basis.
- Full regression testing in a dedicated test or staging environment.

## External dependencies

Tests should consider the availability and stability of external services.

Failures caused by:

- Third-party services
- Network issues
- External APIs
- Browser infrastructure

should be distinguishable from genuine application defects.

## File uploads

Production file-upload testing should use safe, synthetic files.

Tests should verify:

- File type restrictions
- File size restrictions
- Security controls
- Virus/malware scanning where applicable

No sensitive production files should be uploaded by automated tests.

## Accessibility

Automated accessibility checks should form part of the wider accessibility strategy.

Production testing should be complemented by:

- Manual keyboard testing
- Screen reader testing
- Real-user accessibility testing
- Browser and device coverage

Automated tools such as axe are useful for identifying common accessibility violations but cannot identify every accessibility issue.

## Browser coverage

The current project runs against Chromium.

For a production application, browser coverage should be expanded based on supported browsers and the organisation's browser support policy.

Potential coverage could include:

- Chromium / Chrome
- Firefox
- WebKit / Safari
- Microsoft Edge
- Supported mobile browsers

The appropriate matrix should be agreed with product and business stakeholders.

---

# 7. What Would Be Different With Different Logins?

The current example site does not provide a complete authenticated user journey with documented test accounts, so the automation does not claim full role-based authentication coverage.

In a real application with multiple user roles, I would introduce role-specific authentication and test data.

For example:

```text
Admin
Standard User
Read-only User
Approver
Unauthorised User
```

Each role would have its own authentication context.

The tests would then verify both:

### Authentication

- Valid credentials can authenticate.
- Invalid credentials are rejected.
- Unauthenticated users are redirected appropriately.
- Sessions expire correctly.
- Logout invalidates the session.

### Authorisation

Each role should be tested against the functionality it is permitted to access.

For example:

| Role           | View | Create | Edit | Delete | Approve |
| -------------- | ---- | ------ | ---- | ------ | ------- |
| Admin          | Yes  | Yes    | Yes  | Yes    | Yes     |
| Standard User  | Yes  | Yes    | Yes  | No     | No      |
| Read-only User | Yes  | No     | No   | No     | No      |
| Approver       | Yes  | No     | No   | No     | Yes     |

The exact permissions would be driven by the application's access-control requirements.

I would avoid duplicating the entire functional regression suite for every user role. Instead, I would:

1. Run common functional tests using a representative standard user.
2. Create targeted role-based tests for permission differences.
3. Add negative tests for restricted functionality.
4. Validate access control at both UI and API levels where applicable.

For Playwright, I would consider using separate authenticated storage states, for example:

```text
playwright/.auth/admin.json
playwright/.auth/user.json
playwright/.auth/read-only.json
```

These files would be generated securely and excluded from source control.

This approach reduces repeated login operations and makes role-based testing more maintainable.

---

# 8. AI Usage Declaration

AI tools were used as assistive development tools during the creation of this automation project.

The primary AI tools used were:

- **ChatGPT**
- **GitHub Copilot**

AI was used for:

- Discussing the overall automation approach.
- Reviewing the scope of the assessment.
- Discussing suitable Playwright project structure.
- Explaining Playwright concepts and Page Object Model implementation.
- Assisting with TypeScript and Playwright code development.
- Suggesting test scenarios and edge cases.
- Reviewing HTML and DOM structures provided during exploratory testing.
- Assisting with locator strategy.
- Troubleshooting Playwright test failures.
- Explaining Playwright errors and suggesting alternative approaches.
- Discussing accessibility test scenarios.
- Reviewing test coverage and identifying potential gaps.
- Assisting with documentation structure and wording.

**GitHub Copilot** was also used as a coding assistance tool during implementation. It was used to assist with code completion, generating and refining code snippets, and improving development productivity while working with TypeScript and Playwright.

AI-generated suggestions were reviewed, adapted and tested against the actual application.

The final automation code was executed locally and adjusted based on the observed behaviour of the application. Where AI-generated suggestions did not match the actual implementation, the implementation was changed based on direct observation of the application's UI and DOM.

Examples of areas where application behaviour was manually verified include:

- Form validation messages.
- Error summary links.
- Focus movement after validation.
- Postal address conditional behaviour.
- Period active date validation.
- Date field behaviour.
- Conditional fork behaviour.
- Conditional field reveal behaviour.
- File upload restrictions.
- File removal behaviour.
- Declaration validation.
- Login validation.
- Forgot Password and Create Account link behaviour.

AI was therefore used as a productivity and learning aid, not as a substitute for test analysis, exploratory testing, validation, or engineering judgement.

No confidential credentials, secrets, personal information, or sensitive production data were intentionally provided to the AI tools.

# 9. Known Limitations

The following limitations apply to the current automation:

- The project currently targets Chromium.
- The example site is used as the system under test.
- No successful authenticated login flow is claimed because valid credentials were not provided.
- Forgot Password and Create Account are not represented as complete journeys in the example application.
- Accessibility automation is primarily focused on the Single-page Form.
- Automated accessibility testing does not replace manual accessibility assessment or assistive technology testing.
- The current project is intended as an assessment demonstration rather than a complete production-grade regression framework.

---

# 10. Future Improvements

If this automation were being developed into a production-quality framework, I would consider:

- Environment-specific configuration.
- CI/CD integration.
- Secure authentication and storage states.
- Role-based authentication coverage.
- Expanded browser coverage.
- Mobile viewport coverage.
- More comprehensive accessibility coverage.
- API-level test coverage.
- Improved test data management.
- Test tagging and selective execution.
- Automated test result publishing.
- Screenshots and traces only on failure to reduce unnecessary artifacts.
- Retry and quarantine strategy for genuinely flaky tests.
- Integration with test management and defect management tools.
- Scheduled production smoke tests.
- Performance and resilience testing as separate test suites.

---

# 11. Summary

This project demonstrates an end-to-end Playwright automation approach covering the primary functional journeys requested for the assessment.

The implementation uses:

- TypeScript
- Playwright
- Page Object Model
- Dedicated test data
- Test fixtures
- Functional testing
- Validation testing
- Conditional-flow testing
- File-upload testing
- Accessibility testing
- HTML test reporting

The automation focuses on meaningful user journeys and observable application behaviour while maintaining a separation between test specifications, page interaction logic, test data and test assets.
