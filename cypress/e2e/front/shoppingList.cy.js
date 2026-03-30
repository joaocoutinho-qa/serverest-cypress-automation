/// <reference types="cypress" />
import shoppingListPage from "../../pageObjects/front/shoppingListPage"

beforeEach( function()  {
  cy.fixture('userData').as('data')
      cy.registerAdminUser()
      cy.registerNormalUser() 
      cy.adminUserLogin()
      cy.registerProduct()
      cy.normalUserLogin()
})

describe('Shopping List: UI', function () {
  it('Search for a product on store', function () {
    const product = this.data.validProduct
    shoppingListPage.searchProductOnStore(product)
    shoppingListPage.validateSearchedProduct(product)
  })

  it('Add a product to shopping list', function () {
    const product = this.data.validProduct
    shoppingListPage.searchProductOnStore(product)
    shoppingListPage.addProductToShoppingList()
    shoppingListPage.validateAddedProduct(product)
  })

  it('Clear the products from shopping list', function () {
    const product = this.data.validProduct
    shoppingListPage.searchProductOnStore(product)
    shoppingListPage.addProductToShoppingList()
    shoppingListPage.clearProductsFromShoppingList()
    shoppingListPage.validateProductsCleared()
  })

})