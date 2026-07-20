# Serverest Test Automation

Test automation suite for the Serverest project using Cypress.

## Overview

This repository contains consolidated API and frontend tests, with dynamic data and project patterns designed for clarity, reuse, and isolation between test cases.

## Project Structure

cypress/
├── e2e/
│   ├── api/registerUser.cy.js          # API tests for user registration and update
│   └── front/shoppingList.cy.js        # Frontend tests for the shopping list
├── fixtures/
│   ├── productsData.js                # Dynamic product data generated with Faker
│   └── userData.js                    # User data with unique emails per run
├── pageObjects/
│   ├── api/registerUserPage.js        # API methods and user validation helpers
│   └── front/shoppingListPage.js      # UI methods and selectors for shopping list flows
└── support/
    ├── apiClient.js                   # Centralized HTTP client for API calls
    ├── commands.js                    # Custom Cypress commands
    └── exportPages.js                 # Exports PageObject instances

## Available Commands

```bash
npm test             # Run all tests headless and generate mochawesome report
npm run cypress:run  # Run Cypress headless with mochawesome reporter
npm run test:ui      # Open Cypress Test Runner
npm run clean:report # Remove the report directory
npm run report:merge # Merge mochawesome JSON reports
npm run report:gen   # Generate HTML report from merged JSON
```

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
SERVEREST_API_URL=https://serverest.dev
SERVEREST_FRONT_URL=https://front.serverest.dev
SERVEREST_API_TIMEOUT=10000
SERVEREST_MAX_RETRIES=3
NODE_ENV=test
```

The `cypress.config.js` file loads this `.env` using `dotenv` and exposes `apiUrl`, `apiTimeout`, and `maxRetries` for the test configuration.

## Implemented Tests

### API
- Register a valid user and validate persistence
- Attempt to register a user with a duplicate email
- Attempt to register a user with a missing email field
- Update user data after registration and validate the change

### Frontend
- Search for a product and validate search results
- Add a single product to the shopping list and validate persistence
- Add multiple products and clear the shopping list
- Update a product quantity in the cart and validate the price

## Design Patterns and Best Practices

- `ApiClient`: centralized HTTP client in `cypress/support/apiClient.js`
- `Page Object`: `cypress/pageObjects/` structure separates test logic from application interaction
- `Custom Commands`: encapsulate common flows in `cypress/support/commands.js`
- `Dynamic Data`: `cypress/fixtures/productsData.js` generates products with Faker to avoid collisions and state dependency
- `Isolation`: each test creates its own data and performs cleanup via `cleanupTestData()`

## Important Custom Commands

- `cy.apiRegisterUser(userData)`
- `cy.apiLoginToken(email, password)`
- `cy.createAuthenticatedUser(userData)`
- `cy.apiCreateProduct(productData, token)`
- `cy.createProductsFromFixture()`
- `cy.cleanupTestData()`
- `cy.uiLoginUser(email, password)`

## Main Dependencies

- cypress ^15.18.1
- @faker-js/faker ^8.4.1
- dotenv ^16.3.1
- mochawesome ^7.1.3
- mochawesome-merge ^4.3.0
- mochawesome-report-generator ^6.2.0
- rimraf ^6.1.3

## Report Output Structure

Reports are generated in `cypress/report/` as JSON and HTML.

## Notes

- The project does not include `test:api` or `test:frontend` scripts in `package.json`.
- `npm test` runs the full suite and generates the final report.
