"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Books", [
      {
        name: "Psychology of Money",
        genre: "Study Guide",
        publisher: "Harriman House",
        publicationYear: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "How to Win Friends and Influence People",
        genre: "Self-help book",
        publisher: "Simon & Schuster",
        publicationYear: 1936,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Think and Grow Rich",
        genre: "Self-help book",
        publisher: "The Ralston Society",
        publicationYear: 1937,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Harry Potter",
        genre: "Fantasy",
        publisher: "Bloomsbury",
        publicationYear: 1997,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Authors", [
      {
        name: "Andika Tri Prasetya",
        dateOfBirth: "1985-12-13",
        gender: "Male",
        nationality: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rizki Saipuddin",
        dateOfBirth: "1990-10-21",
        gender: "Male",
        nationality: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Izzah Mujahidah",
        dateOfBirth: "2002-01-08",
        gender: "Male",
        nationality: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
      await queryInterface.bulkInsert("AuthorBooks", [
        {
          authorId: 1,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 1,
          bookId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 1,
          bookId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 2,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 2,
          bookId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 3,
          bookId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 3,
          bookId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 3,
          bookId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Authors", null, {});
    await queryInterface.bulkDelete("AuthorBooks", null, {});
  },
};
