'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log(123)
    await queryInterface.bulkInsert('ProductMains',
      Array.from({ length: 10 }).map((_, i) =>
      ({
        name: `product-${i}`,
        price: Math.floor(Math.random() * 100),
        supplier: `Supplier ${i}`,
        stock: 100 - i,
        description: `Description for Product ${i}`,
        specification: `Specification for Product ${i}`,
        image_url: `https://via.placeholder.com/159x200?text=Product${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      )
    )
    await queryInterface.bulkInsert('member',
      Array.from({ length: 2 }).map((_, i) =>
      ({
        email: 'jone@example.com',
        name: `jane_smith${i}`,
        address: '456 Elm St',
        phone_number: '987-654-3210',
        account: 'jane_smith',
        passhash: 'hashed_password2',
        options: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      )
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductMains', null, {})
    await queryInterface.bulkDelete('member', null, {})
  }
};
