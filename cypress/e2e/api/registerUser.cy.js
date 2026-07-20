import userData from '../../fixtures/userData'
import Pages from '../../support/exportPages'
const UserAPI = Pages.UserAPI

describe('User Registration API Tests', () => {
  let userId
  let authToken
  let adminId      
  let adminToken  
  let baseEmail

  beforeEach(() => {
    baseEmail = userData.normalUser.email
    return cy
      .createAuthenticatedUser(userData.adminUser)
      .then((createdAdmin) => {
        adminId = createdAdmin.userId     
        adminToken = createdAdmin.token
      })
      .then(() => cy.createAuthenticatedUser(userData.normalUser))
      .then((createdNormal) => {
        userId = createdNormal.userId
        authToken = createdNormal.token
      })
  })

  afterEach(() => {
    return cy.cleanupTestData()
  })

  it('Register valid admin user and validate persistence', () => {
    //asserts: validate persisted admin
    return UserAPI.validateUserPersistence(adminId, adminToken).then((responseUser) => {
        expect(responseUser.name).to.equal(userData.adminUser.nome)
        expect(responseUser.email).to.equal(userData.adminUser.email)
        expect(responseUser.isAdmin).to.equal(true)
    })
  })

  it('Attempt to register user with duplicate email', () => {
    //actions & asserts: attempt to register same email again
    return UserAPI.registerUser({ ...userData.normalUser, email: baseEmail }).then((duplicateResponse) => {
      UserAPI.validateResponseStatus(duplicateResponse, 400)
      UserAPI.validateResponseHasMessage(duplicateResponse, 'Este email já está sendo usado')
    })
  })

  it('Attempt to register user with missing email field', () => {
    const incompleteUser = userData.invalidUserNoEmail

    //actions & asserts
    return UserAPI.registerUser(incompleteUser).then((response) => {
      UserAPI.validateResponseStatus(response, 400)
      UserAPI.validateErrorSchema(response, 'email')
      expect(response.body.email).to.exist
    })
  })

  it('Update user data after registration and validate changes', () => {
    const updatedData = { name: 'Updated Name' }

    //actions
    return UserAPI.updateUser(userId, { ...userData.normalUser, name: updatedData.name }, authToken)
      //asserts
      .then((updateResponse) => {
        expect(updateResponse.status).to.be.oneOf([200, 201])
        return UserAPI.validateUserPersistence(userId, authToken)
      })
      .then((persistedUser) => {
        expect(persistedUser.name).to.equal(updatedData.name)
      })
  })
})