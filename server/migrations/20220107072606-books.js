'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(t => {
      return Promise.all([
        
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        // queryInterface.removeColumn('Ebooks', 'genres',{transaction:t}),
        // queryInterface.removeColumn('Ebooks', 'chapter', {transaction: t}),
      ])
    })
  }
};
