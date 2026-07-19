class BasePageObject {
  visit(path = '/') {
    cy.visit(path)
  }

  wait(timeout) {
    cy.wait(timeout)
  }

  getText(selector) {
    return cy.get(selector).invoke('text')
  }

  isVisible(selector) {
    return cy.get(selector).should('be.visible')
  }

  click(selector) {
    cy.get(selector).click()
  }

  type(selector, text) {
    cy.get(selector).clear().type(text)
  }

  shouldContainText(selector, text) {
    cy.get(selector).should('include.text', text)
  }

  shouldHaveLength(selector, length) {
    cy.get(selector).should('have.length', length)
  }
}

export default BasePageObject
