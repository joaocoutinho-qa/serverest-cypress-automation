const { faker } = require('@faker-js/faker')

const generateProduct = () => ({
  id: `product_${faker.string.uuid()}`,
  name: faker.commerce.product(),
  price: faker.number.int({ min: 1000, max: 150000 }),
  description: faker.commerce.productDescription(),
  quantity: faker.number.int({ min: 1, max: 250 }),
})

const productsData = {
  products: Array.from({ length: 3 }, () => generateProduct()),
}

module.exports = productsData
