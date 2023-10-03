const { Book, Author, AuthorBook } = require("../models");

class BookController {
  static async errorHandler(fn) {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async getBooks(req, res) {
    const response = await BookController.errorHandler(async () => {
      const books = await Book.findAll({
        order: [["id", "ASC"]],
      });
      return books;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.render("./book/book.ejs", { response: response });
    } else {
      res.json(response);
    }
  }

  static async create(req, res) {
    const response = await BookController.errorHandler(async () => {
      const book = await Book.create(req.body);
      return book;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/books");
    } else {
      res.json(response);
    }
  }

  static async createPage(req, res) {
    res.render("./book/bookCreate.ejs");
  }

  static async delete(req, res) {
    const response = await BookController.errorHandler(async () => {
      const id = parseInt(req.params.id);
      const book = await Book.findByPk(id);
      if (!book) {
        throw {
          message: `Book with id ${id} not found!`,
        };
      }

      const result = await Book.destroy({
        where: { id },
      });

      if (result === 0) {
        throw {
          message: `Failed to delete an book with id ${id}!`,
        };
      }
      return {
        message: `Book with id ${id} has been deleted successfully!`,
      };
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/books");
    } else {
      res.json(response);
    }
  }

  static async update(req, res) {
    const response = await BookController.errorHandler(async () => {
      const id = parseInt(req.params.id);
      const book = await Book.findByPk(id);

      if (!book) {
        throw {
          message: `Book with id ${id} not found!`,
        };
      }

      const result = await Book.update(req.body, {
        where: { id },
      });

      if (result === 0) {
        throw {
          message: `Failed to update an book with id ${id}!`,
        };
      }
      return {
        message: `Book with id ${id} has been updated successfully!`,
      };
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/books");
    } else {
      res.json(response);
    }
  }

  static async getOneBook(id) {
    const response = await BookController.errorHandler(async () => {
      id = parseInt(id);

      const bookExist = await Book.findByPk(id);

      if (!bookExist) {
        throw {
          message: `Book with id ${id} does not exist!`,
        };
      }

      return bookExist;
    });
    return response;
  }

  static async updatePage(req, res) {
    const book = await BookController.getOneBook(req.params.id);
    console.log(book);
    res.render('./book/bookUpdate.ejs', {data: book});
  }

  static async getBookAuthors(req, res) {
    const response = await BookController.errorHandler(async () => {
      const id = parseInt(req.params.id);

      const bookExist = await Book.findByPk(id);

      if (!bookExist) {
        throw {
          message: `Book with id ${id} does not exist!`,
        };
      }

      const book = await Book.findAll({
        where: { id },
        include: [
          {
            model: Author,
            through: { attributes: [] },
          },
        ],
      });

      // const res = await AuthorBook.findAll({
      //   where: { bookId: id },
      //   include: [Book, Author],
      // });
      // const book = res[0].dataValues.Book.dataValues;

      // let authors = res.map((author) => {
      //   return author.Author;
      // });
      // authors = authors.map((author) => {
      //   return author.dataValues;
      // });
      return book;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.render("./book/bookAuthors.ejs", { response: response });
    } else {
      res.json(response);
    }
  }
}

module.exports = BookController;
