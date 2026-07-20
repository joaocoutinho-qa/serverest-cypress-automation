# Serverest Test Automation

Comprehensive test automation suite for Serverest using Cypress with enterprise-grade patterns, independent tests, robust API validations, and frontend automation.

## Features

- **08 Independent Tests** (4 API + 4 Frontend) with automatic teardown
- **3 Design Patterns**: ApiClient, PageObject, Singleton
- **Dynamic Data Generation** with Faker.js
- **API Testing** with status, body, and persistence validations
- **Frontend Automation** with cy.intercept() and standardized data-testid selectors
- **Security**: Environment variables for URLs and configurations
- **Zero Code Duplication**: Reusable methods and commands
- **Production-Ready**: Clean code following best practices

## Project Structure

```
cypress/
├── e2e/
│   ├── api/registerUser.cy.js          (API tests)
│   └── front/shoppingList.cy.js        (Frontend tests)
├── pageObjects/
│   ├── api/registerUserPage.js         (API methods)
│   ├── front/shoppingListPage.js       (UI methods)
│   ├── basePageObject.js               (removed)
│   └── exportPages.js                  (Canonical PageObjects registry)
├── support/
│   ├── apiClient.js                    (HTTP client)
│   ├── commands.js                     (Ccustom commands)

### Run Tests

```bash
npm test              # All tests
npm run test:api      # API tests
npm run test:frontend # Frontend tests
npm run test:ui       # Interactive mode
npm run test:headed   # With browser visible
npm run report        # Generate HTML report
```

## Environment Configuration

Create/update `.env` file:

```
SERVEREST_API_URL=https://serverest.dev
SERVEREST_FRONT_URL=https://front.serverest.dev
SERVEREST_API_TIMEOUT=10000
SERVEREST_MAX_RETRIES=3
NODE_ENV=test
```

## Tests Implemented

### API Tests (4 scenarios)
1. Register valid admin user and validate persistence
2. Attempt to register user with duplicate email
3. Attempt to register user with missing required field
4. Update user data after registration and validate changes

### Frontend Tests (4 scenarios)
1. Search for product and validate search results
2. Add single product to shopping cart and validate persistence
3. Add multiple products and clear entire cart
4. Update product quantity in cart and validate price

## Design Patterns

1. **ApiClient Pattern**: Centralized HTTP client with token management
2. **DataFactory Pattern**: Dynamic data generation with Faker.js
3. **PageObject Pattern**: Separation between test logic and UI/API
4. **Singleton Pattern**: Unique instances for efficient state management

## Custom Commands

- `apiLoginToken(email, password)` - Authenticate user and return token
- `apiRegisterUser(userData)` - Register user via API
- `apiCreateProduct(productData, token)` - Create product
- `apiDeleteProduct(productId, token)` - Delete product
- `createAuthenticatedUser(userData)` - Register and login a user (stores token/id in Cypress.env)
- `createProductsFromFixture()` - Create products from `cypress/fixtures/productsData.js` using admin token
- `uiLoginUser(email, password)` - UI login flow
- `uiLogoutUser()` - UI logout flow
- `cleanupTestData()` - Remove created products and users from the current test run

## Dependencies

- **cypress**: ^15.13.0 - Test framework
- **@faker-js/faker**: ^8.4.1 - Dynamic data generation
- **dotenv**: ^16.3.1 - Environment variables
- **mochawesome**: ^7.1.3 - HTML reports

## License

ISC

---

## Technologies Used

* **Cypress**: Core automation framework.
* **JavaScript**: Programming language.
* **Page Objects Model (POM)**: Design pattern for better code structure.
