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

  adminUser: {
    nome: "Joao Coutinho",
    email: `joaocoutinhoadmin${Date.now()}@email.com`,
    password: "admin1234",
    administrador: "true"
  },

  normalUser: {
    nome: "Joao Coutinho",
    email: `joaocoutinhouser${Date.now()}@email.com`,
    password: "user1234",
    administrador: "false"
  },

  validProduct: {
    nome: `Iphone 17 ${Date.now()}`,
    preco: 12500,
    descricao: "Iphone 2026",
    quantidade: 300
  },
}