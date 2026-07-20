class ApiClient {
  constructor(baseUrl = Cypress.env('apiUrl'), timeout = Cypress.env('apiTimeout')) {
    this.baseUrl = baseUrl
    this.timeout = timeout
    this.token = null
  }

  setToken(token) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  post(endpoint, payload, options = {}) {
    const config = {
      method: 'POST',
      url: `${this.baseUrl}${endpoint}`,
      failOnStatusCode: false,
      body: payload,
      timeout: this.timeout,
      ...options,
    }

    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: this.token,
      }
    }

    return cy.request(config)
  }

  get(endpoint, options = {}) {
    const config = {
      method: 'GET',
      url: `${this.baseUrl}${endpoint}`,
      failOnStatusCode: false,
      timeout: this.timeout,
      ...options,
    }

    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: this.token,
      }
    }

    return cy.request(config)
  }

  put(endpoint, payload, options = {}) {
    const config = {
      method: 'PUT',
      url: `${this.baseUrl}${endpoint}`,
      failOnStatusCode: false,
      body: payload,
      timeout: this.timeout,
      ...options,
    }

    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: this.token,
      }
    }

    return cy.request(config)
  }

}

export default new ApiClient()
