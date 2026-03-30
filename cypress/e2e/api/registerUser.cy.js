import registerUserPage from "../../pageObjects/registerUserPage"

beforeEach( function()  {
  cy.fixture('userData').as('data')
})

describe('User registratior: API', function()  {

  it('Register user with valid credentials', function() {
    const validUser = this.data.validCredentials
    registerUserPage.sendAPIdata(validUser).then((response) => {
      registerUserPage.validateAPIresponse(response, 201)
    })
  })

  it('Try to register user with already registered email', function() {
    const validUser = this.data.validCredentials
    registerUserPage.sendAPIdata(validUser).then((response) => {
      registerUserPage.validateAPIresponse(response, 400)
    })
  })

  it('Register user without entering a name', function() {
    const invalidUser = this.data.invalidCredentials
    registerUserPage.sendAPIdata(invalidUser).then((response) => {
      registerUserPage.validateAPIresponse(response, 400)
    })

  })
})
