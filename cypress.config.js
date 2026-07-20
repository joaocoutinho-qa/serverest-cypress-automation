const { defineConfig } = require('cypress')
require('dotenv').config()

const maxRetries = parseInt(process.env.SERVEREST_MAX_RETRIES, 10) || 3

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.SERVEREST_FRONT_URL,

    env: {
      apiUrl: process.env.SERVEREST_API_URL,
      apiTimeout: parseInt(process.env.SERVEREST_API_TIMEOUT, 10) || 10000,
      maxRetries,
    },

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: maxRetries,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      return config
    },
  },
})