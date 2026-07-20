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

  buildRequestConfig(method, endpoint, options = {}) {
    const config = {
      method,
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

    return config
  }

  post(endpoint, payload, options = {}) {
    return cy.request(this.buildRequestConfig('POST', endpoint, {
      body: payload,
      ...options,
    }))
  }

  get(endpoint, options = {}) {
    return cy.request(this.buildRequestConfig('GET', endpoint, options))
  }

  put(endpoint, payload, options = {}) {
    return cy.request(this.buildRequestConfig('PUT', endpoint, {
      body: payload,
      ...options,
    }))
  }

  delete(endpoint, options = {}) {
    return cy.request(this.buildRequestConfig('DELETE', endpoint, options))
  }
}

export default new ApiClient()
