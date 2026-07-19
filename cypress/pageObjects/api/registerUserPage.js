import apiClient from '../../support/apiClient'

class RegisterUserPage {
  registerUser(userData) {
    return apiClient.post('/usuarios', userData)
  }

  validateResponseStatus(response, expectedStatus) {
    expect(response.status).to.equal(expectedStatus)
    return response
  }

  validateResponseBodyHasId(response) {
    expect(response.body).to.have.property('_id')
    expect(response.body._id).to.not.be.empty
    return response.body._id
  }

  validateResponseHasMessage(response, message) {
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.include(message)
    return response
  }

  validateUserPersistence(userId, token) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('_id').equal(userId)
      return response.body
    })
  }

  validateResponseSchema(response) {
    expect(response.body).to.have.property('message').to.be.a('string')
    return response
  }

  loginUser(email, password) {
    return apiClient.post('/login', { email, password })
  }

  validateLoginToken(response) {
    expect(response.body).to.have.property('authorization').to.be.a('string')
    expect(response.body.authorization).to.not.be.empty
    return response.body.authorization
  }

  getUser(userId, token) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    })
  }

  updateUser(userId, userData, token) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      failOnStatusCode: false,
      body: userData,
      headers: {
        Authorization: token,
      },
    })
  }

  deleteUser(userId, token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    })
  }
}

export default new RegisterUserPage()
