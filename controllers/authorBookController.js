const { AuthorBook, Author, Book } = require("../models");

class AuthorBookController {
  static async errorHandler(fn) {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async getAuthorBook(req, res) {
    const response = await AuthorBookController.errorHandler(async () => {
      const authorBooks = await AuthorBook.findAll({
        include: [Author, Book],
        order: [["id", "ASC"]]
      });
      return authorBooks.map(authorBook => {
        return {
          authorId: authorBook.authorId,
          bookId: authorBook.bookId,
          createdAt: authorBook.createdAt,
          updatedAt: authorBook.updatedAt,
          Author: authorBook.Author ? authorBook.Author.name : null, 
          Book: authorBook.Book ? authorBook.Book.name : null 
        };
      });
    });
    
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.render("./authorBook/authorBook.ejs", { response: response });
    } else {
      res.json(response);
    }
  }

  static async create(req, res) {
    const response = await AuthorBookController.errorHandler(async () => {
      const { authorId, bookId } = req.body;
      const author = await Author.findByPk(authorId);
      const book = await Book.findByPk(bookId);

      if (!author) {
        throw {
          message: `Author with id ${authorId} not found!`,
        };
      }

      if (!book) {
        throw {
          message: `Book with id ${bookId} not found!`,
        };
      }

      const authorBook = await AuthorBook.create(req.body);
      return authorBook;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/authorbooks");
    } else {
      res.json(response);
    }
  }

  static async createPage(req, res) {
    const authors = await AuthorBookController.errorHandler(async () => {
      const result = await Author.findAll({
        order: [["id", "ASC"]],
      });
      return result;
    });
    const books = await AuthorBookController.errorHandler(async () => {
      const result = await Book.findAll({
        order: [["id", "ASC"]],
      });
      return result;
    });
    res.render("./authorBook/authorBookCreate.ejs", {
      authors: authors.data,
      books: books.data,
    });
  }

  static async delete(req, res) {
    const response = await AuthorBookController.errorHandler(async () => {
      const id = parseInt(req.params.id);

      const authorBook = await AuthorBook.findByPk(id);
      if (!authorBook) {
        throw {
          message: `AuthorBook with id ${id} not found!`,
        };
      }

      const result = await AuthorBook.destroy({
        where: { id },
      });

      if (result === 0) {
        throw {
          message: `Failed to delete an authorBook with id ${id}!`,
        };
      }
      return {
        message: `AuthorBook with id ${id} has been deleted successfully!`,
      };
    });
    res.json(response);
  }

  static async deleteFromEjs(req, res) {
    await AuthorBookController.errorHandler(async () => {
      const authorId = parseInt(req.params.authorId);
      const bookId = parseInt(req.params.bookId);
      console.log(authorId, bookId);
      const result = await AuthorBook.destroy({
        where: {
          authorId,
          bookId,
        },
      });
      console.log(result);
    });
    res.redirect('/authorbooks');
  }

  static async update(req, res) {
    const response = await AuthorBookController.errorHandler(async () => {
      const id = parseInt(req.params.id);
      const { authorId, bookId } = req.body;
      const author = await Author.findByPk(authorId);
      const book = await Author.findByPk(bookId);
      const authorBook = await AuthorBook.findByPk(id);

      if (!authorBook) {
        throw {
          message: `AuthorBook with id ${id} not found!`,
        };
      }

      if (!author) {
        throw {
          message: `Author with id ${authorId} not found!`,
        };
      }

      if (!book) {
        throw {
          message: `Book with id ${bookId} not found!`,
        };
      }

      const result = await AuthorBook.update(req.body, {
        where: { id },
      });
      return result;
    });
    res.json(response);
  }

  static async updatePage(req, res) {
    try{
      const authorId = parseInt(req.params.authorId);
      const bookId = parseInt(req.params.bookId);
      const author = await Author.findByPk(authorId);
      const book = await Book.findByPk(bookId);
      const authors = await Author.findAll();
      const books = await Book.findAll();
      res.render('./authorBook/authorBookUpdate.ejs', {author, book, authors, books});
    } catch (err) {
      res.json(err);
    }
  }

  static async updateFromEjs(req, res) {
    await AuthorBookController.errorHandler(async () => {
      const authorId = parseInt(req.params.authorId);
      const bookId = parseInt(req.params.bookId);

      await AuthorBook.update(req.body, {
        where: {
          authorId,
          bookId,
        }
      })
    });
    res.redirect('/authorbooks');
  }
}

module.exports = AuthorBookController;
