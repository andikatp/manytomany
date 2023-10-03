'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('AuthorBooks', {
      fields: ['authorId'],
      type: 'foreign key',
      name: 'fk_authorId',
      references: {
        table: 'Authors',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('AuthorBooks', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'fk_bookId',
      references: {
        table: 'Books',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('AuthorBooks', 'fk_authorId');
    await queryInterface.removeConstraint('AuthorBooks', 'fk_bookId');
  }
};
