const { defineConfig } = require("cypress")
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',

    env: {
      apiUrl: process.env.SERVEREST_API_URL || 'https://serverest.dev',
      apiTimeout: parseInt(process.env.SERVEREST_API_TIMEOUT) || 10000,
      maxRetries: parseInt(process.env.SERVEREST_MAX_RETRIES) || 3,
    },

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 8000,

    setupNodeEvents(on, config) {
      return config
    },
  },
})