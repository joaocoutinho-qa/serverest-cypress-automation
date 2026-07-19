import './commands'

beforeEach(() => {
  Cypress.env('authToken', null)
})

afterEach(() => {
  Cypress.env('authToken', null)
})