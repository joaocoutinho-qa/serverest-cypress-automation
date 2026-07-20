import { pageObjects } from '../../pageObjects/exportPageObjects'
import userData from '../../fixtures/userData'
const { UserAPI } = pageObjects

describe('User Registration API Tests', () => {
  let userId
  let authToken

  afterEach(() => {
    
    // Cleanup: delete created user
    if (userId && authToken) {
      UserAPI.deleteUser(userId, authToken).then((response) => {
        expect(response.status).to.be.oneOf([200, 204, 400])
      })
    }
  })

  it('Register valid admin user and validate persistence', () => {
    const adminData = userData.adminUser

    UserAPI.registerUser(adminData).then((response) => {
      UserAPI.validateResponseStatus(response, 201)
      userId = UserAPI.validateResponseBodyHasId(response)
      UserAPI.validateResponseSchema(response)

      UserAPI.loginUser(adminData.email, adminData.password).then((loginResponse) => {
        UserAPI.validateResponseStatus(loginResponse, 200)
        authToken = UserAPI.validateLoginToken(loginResponse)

        UserAPI.validateUserPersistence(userId, authToken).then((responseUser) => {
          expect(responseUser.nome).to.equal(adminData.nome)
          expect(responseUser.email).to.equal(adminData.email)
          expect(responseUser.administrador).to.equal(true)
        })
      })
    })
  })

  it('Attempt to register user with duplicate email', () => {
    const firstUser = {
      nome: 'First User',
      email: `duplicate${Date.now()}@test.com`,
      password: 'Senha@1234',
      administrador: 'false',
    }

    UserAPI.registerUser(firstUser).then((response) => {
      UserAPI.validateResponseStatus(response, 201)
      userId = UserAPI.validateResponseBodyHasId(response)

      const duplicateUser = { ...firstUser }
      UserAPI.registerUser(duplicateUser).then((duplicateResponse) => {
        UserAPI.validateResponseStatus(duplicateResponse, 400)
        UserAPI.validateResponseHasMessage(duplicateResponse, 'Este email já está sendo usado')
      })
    })
  })

  it('Register user and validate authentication flow', () => {
    const testUser = {
      nome: 'Auth Test User',
      email: `authtest${Date.now()}@test.com`,
      password: 'Pass@123456',
      administrador: 'false',
    }

    UserAPI.registerUser(testUser).then((response) => {
      UserAPI.validateResponseStatus(response, 201)
      userId = UserAPI.validateResponseBodyHasId(response)

      UserAPI.loginUser(testUser.email, testUser.password).then((loginResponse) => {
        UserAPI.validateResponseStatus(loginResponse, 200)
        authToken = UserAPI.validateLoginToken(loginResponse)

        expect(authToken).to.match(/^Bearer\s.+|^.+/)
        Cypress.env('authToken', authToken)
      })
    })
  })

  it('Attempt to register user with missing required field', () => {
    const incompleteUser = userData.invalidUserNoEmail

    UserAPI.registerUser(incompleteUser).then((response) => {
      UserAPI.validateResponseStatus(response, 400)
      UserAPI.validateResponseSchema(response)
      expect(response.body.message).to.exist
    })
  })

  it('Update user data after registration and validate changes', () => {
    const originalUser = {
      nome: 'Original Name',
      email: `updatetest${Date.now()}@test.com`,
      password: 'Update@1234',
      administrador: 'false',
    }

    UserAPI.registerUser(originalUser).then((registerResponse) => {
      UserAPI.validateResponseStatus(registerResponse, 201)
      userId = UserAPI.validateResponseBodyHasId(registerResponse)

      UserAPI.loginUser(originalUser.email, originalUser.password).then((loginResponse) => {
        authToken = UserAPI.validateLoginToken(loginResponse)

        const updatedData = {
          nome: 'Updated Name',
          email: originalUser.email,
          password: originalUser.password,
          administrador: 'false',
        }

        UserAPI.updateUser(userId, updatedData, authToken).then((updateResponse) => {
          expect(updateResponse.status).to.be.oneOf([200, 201])

          UserAPI.validateUserPersistence(userId, authToken).then((persistedUser) => {
            expect(persistedUser.nome).to.equal(updatedData.nome)
          })
        })
      })
    })
  })
})

