"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Book.belongsToMany(models.Author, {
        through: models.AuthorBook,
        foreignKey: "bookId",
        otherKey: "authorId",
        onDelete: "CASCADE"
      });
    }
  }
  Book.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Name must not be empty!",
          },
          len: {
            args: [3, 100],
            msg: "Name should contains between 3 and 100 characters!",
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Genre must not be empty!",
          },
          len: {
            args: [3, 100],
            msg: "Genre should contains between 3 and 100 characters!",
          },
        },
      },
      publisher: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Publisher must not be empty!",
          },
          len: {
            args: [3, 100],
            msg: "Publisher should contains between 3 and 100 characters!",
          },
        },
      },
      publicationYear: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Publication year must not be empty!",
          },
          isInt: {
            msg: "Publication year should be only integer!",
          },
          len: {
            args: [4, 4],
            msg: "Publication year should be year contain four numbers!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
