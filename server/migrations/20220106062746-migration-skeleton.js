'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Consums', 'refreshToken', {type: Sequelize.DataTypes.STRING},{transaction: t}),
        queryInterface.addColumn('Consums', 'image',{type: Sequelize.DataTypes.STRING}, {transaction: t}),
        queryInterface.addColumn('Consums', 'userId',{type: Sequelize.DataTypes.STRING}, {transaction:t})
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Consums', 'id', { transaction: t })
      ]);
    });
  }
};
