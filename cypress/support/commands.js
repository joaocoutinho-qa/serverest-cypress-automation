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

// Login and return token without mutating global env
Cypress.Commands.add('apiLoginToken', (email, password) => {
  return apiClient.post('/login', { email, password }).then((response) => {
    return response.body && response.body.authorization ? response.body.authorization : null
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

// Create and login a normal user (keeps authToken in Cypress.env)
// Create user (admin or normal) and return { userId, token }
Cypress.Commands.add('createAuthenticatedUser', (userData) => {
  return cy.apiRegisterUser(userData).then((registerResponse) => {
    expect(registerResponse.status).to.equal(201)
    const createdId = registerResponse.body._id

    // login to obtain token
    return cy.apiLoginToken(userData.email, userData.password).then((token) => {
      // if user is admin (string 'true' or boolean true), store as admin
      const isAdmin = userData.administrador === true || userData.administrador === 'true'
      if (isAdmin) {
        Cypress.env('createdAdminId', createdId)
        Cypress.env('adminToken', token)
      } else {
        Cypress.env('createdUserId', createdId)
        Cypress.env('authToken', token)
      }
      return cy.wrap({ userId: createdId, token })
    })
  })
})

// Minimal: create a single product via API and track it for cleanup
Cypress.Commands.add('createProduct', (productData, token = Cypress.env('adminToken')) => {
  return cy.apiCreateProduct(productData, token).then((response) => {
    expect(response.status).to.equal(201)
    const apiId = response.body._id || response.body.produto?._id
    // Normalize returned product to include both Portuguese and English fields
    const created = {
      // keep original api fields when present
      _id: apiId,
      id: apiId,
      nome: productData.nome || productData.name,
      name: productData.name || productData.nome,
      preco: productData.preco || productData.price,
      price: productData.price || productData.preco,
      descricao: productData.descricao || productData.description,
      description: productData.description || productData.descricao,
      quantidade: productData.quantidade || productData.quantity,
      quantity: productData.quantity || productData.quantidade,
    }
    const existing = Cypress.env('createdProducts') || []
    Cypress.env('createdProducts', [...existing, created])
    return cy.wrap(created)
  })
})

// Create products from fixture (productsData.js) using admin token
Cypress.Commands.add('createProductsFromFixture', (token = Cypress.env('adminToken')) => {
  return cy.fixture('productsData').then((fixture) => {
    // support fixture in English: { products: [ { name, price, description, quantity } ] }
    const products = fixture.products || fixture.produtos || []
    const created = []

    const createNext = (index) => {
      if (index >= products.length) return cy.wrap(created)
      // map English fixture fields to API expected Portuguese fields
      const fixtureProduct = products[index]
      const apiProduct = {
        nome: fixtureProduct.name || fixtureProduct.nome,
        preco: fixtureProduct.price || fixtureProduct.preco,
        descricao: fixtureProduct.description || fixtureProduct.descricao,
        quantidade: fixtureProduct.quantity || fixtureProduct.quantidade,
      }
      return cy.createProduct(apiProduct, token).then((p) => {
        created.push(p)
        return createNext(index + 1)
      })
    }

    return createNext(0).then((res) => {
      // alias created products for simpler access in tests
      return cy.wrap(res).as('products')
    })
  })
})

// Create an admin user and store admin token + id in env for tests
// (createAdminUser removed — use createAuthenticatedUser with admin payload)

// Cleanup created products and users using admin token when available
Cypress.Commands.add('cleanupTestData', () => {
  const productIds = (Cypress.env('createdProducts') || []).map((p) => p._id)
  const token = Cypress.env('adminToken') || Cypress.env('authToken')
  const userId = Cypress.env('createdUserId')
  const adminId = Cypress.env('createdAdminId')

  const deleteProducts = (index) => {
    if (index >= productIds.length) return cy.wrap(null)
    return cy.apiDeleteProduct(productIds[index], token).then(() => deleteProducts(index + 1))
  }

  return deleteProducts(0).then(() => {
    if (userId && token) {
      return cy.request({
        method: 'DELETE',
        url: `${API_URL}/usuarios/${userId}`,
        failOnStatusCode: false,
        headers: { Authorization: token },
      })
    }
    return cy.wrap(null)
  }).then(() => {
    if (adminId && token) {
      return cy.request({
        method: 'DELETE',
        url: `${API_URL}/usuarios/${adminId}`,
        failOnStatusCode: false,
        headers: { Authorization: token },
      })
    }
    return cy.wrap(null)
  }).then(() => {
    Cypress.env('createdProducts', [])
    Cypress.env('createdUserId', null)
    Cypress.env('createdAdminId', null)
    Cypress.env('authToken', null)
    Cypress.env('adminToken', null)
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
    cy.request({
      method: 'GET',
      url: `${API_URL}/produtos`,
      failOnStatusCode: false,
      headers: { Authorization: token },
    }).then((response) => {
      if (response.status === 200 && response.body.produtos) {
        response.body.produtos.forEach((product) => {
          cy.apiDeleteProduct(product._id, token)
        })
      }
    })
  }
})
