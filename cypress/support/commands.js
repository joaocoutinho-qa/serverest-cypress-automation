Cypress.Commands.add('registerNormalUser', () => {
    
      cy.env(['apiUrl']).then(({ apiUrl }) => {
         cy.fixture('userData').then((data) => {
             cy.request({
                method: 'POST',
                url: `${(apiUrl)}/usuarios`, 
                failOnStatusCode: false,
                body: data.normalUser,
            })
        }) 
    })
})

Cypress.Commands.add('registerAdminUser', () => {
    
      cy.env(['apiUrl']).then(({ apiUrl }) => {
         cy.fixture('userData').then((data) => {
             cy.request({
                method: 'POST',
                url: `${(apiUrl)}/usuarios`, 
                failOnStatusCode: false,
                body: data.adminUser,
            })
        }) 
    })
})

Cypress.Commands.add('adminUserLogin', () => {

     cy.env(['apiUrl']).then(({ apiUrl }) => {
         cy.fixture('userData').then((data) => {
             cy.request({
                method: 'POST',
                url: `${apiUrl}/login`,
                body: {
                    email: data.adminUser.email,
                    password: data.adminUser.password
                },
                failOnStatusCode: false
            }).then((response) => {
                const token = response.body.authorization
                Cypress.env('token', token)
                return token
            })
        })
    })
})

Cypress.Commands.add('normalUserLogin', () => {

    cy.visit('/')
        cy.fixture('userData').then((data) => {
            cy.get('[data-testid="email"]').clear().type(data.normalUser.email)
            cy.get('[data-testid="senha"]').clear().type(data.normalUser.password)
            cy.get('[data-testid="entrar"]').click()
        })
})

Cypress.Commands.add('registerProduct', () => {
    
     cy.env(['apiUrl']).then(({ apiUrl }) => {
         cy.then(() => {
            const token = Cypress.env('token')
            
             cy.fixture('userData').then((data) => {
                 cy.request({
                    method: 'POST',
                    url: `${apiUrl}/produtos`,
                    failOnStatusCode: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: data.validProduct,
                }).then((response) => {
                    return response
                })
            })
        })
    })
})
