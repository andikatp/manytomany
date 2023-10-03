"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.belongsToMany(models.Book, {
        through: models.AuthorBook,
        foreignKey: "authorId",
        otherKey: "bookId",
        onDelete: "CASCADE"
      });
    }
  }
  Author.init(
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
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: {
            msg: "Date of birth must not be empty!",
          },
          isDate: {
            msg: "Please enter a valid date",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Gender must not be empty!",
          },
        },
      },
      nationality: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nationality must not be empty!",
          },
          len: {
            args: [3, 100],
            msg: "Nationality should contains between 3 and 100 characters!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  return Author;
};
