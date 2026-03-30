import { element } from '../../support/locators'

class cartProducts {

    searchProductOnStore(product){
        cy.get(element.searchInput).type(product.nome)
        cy.get(element.searchButton).click()
    }
    
    validateSearchedProduct(product){
        cy.url().should('include', '/home')
        cy.get(element.productCard).should('have.length', 1)

        cy.get(element.productCard).first().within(() => {
            cy.get(element.productName).should('include.text', product.nome)
            cy.get(element.productPrice).should('include.text', `${product.preco}`)
        })
    }

    addProductToShoppingList(){
        cy.get(element.addProductToCart).click()
    }

    validateAddedProduct(product){
        cy.url().should('include', '/minhaListaDeProdutos')
        cy.get(element.productCard).should('have.length', 1)

        cy.get(element.productCard).first().within(() => {
            cy.get(element.productNameCart).should('include.text', product.nome)
            cy.get('p').should('include.text', `${product.preco}`)
            cy.get(element.productQuantity).should('include.text', '1')
        })
    }
    clearProductsFromShoppingList(){
        cy.get(element.clearProductList).click()
    }

    validateProductsCleared (){
        cy.url().should('include', '/minhaListaDeProdutos')

        cy.get(element.emptyListMessage)
            .should('be.visible')
            .and('include.text', 'Seu carrinho está vazio')
    }
}
export default new cartProducts()