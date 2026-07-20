
import apiClient from './apiClient'

const API_URL = Cypress.env('apiUrl')
Cypress.Commands.add('apiRegisterUser', (userData) => apiClient.post('/usuarios', userData))

// Perform API login and return auth token
Cypress.Commands.add('apiLoginToken', (email, password) =>
  apiClient.post('/login', { email, password }).then((response) => {
    expect(response.status, 'login response status').to.equal(200)
    const token = response.body && response.body.authorization ? response.body.authorization : null
    expect(token, 'login token').to.be.a('string').and.not.be.empty
    return token
  })
)

// Register + login helper (stores ids/tokens in Cypress.env)
Cypress.Commands.add('createAuthenticatedUser', (userData) =>
  cy.apiRegisterUser(userData).then((registerResponse) => {
    expect(registerResponse.status).to.equal(201)
    const createdId = registerResponse.body._id
    return cy.apiLoginToken(userData.email, userData.password).then((token) => {
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
)

//Create product via API
Cypress.Commands.add('apiCreateProduct', (productData, token) =>
  cy.request({
    method: 'POST',
    url: `${API_URL}/produtos`,
    failOnStatusCode: false,
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: productData,
  })
)

Cypress.Commands.add('apiDeleteProduct', (productId, token) =>
  cy.request({ method: 'DELETE', url: `${API_URL}/produtos/${productId}`, failOnStatusCode: false, headers: { Authorization: token } })
)

// Create single product and normalize fields
Cypress.Commands.add('createProduct', (productData, token = Cypress.env('adminToken')) =>
  cy.apiCreateProduct(productData, token).then((response) => {
    expect(response.status).to.equal(201)
    const apiId = response.body._id || response.body.produto?._id
    const created = {
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
)

// Create products from fixture (keeps alias @products)
Cypress.Commands.add('createProductsFromFixture', (token = Cypress.env('adminToken')) => {
  const getFreshData = require('../fixtures/productsData')
  const { products } = getFreshData()

  expect(products, 'products fixture').to.be.an('array').and.have.lengthOf.at.least(1);
  expect(token, 'admin token for product creation').to.be.a('string').and.not.be.empty;

  const created = []
  
  products.forEach((p) => {
    const apiProduct = { 
      nome: p.name || p.nome, 
      preco: p.price || p.preco, 
      descricao: p.description || p.descricao, 
      quantidade: p.quantity || p.quantidade 
    }
    
    cy.createProduct(apiProduct, token).then((res) => {
      created.push(res)
    })
  })

  return cy.wrap(created).as('products')
})

//Cleanup test data: delete created products, users, and reset env variables
Cypress.Commands.add('cleanupTestData', () => {
  const products = Cypress.env('createdProducts') || []
  const token    = Cypress.env('adminToken') || Cypress.env('authToken')
  const userId   = Cypress.env('createdUserId')
  const adminId  = Cypress.env('createdAdminId')

  //Delete all products
  products.forEach((product) => {
    cy.apiDeleteProduct(product._id, token)
  })

  //Delete normal user
  if (userId && token) {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${userId}`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    })
  }

 //Delete admin user
  if (adminId && token) {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${adminId}`,
      failOnStatusCode: false,
      headers: { Authorization: token }
    })
  }

  //Clean variables
  cy.then(() => {
    Cypress.env('createdProducts', [])
    Cypress.env('createdUserId', null)
    Cypress.env('createdAdminId', null)
    Cypress.env('authToken', null)
    Cypress.env('adminToken', null)
  })
})

// UI login command
Cypress.Commands.add('uiLoginUser', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid="email"]').clear().type(email)
  cy.get('[data-testid="senha"]').clear().type(password)
  cy.get('[data-testid="entrar"]').click()
  cy.url().should('include', '/home')
})