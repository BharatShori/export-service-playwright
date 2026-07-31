# Test Execution Report

## Export Service Example Site – Playwright Automation

**Project:** Export Service Example Site
**Automation Framework:** Playwright
**Programming Language:** TypeScript
**Test Execution Date:** 31 July 2026
**Browsers Tested:** Chromium, WebKit
**Test Execution Status:** Passed

---

## 1. Executive Summary

This report provides the results of automated functional and accessibility-focused testing performed against the Export Service example site using Playwright and TypeScript.

The automation suite was developed to provide coverage across the following areas:

* Single-page form
* Multi-page form
* Login
* Accessibility-related scenarios

The test suite contains **30 test scenarios**, executed against **Chromium and WebKit**, resulting in **60 total test executions**.

### Overall Result

| Metric                |       Result |
| --------------------- | -----------: |
| Test scenarios        |           30 |
| Browser projects      |            2 |
| Total test executions |           60 |
| Passed                |           60 |
| Failed                |            0 |
| Skipped               |            0 |
| Pass rate             |         100% |
| Execution time        | 48.6 seconds |

The full automated test suite completed successfully with no test failures or skipped tests.

---

## 2. Scope of Testing

The automation scope was based on the pages identified for the assessment.

### Single-page Form

The Single-page Form was tested for:

* Successful form submission
* Mandatory field validation
* Error summary validation
* Individual field-level validation
* Error summary links pointing to the appropriate fields
* Focus movement to the appropriate field after validation
* Period Active date validation
* Date input behaviour
* State dropdown selection
* Postal address functionality
* "Same as street address" conditional behaviour
* Successful navigation to the confirmation/success page
* Success message validation
* Reference number validation
* Accessibility-related attributes and behaviour

### Multi-page Form

The Multi-page Form was tested across its available form sections, including:

* Form entry and navigation
* Conditional fork
* Radio button validation
* Required field validation
* Error summary behaviour
* Error links and field association
* Focus management following validation
* Text area input
* File upload
* File type restrictions
* File size restrictions
* File removal
* Date input
* Date picker interaction
* Conditional reveal behaviour
* Checkbox validation
* Declaration agreement validation
* Completion of the multi-page form flow

### Login

The Login page was tested for:

* Valid login behaviour
* Required username/email validation
* Required password validation
* Invalid credential behaviour
* Error message presentation
* Error state behaviour
* Login form accessibility-related attributes

### Accessibility

Accessibility-focused scenarios were included within the automation suite to validate key accessibility characteristics exposed through the application's DOM and user interface.

The automated checks included validation of areas such as:

* Accessible names
* Labels associated with form controls
* Required field attributes
* Invalid field states
* Error message associations
* `aria-describedby` relationships
* Error summary links
* Focus movement after validation
* Accessible roles and attributes where applicable

These tests provide automated coverage of selected accessibility requirements but do not represent a complete WCAG compliance assessment.

---

## 3. Test Environment

Testing was performed against the Export Service example site provided as part of the assessment.

The automation suite was executed using:

* Playwright
* TypeScript
* Chromium
* WebKit

The suite was executed locally using Playwright's configured test runner with **3 parallel workers**.

The test suite can be executed using:

```bash
npx playwright test
```

The HTML report can be viewed using:

```bash
npx playwright show-report
```

---

## 4. Test Execution Results

The complete test suite was executed against two browser projects.

### Execution Summary

| Browser   | Executions | Passed | Failed | Skipped |
| --------- | ---------: | -----: | -----: | ------: |
| Chromium  |         30 |     30 |      0 |       0 |
| WebKit    |         30 |     30 |      0 |       0 |
| **Total** |     **60** | **60** |  **0** |   **0** |

### Result

**100% of automated test executions passed.**

No test failures or skipped tests were recorded during the final execution.

The suite completed in approximately **48.6 seconds**.

---

## 5. Key Functional Findings

During exploratory testing and automation development, the following application behaviours were identified and incorporated into the test coverage.

### Single-page Form

The form provides validation at both the form and individual field levels.

When mandatory fields are not completed:

* An error summary is displayed.
* Individual field-level error messages are displayed.
* Error summary links reference the relevant form fields.
* Selecting an error link navigates to the relevant field.
* Focus is moved to the appropriate field following validation.

The form also supports a conditional postal address behaviour. Selecting **"Same as street address"** hides the postal address fields.

The Period Active date fields are required. During exploratory testing, entering a start date later than the end date resulted in the application switching the dates.

Successful submission navigates the user to a separate success page containing:

* A success message
* Supporting information
* A reference number
* Information about what happens next
* Contact information

### Multi-page Form

The multi-page form uses a progressive workflow with multiple sections.

During exploratory testing:

* Some sections initially displayed a "cannot start yet" status.
* Attempting to access unavailable sections displayed an appropriate error message.
* The Conditional Fork section was available for progression.
* The first step requires a radio button selection.
* The evidence section requires a description and file upload.
* File uploads are restricted to supported image formats.
* Individual uploaded files cannot exceed 2 MB.
* Uploaded files can be removed.
* The date section requires a valid date.
* Selecting a specific option in the conditional section reveals an additional required field.
* The final step requires the user to agree to a declaration before submission.

These behaviours were used to define the automated test scenarios.

### Login

The Login page was tested for successful and unsuccessful authentication scenarios, including validation of required fields and invalid login behaviour.

The Forgot Password and Create Account links were also reviewed during exploratory testing. At the time of assessment, these links returned the user to the sign-in page rather than providing separate password recovery or account creation functionality.

This behaviour was treated as an observation of the supplied example application rather than an automation defect.

---

## 6. Accessibility Findings

The automated accessibility coverage identified and validated several positive characteristics of the application's implementation.

Examples include:

* Form controls have associated labels.
* Required fields expose appropriate required states.
* Invalid fields expose `aria-invalid`.
* Error messages are associated with their relevant controls.
* Error summary links reference the appropriate fields.
* Focus is moved to the relevant field or control following validation.
* Form controls expose accessible names.
* Relevant hints and validation messages are associated with form controls.

The application also demonstrates focus management following validation errors, which is particularly important for keyboard and assistive technology users.

### Accessibility Limitations

Automated browser testing cannot replace a complete accessibility assessment.

A production accessibility assessment should additionally include:

* Manual keyboard-only testing
* Screen reader testing
* Colour contrast verification
* Zoom and text resizing
* Focus visibility
* Browser and assistive technology combinations
* WCAG 2.2 AA assessment
* Testing of dynamic content announcements
* Review of error handling with assistive technologies

These areas were outside the primary scope of this automation assessment.

---

## 7. Risks and Limitations

The following limitations should be considered when interpreting the results.

### Example Application

The application under test is an example/design-system implementation rather than a production transactional service. Some functionality appears intentionally incomplete or demonstrative.

Examples include:

* Forgot Password functionality
* Create Account functionality
* Sections of the multi-page form that are not available for completion

These observations should not automatically be interpreted as production defects without confirmation of the intended requirements.

### Test Data

The automation suite uses static test data appropriate for the supplied example application.

A production implementation would require:

* Environment-specific test data
* Data isolation
* Test data creation and cleanup
* Consideration of data persistence
* Avoidance of shared data between parallel test executions

### Authentication

The current test suite uses the authentication behaviour available in the example application.

For a production application with multiple user types, authentication and authorisation would require additional coverage based on the permissions and responsibilities of each user role.

### Browser Coverage

The final execution covered:

* Chromium
* WebKit

Additional browser coverage should be considered for production, particularly:

* Google Chrome
* Microsoft Edge
* Safari
* Firefox

The required browser matrix should be determined based on the application's supported browsers and the organisation's user demographics.

### Accessibility

The automated accessibility checks provide targeted coverage but do not constitute a complete accessibility audit or WCAG compliance certification.

---

## 8. Production Considerations

Before executing this automation suite against a production application, several considerations would need to be addressed.

### Test Data

Production testing should avoid creating unintended or persistent business records.

Where possible:

* Use dedicated test accounts.
* Use controlled test data.
* Ensure test records can be identified and cleaned up.
* Avoid using real customer or personally identifiable information.
* Consider whether form submissions create irreversible business transactions.

### Authentication

Authentication credentials should never be hard-coded in the test source code.

Credentials should be managed using:

* CI/CD secret management
* Environment variables
* Secure credential stores

Authentication state should also be handled securely.

### Test Isolation

Tests should be independent and repeatable.

Parallel execution should be reviewed carefully where tests:

* Create records
* Modify shared data
* Upload files
* Use the same user account
* Depend on application state

### Production Safety

The test suite should distinguish between:

* Read-only validation
* Safe transactional testing
* Potentially destructive operations

Tests that create or modify production data should only be executed with explicit approval and appropriate safeguards.

### Test Execution Frequency

A suitable production strategy could include:

* Smoke tests after deployment
* Regression tests in pre-production
* Scheduled cross-browser tests
* API and integration testing earlier in the pipeline
* Targeted production monitoring rather than full end-to-end regression execution

### Environment Configuration

The test framework should support environment-specific configuration rather than embedding URLs directly into test cases.

For example:

```text
Development
Test
Staging
Production
```

Each environment should have appropriate test data and credentials.

---

## 9. Different Login Roles

If the production application supports multiple user roles, the automation strategy should be expanded to validate both authentication and authorisation.

Examples of potential roles include:

* Standard user
* Administrator
* Reviewer
* Approver
* Support user

Testing should verify:

* What each role can access
* What each role cannot access
* Role-specific navigation
* Role-specific form functionality
* Permissions at the UI and API levels
* Direct URL access restrictions
* Session expiry
* Logout behaviour
* Access after authentication state changes

Authentication should ideally be handled through reusable Playwright fixtures or stored authentication states where appropriate.

For example, separate authenticated states could be maintained for different roles:

```text
playwright/.auth/
├── standard-user.json
├── administrator.json
└── reviewer.json
```

These authentication states should never be committed to source control and should be generated or securely managed as part of the test environment.

The exact approach would depend on the application's authentication mechanism and security requirements.

---

## 10. Recommendations

Based on the testing performed, the following recommendations are made for a production implementation.

### 1. Expand Cross-browser Coverage

Include Firefox and Microsoft Edge in addition to Chromium and WebKit where they are supported by the target user base.

### 2. Integrate into CI/CD

Execute automated tests as part of the delivery pipeline.

A potential approach would be:

* Pull request: targeted smoke and API tests
* Build: functional regression tests
* Pre-production: full end-to-end regression
* Production deployment: targeted smoke tests

### 3. Increase API and Integration Coverage

Where APIs are available, move appropriate tests below the UI layer to improve execution speed and reliability.

The recommended test strategy should follow a balanced test pyramid, with:

* Unit tests
* API/service tests
* Integration tests
* UI end-to-end tests

### 4. Strengthen Accessibility Testing

Complement automated accessibility checks with:

* Manual accessibility testing
* Screen reader testing
* Keyboard testing
* WCAG 2.2 AA assessment

### 5. Improve Test Data Management

Introduce controlled and isolated test data management for production-like environments.

### 6. Introduce Environment Configuration

Externalise environment URLs, credentials and configuration to allow the same test suite to execute against multiple environments safely.

### 7. Improve Observability

Integrate test results with CI/CD reporting and retain:

* HTML reports
* Screenshots on failure
* Videos or traces where appropriate
* Test execution history

This would support faster failure investigation and trend analysis.

---

## 11. Overall Assessment

The final automated test execution achieved a **100% pass rate**, with all **60 browser-specific test executions** passing across Chromium and WebKit.

The automation suite provides functional coverage of the key assessment areas, including:

* Single-page form
* Multi-page form
* Login
* Selected accessibility scenarios

The automation also validates important user experience and accessibility behaviours, including error handling, error-to-field associations and focus management.

The current suite provides a solid foundation for regression testing of the example application. For a production implementation, further investment would be recommended in cross-browser coverage, environment management, test data management, API-level testing, role-based access testing and comprehensive accessibility assessment.

Overall, the automated test results provide confidence that the tested application flows behave as expected within the scope and environment covered by this assessment.
