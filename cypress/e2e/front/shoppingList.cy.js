import userData from '../../fixtures/userData'
import Pages from '../../support/exportPages'
const shoppingListPage = Pages.ShoppingListPage

describe('Shopping List Frontend Tests', () => {
  beforeEach(() => {
    shoppingListPage.setupInterceptors()
    cy.uiLoginUser(userData.normalUser.email, userData.normalUser.password)
  })

  it('Search for product and validate search results', () => {
    const mockedProduct = Cypress.env('createdProducts')[0]

    shoppingListPage.searchProduct(mockedProduct.nome)
    shoppingListPage.validateSearchResults(mockedProduct.nome)
  })

  it('Add single product to shopping list and validate persistence', () => {
    const mockedProduct = Cypress.env('createdProducts')[0]

    shoppingListPage.searchProduct(mockedProduct.nome)
    shoppingListPage.addProductToShoppingList()
    shoppingListPage.validateProductInShoppingList(mockedProduct.nome, mockedProduct.preco)
    shoppingListPage.getCartItemCount().should('equal', 1)
  })

  it('Add multiple products and clear entire cart', () => {
    const [product1, product2] = Cypress.env('createdProducts')

    [product1, product2].forEach((product) => {
      shoppingListPage.navigateToHome()
      shoppingListPage.searchProduct(product.nome)
      shoppingListPage.addProductToShoppingList()
    })

    shoppingListPage.navigateToShoppingList()
    shoppingListPage.clearShoppingList()
    shoppingListPage.validateEmptyList()
  })

  it('Update product quantity in cart and validate price', () => {
    const mockedProduct = Cypress.env('createdProducts')[0]

    shoppingListPage.searchProduct(mockedProduct.nome)
    shoppingListPage.addProductToShoppingList()

    shoppingListPage.navigateToShoppingList()
    shoppingListPage.validateProductQuantity(0, '1')

    shoppingListPage.incrementProductQuantity(0)
    shoppingListPage.validateProductQuantity(0, '2')
    shoppingListPage.validateProductPrice(mockedProduct.preco * 2)
  })
})
