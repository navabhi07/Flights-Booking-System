'use strict';
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here.
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'airbus890',
        capacity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'airbus330',
        capacity: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here.
    await queryInterface.bulkDelete('Airplanes', {
      modelNumber: {
        [Op.in]: ['airbus890', 'airbus330']
      }
    }, {});
  }
};
