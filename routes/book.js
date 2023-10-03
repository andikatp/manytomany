const bookRoute = require("express").Router();
const { BookController } = require("../controllers");

bookRoute.use((req, res, next) => {
    if (req.query._method == "DELETE") {
      req.method = "DELETE";
      req.url = req.path;
    }
    next();
  });
bookRoute.get("/", BookController.getBooks);
bookRoute.post("/create", BookController.create);
bookRoute.get("/create", BookController.createPage);
bookRoute.delete("/delete/:id", BookController.delete);
bookRoute.get("/update/:id", BookController.updatePage);
bookRoute.patch("/update/:id", BookController.update);
bookRoute.get("/:id/authors", BookController.getBookAuthors);

module.exports = bookRoute;
