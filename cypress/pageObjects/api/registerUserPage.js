class registerUser {
    
    sendAPIdata(payload){
        return cy.request({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/usuarios`, 
                failOnStatusCode: false,
                body: payload,
        })
    }

    validateAPIresponse(response, status){
        expect(response.status).to.eq(status)
    }
}
export default new registerUser()