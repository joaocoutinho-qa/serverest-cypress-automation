# Serverest Test Automation

Automated test suite for the Serverest application using Cypress.

## Overview

This repository contains API and frontend tests for Serverest with dynamic test data, page object structure, and reusable Cypress commands.

## Project Structure

```text
cypress/
├── e2e/
│   ├── api/registerUser.cy.js      # API tests for user registration and update
│   └── front/shoppingList.cy.js    # Frontend tests for the shopping list flow
├── fixtures/
│   ├── productsData.js             # Dynamic product fixture generation with Faker
│   └── userData.js                 # User fixture data with unique emails per run
├── pageObjects/
│   ├── api/registerUserPage.js     # API methods and response validation helpers
│   └── front/shoppingListPage.js   # UI methods and selectors for shopping list flows
└── support/
    ├── apiClient.js                # Centralized HTTP client for API requests
    ├── commands.js                 # Custom Cypress commands
    └── exportPages.js              # PageObject exports
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
SERVEREST_API_URL=https://serverest.dev
SERVEREST_FRONT_URL=https://front.serverest.dev
SERVEREST_API_TIMEOUT=10000
SERVEREST_MAX_RETRIES=3
NODE_ENV=test
```

3. Run tests:

```bash
npm test
```

## Available Scripts

```bash
npm test             # Run all tests headless and generate mochawesome report
npm run cypress:run  # Run Cypress headless with mochawesome reporter
npm run test:ui      # Open Cypress Test Runner
npm run clean:report # Remove the report directory
npm run report:merge # Merge mochawesome JSON reports
npm run report:gen   # Generate HTML report from merged JSON
```

## Implemented Tests

### API
- Register a valid user and verify persistence
- Attempt to register a user with a duplicate email
- Attempt to register a user with a missing email field
- Update user data after registration and verify the update

### Frontend
- Search for a product and verify search results
- Add a single product to the shopping list and verify persistence
- Add multiple products and clear the shopping list
- Update product quantity in the cart and verify the price

## Design Patterns and Best Practices

- `ApiClient`: centralized HTTP client in `cypress/support/apiClient.js`
- `Page Object`: page object structure in `cypress/pageObjects/`
- `Custom Commands`: reusable commands in `cypress/support/commands.js`
- `Dynamic Data`: product fixtures generated with Faker to avoid collisions
- `Isolation`: tests create and clean data in `cleanupTestData()`

## Important Custom Commands

- `cy.apiRegisterUser(userData)`
- `cy.apiLoginToken(email, password)`
- `cy.createAuthenticatedUser(userData)`
- `cy.apiCreateProduct(productData, token)`
- `cy.createProductsFromFixture()`
- `cy.cleanupTestData()`
- `cy.uiLoginUser(email, password)`

## Dependencies

- cypress ^15.18.1
- @faker-js/faker ^8.4.1
- dotenv ^16.3.1
- mochawesome ^7.1.3
- mochawesome-merge ^4.3.0
- mochawesome-report-generator ^6.2.0
- rimraf ^6.1.3

## Report Output

Test results are generated in `cypress/report/` as JSON and HTML files.

## Notes

- The project does not include `test:api` or `test:frontend` scripts in `package.json`.
- `npm test` runs the full suite and generates the final report.
