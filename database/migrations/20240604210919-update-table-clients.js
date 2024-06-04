'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Clients', 'trainingSheetDescription', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    })

    await queryInterface.addColumn('Trainers', 'dateOfBirth', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clients', 'trainingSheetDescription')
    await queryInterface.removeColumn('Trainers', 'dateOfBirth')
  }
};
