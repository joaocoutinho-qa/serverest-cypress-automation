module.exports = {
  validCredentials: {
    nome: "Joao Coutinho",
    email: `joao.coutinho${Date.now()}@email.com`,
    password: "senha1234",
    administrador: "false"
  },
  
  invalidCredentials: {
    nome: "",
    email: "joaocoutinhoadmin@email.com",
    password: "senha1234",
    administrador: "false"
  },

  validProduct: {
    nome: `JBL 720BT ${Date.now()}`,
    preco: 359,
    descricao: "Headset",
    quantidade: 200
  },

  adminUser: {
    nome: "Joao Coutinho",
    email: `joao.coutinho${Date.now()}@email.com`,
    password: "senha12345",
    administrador: "true"
  },

  normalUser: {
    nome: "Joao Coutinho",
    email: `joao.coutinho${Date.now()}@email.com`,
    password: "senha12345",
    administrador: "false"
  },
}