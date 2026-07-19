const { faker } = require('@faker-js/faker')

const generateProduct = () => ({
  _id: `product_${faker.string.uuid()}`,
  nome: faker.commerce.product(),
  preco: faker.number.int({ min: 1000, max: 150000 }),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 1, max: 250 }),
})

module.exports = {
  produtos: Array.from({ length: 3 }, () => generateProduct()),
}
