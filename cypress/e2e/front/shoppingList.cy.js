import { pageObjects } from '../../pageObjects/exportPageObjects'
const { ShoppingListPage } = pageObjects
const shoppingListPage = ShoppingListPage

describe('Shopping List Frontend Tests', () => {
  let testUser

  beforeEach(() => {
    cy.fixture('userData').then((userData) => {
      testUser = userData.normalUser
    })

    shoppingListPage.setupInterceptors()
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(testUser.email)
    cy.get('[data-testid="senha"]').type(testUser.password)
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('include', '/home')
  })

  afterEach(() => {
    cy.get('[data-testid="sair"]').then(($logout) => {
      if ($logout.length > 0) {
        cy.wrap($logout).click()
      }
    })
  })

  it('Search for product and validate search results', () => {
    const searchTerm = 'mouse'

    shoppingListPage.searchProduct(searchTerm)
    shoppingListPage.validateSearchResults(searchTerm, 1)
  })

  it('Add single product to shopping cart and validate persistence', () => {
    const searchTerm = 'teclado'

    shoppingListPage.searchProduct(searchTerm)
    shoppingListPage.addProductToCart()
    shoppingListPage.navigateToCart()

    cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible')
    shoppingListPage.getCartItemCount().should('equal', 1)
  })

  it('Add multiple products and clear entire cart', () => {
    const products = ['mouse', 'teclado']

    products.forEach((product) => {
      shoppingListPage.searchProduct(product)
      shoppingListPage.addProductToCart()
      cy.visit('/home')
    })

    shoppingListPage.navigateToCart()
    shoppingListPage.clearCart()
    shoppingListPage.validateEmptyCart()
  })

  it('Remove individual product from cart', () => {
    shoppingListPage.searchProduct('mouse')
    shoppingListPage.addProductToCart()

    shoppingListPage.navigateToCart()
    shoppingListPage.getCartItemCount().should('equal', 1)

    shoppingListPage.removeProductFromCart(0)
    shoppingListPage.validateEmptyCart()
  })

  it('Update product quantity in cart', () => {
    shoppingListPage.searchProduct('mouse')
    shoppingListPage.addProductToCart()

    shoppingListPage.navigateToCart()
    shoppingListPage.validateProductQuantity(0, '1')

    shoppingListPage.incrementProductQuantity(0)
    shoppingListPage.validateProductQuantity(0, '2')

    shoppingListPage.decrementProductQuantity(0)
    shoppingListPage.validateProductQuantity(0, '1')
  })
})
