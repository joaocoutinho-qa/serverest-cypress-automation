const userData = {
  adminUser: {
    nome: "Admin Test",
    email: `admin.test${Date.now()}@email.com`,
    password: "Senha@1234",
    administrador: "true"
  },
  
  normalUser: {
    nome: "Normal User",
    email: `user.normal${Date.now()}@email.com`,
    password: "User@1234",
    administrador: "false"
  },

  invalidUserNoName: {
    nome: "",
    email: `invalid${Date.now()}@email.com`,
    password: "Senha@1234",
    administrador: "false"
  },

  invalidUserNoEmail: {
    nome: "Test User",
    email: "",
    password: "Senha@1234",
    administrador: "false"
  },

  invalidUserNoPassword: {
    nome: "Test User",
    email: `test${Date.now()}@email.com`,
    password: "",
    administrador: "false"
  }
}

export default userData
