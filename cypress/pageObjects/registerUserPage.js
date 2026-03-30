class registerUser {
    
    sendAPIdata(payload){
        return cy.request({
                method: 'POST',
                url: `${cy.env('apiUrl')}/usuarios`, 
                failOnStatusCode: false,
                body: payload,
        })
    }

    validateAPIresponse(response, status){
        expect(response.status).to.eq(status)
    }
}
export default new registerUser()