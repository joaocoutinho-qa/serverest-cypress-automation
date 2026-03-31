# Serverest Automation Project

This repository contains an automated testing suite for the Serverest application, covering both API and Front-end scenarios using Cypress.

---

## Project Structure

The project follows a modular organization to ensure maintainability:

* **cypress/e2e**: Test scripts organized by context (API and Front-end).
* **cypress/fixtures**: Static data files, such as `userData.js`, used for test inputs.
* **cypress/pageObjects**: Page classes that map elements and actions, separating logic from test scripts.
* **cypress/support**: Custom commands (`commands.js`), global configurations (`e2e.js`), and element selectors (`locators.js`).
* **cypress.config.js**: The main configuration file for the Cypress framework.

---

## Prerequisites

To run this project, you need:

1. **Node.js** (latest LTS version recommended).
2. **npm** (usually installed with Node.js).

---

## Installation

1. Clone the repository:
   git clone https://github.com/joaocoutinho-qa/serverest.git

2. Enter the project directory:
   cd serverest

3. Install the dependencies:
   npm install

---

## How to Run the Tests

### Interface Mode
To open the Cypress Test Runner and select tests manually:
npx cypress open

### Headless Mode
To run all tests in the background directly in the terminal:
npx cypress run

---

## Technologies Used

* **Cypress**: Core automation framework.
* **JavaScript**: Programming language.
* **Page Objects Model (POM)**: Design pattern for better code structure.
