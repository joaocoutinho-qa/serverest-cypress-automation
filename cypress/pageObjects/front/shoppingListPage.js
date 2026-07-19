import BasePageObject from '../basePageObject'

class ShoppingListPage extends BasePageObject {
  constructor() {
    super()
    this.selectors = {
      searchInput: '[data-testid="pesquisar"]',
      searchButton: '[data-testid="botaoPesquisar"]',
      productCard: '[data-testid="product-card"]',
      productName: '[data-testid="product-name"]',
      productPrice: '[data-testid="product-price"]',
      addToCartButton: '[data-testid="adicionarNaLista"]',
      cartProductName: '[data-testid="shopping-cart-product-name"]',
      cartProductQuantity: '[data-testid="shopping-cart-product-quantity"]',
      cartProductPrice: '[data-testid="shopping-cart-product-price"]',
      clearCartButton: '[data-testid="limparLista"]',
      emptyMessage: '[data-testid="shopping-cart-empty-message"]',
      cartIcon: '[data-testid="cart-icon"]',
      removeButton: '[data-testid="remove-item"]',
      quantityIncrement: '[data-testid="quantity-increment"]',
      quantityDecrement: '[data-testid="quantity-decrement"]',
    }
  }

  setupInterceptors() {
    return cy.fixture('productsData').then((data) => {
      cy.intercept('GET', '**/produtos*', { body: data.produtos }).as('getProducts')
    }).then(() => {
      cy.intercept('GET', '**/minhaListaDeProdutos*').as('getCart')
      cy.intercept('POST', '**/carrinhos/**').as('addToCart')
      cy.intercept('DELETE', '**/carrinhos/**').as('removeFromCart')
    })
  }

  searchProduct(productName) {
    cy.get(this.selectors.searchInput).clear().type(productName)
    cy.get(this.selectors.searchButton).click()
    cy.wait('@getProducts')
  }

  validateSearchResults(productName, expectedCount) {
    cy.get(this.selectors.productCard).should('have.length', expectedCount)
    cy.get(this.selectors.productCard).first().within(() => {
      cy.get(this.selectors.productName).should('contain', productName)
    })
  }

  addProductToCart() {
    cy.get(this.selectors.addToCartButton).first().click()
    cy.wait('@addToCart')
  }

  validateProductInCart(productName, price) {
    cy.url().should('include', '/minhaListaDeProdutos')
    cy.get(this.selectors.cartProductName)
      .first()
      .should('contain', productName)
    cy.get(this.selectors.cartProductPrice)
      .first()
      .should('contain', price)
  }

  getCartItemCount() {
    return cy.get(this.selectors.cartProductName).its('length')
  }

  clearCart() {
    cy.get(this.selectors.clearCartButton).click()
    cy.wait('@removeFromCart')
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
    cy.wait('@removeFromCart')
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

  navigateToCart() {
    cy.get(this.selectors.cartIcon).click()
    cy.wait('@getCart')
  }
}

export default new ShoppingListPage()
