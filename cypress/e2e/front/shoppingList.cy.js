import userData from '../../fixtures/userData'
import Pages from '../../support/exportPages'
const shoppingListPage = Pages.ShoppingListPage

describe('Shopping List Frontend Tests', () => {
  beforeEach(() => {
    shoppingListPage.setupInterceptors()
    cy.createAuthenticatedUser(userData.adminUser)
    cy.createProductsFromFixture()
    cy.createAuthenticatedUser(userData.normalUser)
    cy.uiLoginUser(userData.normalUser.email, userData.normalUser.password)
  })

  afterEach(() => {
    cy.cleanupTestData()
  })

  it('Search for product and validate search results', () => {
    cy.get('@products').then((products) => {
      const createdProduct = products[0]
      shoppingListPage.searchProduct(createdProduct.name)
      shoppingListPage.validateSearchResults(createdProduct.name)
    })
  })

  it('Add single product to shopping list and validate persistence', () => {
    cy.get('@products').then((products) => {
      const createdProduct = products[0]
      shoppingListPage.searchProduct(createdProduct.name)
      shoppingListPage.addProductToShoppingList()
      shoppingListPage.validateProductInShoppingList(createdProduct.name, createdProduct.price)
      shoppingListPage.getCartItemCount().should('equal', 1)
    })
  })

  it('Add multiple products and clear entire cart', () => {
    cy.get('@products').then((products) => {
      const product1 = products[0]
      const product2 = products[1];
      
      [product1, product2].forEach((product) => {
        shoppingListPage.navigateToHome()
        shoppingListPage.searchProduct(product.name)
        shoppingListPage.addProductToShoppingList()
      })

      shoppingListPage.navigateToShoppingList()
      shoppingListPage.clearShoppingList()
      shoppingListPage.validateEmptyList()
    })
  })

  it('Update product quantity in cart and validate price', () => {
    cy.get('@products').then((products) => {
      const createdProduct = products[0]
      shoppingListPage.searchProduct(createdProduct.name)
      shoppingListPage.addProductToShoppingList()

      shoppingListPage.navigateToShoppingList()
      shoppingListPage.validateProductQuantity(0, '1')

      shoppingListPage.incrementProductQuantity(0)
      shoppingListPage.validateProductQuantity(0, '2')
      shoppingListPage.validateProductPrice(createdProduct.price*2)
    })
  })
})
