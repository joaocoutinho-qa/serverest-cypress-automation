# Serverest Test Automation

Comprehensive test automation suite for Serverest using Cypress with enterprise-grade patterns, independent tests, robust API validations, and frontend automation.

## Features

- **10 Independent Tests** (5 API + 5 Frontend) with automatic teardown
- **4 Design Patterns**: ApiClient, BasePageObject, PageObject, Singleton
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
│   ├── api/registerUser.cy.js          (5 API tests)
│   └── front/shoppingList.cy.js        (5 Frontend tests)
├── pageObjects/
│   ├── api/registerUserPage.js         (11 API methods)
│   ├── front/shoppingListPage.js       (13 UI methods)
│   ├── basePageObject.js               (Base class)
│   └── exportPageObjects.js            (PageObjects registry)
├── support/
│   ├── apiClient.js                    (HTTP client)
│   ├── commands.js                     (10 custom commands)
│   └── e2e.js                          (Global hooks)
└── fixtures/
    ├── userData.js                     (Test user data)
    └── productsData.js                 (Mock product data)
```

## Quick Start

### Installation

```bash
npm install
```

### Run Tests

```bash
npm test              # All 10 tests
npm run test:api      # 5 API tests
npm run test:frontend # 5 Frontend tests
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

### API Tests (5 scenarios)
1. Register valid admin user and validate persistence
2. Attempt to register user with duplicate email
3. Register user and validate authentication flow
4. Attempt to register user with missing required field
5. Update user data after registration and validate changes

### Frontend Tests (5 scenarios)
1. Search for product and validate search results
2. Add single product to shopping cart and validate persistence
3. Add multiple products and clear entire cart
4. Remove individual product from cart
5. Update product quantity in cart

## Design Patterns

1. **ApiClient Pattern**: Centralized HTTP client with token management
2. **DataFactory Pattern**: Dynamic data generation with Faker.js
3. **BasePageObject Pattern**: Reusable base class with common methods
4. **PageObject Pattern**: Separation between test logic and UI/API
5. **Singleton Pattern**: Unique instances for efficient state management

## Custom Commands

- `apiRegisterUser(userData)` - Register user via API
- `apiLogin(email, password)` - Authenticate user
- `apiCreateProduct(productData, token)` - Create product
- `apiListProducts(token)` - List all products
- `apiDeleteProduct(productId, token)` - Delete product
- `apiGetUserById(userId, token)` - Get user information
- `uiLoginUser(email, password)` - UI login flow
- `uiLogoutUser()` - UI logout flow
- `cleanupUsers()` - Remove test users
- `cleanupProducts()` - Remove test products

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
