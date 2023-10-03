const { Author, Book } = require("../models");

class AuthorController {
  static async errorHandler(fn) {
    try {
      const data = await fn();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async getAuthors(req, res) {
    const response = await AuthorController.errorHandler(async () => {
      const authors = await Author.findAll({
        order: [["id", "ASC"]],
      });
      return authors;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.render("./author/author.ejs", { response: response });
    } else {
      res.json(response);
    }
  }

  static async create(req, res) {
    const response = await AuthorController.errorHandler(async () => {
      const author = await Author.create(req.body);
      return author;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/authors");
    } else {
      res.json(response);
    }
  }

  static async createPage(req, res) {
    res.render("./author/authorCreate.ejs");
  }

  static async delete(req, res) {
    const response = await AuthorController.errorHandler(async () => {
      const id = parseInt(req.params.id);

      const author = await Author.findByPk(id);
      if (!author) {
        throw {
          message: `Author with id ${id} not found!`,
        };
      }

      const result = await Author.destroy({
        where: { id },
      });

      if (result === 0) {
        throw {
          message: `Failed to delete an author with id ${id}!`,
        };
      }
      return {
        message: `Author with id ${id} has been deleted successfully!`,
      };
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/authors");
    } else {
      res.json(response);
    }
  }

  static async update(req, res) {
    const response = await AuthorController.errorHandler(async () => {
      const id = parseInt(req.params.id);
      const author = await Author.findByPk(id);

      if (!author) {
        throw {
          message: `Author with id ${id} not found!`,
        };
      }

      const result = await Author.update(req.body, {
        where: { id },
      });

      if (result === 0) {
        throw {
          message: `Failed to update an author with id ${id}!`,
        };
      }
      return {
        message: `Author with id ${id} has been updated successfully!`,
      };
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.redirect("/authors");
    } else {
      res.json(response);
    }
  }

  static async getOneAuthor(id) {
    const response = await AuthorController.errorHandler(async () => {
      id = parseInt(id);
      const author = await Author.findByPk(id);
      return author;
    });
    return response;
  }

  static async updatePage(req, res) {
    const author = await AuthorController.getOneAuthor(req.params.id);
    res.render("./author/authorUpdate.ejs",{ data: author});
  }

  static async getBookFromAuthor(req, res) {
    const response = await AuthorController.errorHandler(async () => {
      const id = parseInt(req.params.id);
      const author = await Author.findByPk(id, {
        include: [
          {
            model: Book,
            through: { attributes: [] },
          },
        ],
      });

      if (!author) {
        throw {
          message: `Author with id ${id} not found!`,
        };
      }
      return author;
    });
    const acceptHeader = req.get("Accept");
    if (acceptHeader && acceptHeader.includes("text/html")) {
      res.render("./author/authorBooks.ejs", { response: response });
    } else {
      res.json(response);
    }
  }
}

module.exports = AuthorController;
