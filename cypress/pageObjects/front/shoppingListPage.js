import BasePageObject from '../basePageObject'
import productsData from '../../fixtures/productsData'

class ShoppingListPage extends BasePageObject {
  constructor() {
    super()
    this.selectors = {
      searchInput:         '[data-testid="pesquisar"]',
      searchButton:        '[data-testid="botaoPesquisar"]',
      productCard:         '.card-body',
      productName:         '.card-title.negrito',
      productPrice:        '[data-testid="product-price"]',
      addToCartButton:     '[data-testid="adicionarNaLista"]',
      cartProductName:     '[data-testid="shopping-cart-product-name"]',
      cartProductQuantity: '[data-testid="shopping-cart-product-quantity"]',
      cartProductPrice:    '[data-testid="shopping-cart-product-price"]',
      clearCartButton:     '[data-testid="limparLista"]',
      emptyMessage:        '[data-testid="shopping-cart-empty-message"]',
      shoppingListTab:     '[data-testid="lista-de-compras"]',
      homeTab:             '[data-testid="home"]',
      removeButton:        '[data-testid="remove-item"]',
      quantityIncrement:   '[data-testid="product-increase-quantity"]',
      quantityDecrement:   '[data-testid="product-decrease-quantity"]',
    }
  }

  setupInterceptors() {
    cy.intercept('GET', '**/produtos*', (req) => {
      const createdProducts = Cypress.env('createdProducts') || productsData.produtos
      req.reply({
        statusCode: 200,
        body: {
          produtos: createdProducts,
        },
      })
    }).as('getProducts')
  }

  searchProduct(productName) {
    cy.get(this.selectors.searchInput).clear().type(productName)
    cy.get(this.selectors.searchButton).click()
  }

  validateSearchResults(productName) {
    cy.get(this.selectors.productCard).should('have.length.greaterThan', 0)
    cy.get(this.selectors.productCard).first().within(() => {
      cy.get(this.selectors.productName).should('contain', productName)
    })
  }

  addProductToShoppingList() {
    cy.get(this.selectors.addToCartButton).first().click()
    cy.wait('@getProducts')
  }

  validateProductInShoppingList(productName, price) {
    cy.url().should('include', '/minhaListaDeProdutos')

    cy.get(this.selectors.productCard)
      .first()
      .should('contain', productName)

    cy.get(this.selectors.productCard)
      .first()
      .should('contain', `R$${price}`)
  }

  getCartItemCount() {
    return cy.get(this.selectors.cartProductName).its('length')
  }

  clearCart() {
    cy.get(this.selectors.clearCartButton).click()
  }

  validateEmptyCart() {
    cy.url().should('include', '/minhaListaDeProdutos')
    cy.get(this.selectors.emptyMessage)
      .should('be.visible')
      .and('contain', 'Seu carrinho está vazio')
    cy.get(this.selectors.cartProductName).should('not.exist')
  }

  removeProductFromCart(index = 0) {
    cy.get(this.selectors.removeButton).eq(index).click()
  }

  incrementProductQuantity(index = 0) {
    cy.get(this.selectors.quantityIncrement).eq(index).click()
  }

  decrementProductQuantity(index = 0) {
    cy.get(this.selectors.quantityDecrement).eq(index).click()
  }

  validateProductQuantity(index, expectedQuantity) {
    cy.get(this.selectors.cartProductQuantity)
      .eq(index)
      .should('contain', expectedQuantity)
  }

  validateProductPrice(price) {
    cy.get(this.selectors.productCard)
      .should('contain', price)
  }

  navigateToShoppingList() {
    cy.get(this.selectors.shoppingListTab).click()
  }

  navigateToHome() {
    cy.get(this.selectors.homeTab).click()
  }

}

export default new ShoppingListPage()
