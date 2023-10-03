const authorRoute = require("express").Router();
const { AuthorController } = require("../controllers");

authorRoute.use((req, res, next) => {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});
authorRoute.get("/", AuthorController.getAuthors);
authorRoute.post("/create", AuthorController.create);
authorRoute.get("/create", AuthorController.createPage);
authorRoute.delete("/delete/:id", AuthorController.delete);
authorRoute.get("/update/:id", AuthorController.updatePage);
authorRoute.patch("/update/:id", AuthorController.update);
authorRoute.get("/:id/books", AuthorController.getBookFromAuthor);

module.exports = authorRoute;
