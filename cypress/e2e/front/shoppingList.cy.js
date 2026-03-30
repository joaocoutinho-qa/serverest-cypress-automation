/// <reference types="cypress" />
import shoppingListPage from "../../pageObjects/shoppingListPage"

beforeEach( function()  {
  cy.fixture('userData').as('data')
  cy.registerAdminUser()
  cy.adminUserLogin()
  cy.registerProduct()
  cy.visit('/')
})

describe('Shopping List: UI', function () {
  it.only('Search for a product on store', function () {  
    shoppingListPage.searchProductOnStore()
  })

  it('Add a product to the shopping list', function () {
    shoppingListPage.addProductToShoppingList()
  })

  it('Remove a product from the shopping list', function () {
    shoppingListPage.removeProductFromShoppingList()
  })

})