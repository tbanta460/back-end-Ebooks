'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        // queryInterface.renameColumn('Ebooks', 'excerpt', 'sinopsis'),
        queryInterface.changeColumn('Ebooks', 'sinopsis', {
          type: Sequelize.TEXT
        })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
