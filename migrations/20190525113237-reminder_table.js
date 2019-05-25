'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reminders', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      time:{
        allowNull: true,
        type: Sequelize.DATE
      },
      sequenceStep:{
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reminders');
  }
};
