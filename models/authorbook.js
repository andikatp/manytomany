"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuthorBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthorBook.belongsTo(models.Author, { foreignKey: "authorId" });
      AuthorBook.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  AuthorBook.init(
    {
      authorId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `Author ID must not be empty!`,
          },
          isInt: {
            msg: `Author ID must be an integer!`,
          },
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: `Book ID must not be empty!`,
          },
          isInt: {
            msg: `Book ID must be an integer!`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AuthorBook",
    }
  );
  return AuthorBook;
};
