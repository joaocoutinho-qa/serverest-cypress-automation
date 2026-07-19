import apiClient from './apiClient'

const API_URL = Cypress.env('apiUrl')

// Register user via API
Cypress.Commands.add('apiRegisterUser', (userData) => {
  return apiClient.post('/usuarios', userData)
})

// User authentication
Cypress.Commands.add('apiLogin', (email, password) => {
  return apiClient.post('/login', {
    email,
    password,
  }).then((response) => {
    if (response.status === 200 && response.body.authorization) {
      apiClient.setToken(response.body.authorization)
      Cypress.env('authToken', response.body.authorization)
    }
    return response
  })
})

// Create product via API
Cypress.Commands.add('apiCreateProduct', (productData, token) => {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/produtos`,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: productData,
  })
})

// List all products
Cypress.Commands.add('apiListProducts', (token) => {
  return cy.request({
    method: 'GET',
    url: `${API_URL}/produtos`,
    failOnStatusCode: false,
    headers: {
      Authorization: token,
    },
  })
})

// Delete product via API
Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
  return cy.request({
    method: 'DELETE',
    url: `${API_URL}/produtos/${productId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: token,
    },
  })
})

// Get user information by ID
Cypress.Commands.add('apiGetUserById', (userId, token) => {
  return cy.request({
    method: 'GET',
    url: `${API_URL}/usuarios/${userId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: token,
    },
  })
})

// UI login flow
Cypress.Commands.add('uiLoginUser', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').clear().type(email)
  cy.get('[data-testid="senha"]').clear().type(password)
  cy.get('[data-testid="entrar"]').click()
  cy.url().should('include', '/home')
})

// UI logout flow
Cypress.Commands.add('uiLogoutUser', () => {
  cy.get('[data-testid="sair"]').click()
  cy.url().should('include', '/login')
})

// Cleanup: remove all test users
Cypress.Commands.add('cleanupUsers', () => {
  const token = Cypress.env('authToken')
  if (token) {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios`,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    })
  }
})

// Cleanup: remove all test products
Cypress.Commands.add('cleanupProducts', () => {
  const token = Cypress.env('authToken')
  if (token) {
    cy.apiListProducts(token).then((response) => {
      if (response.status === 200 && response.body.produtos) {
        response.body.produtos.forEach((product) => {
          cy.apiDeleteProduct(product._id, token)
        })
      }
    })
  }
})
