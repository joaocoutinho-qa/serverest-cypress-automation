const { faker } = require('@faker-js/faker')

const generateProduct = () => ({
  _id: faker.string.uuid(),
  nome: `${faker.commerce.product()}-${Date.now()}-${faker.string.alphanumeric(4)}`,
  preco: faker.number.int({ min: 1000, max: 150000 }),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 1, max: 250 }),
})

module.exports = () => ({
  produtos: Array.from({ length: 3 }, () => generateProduct()),
})