const authorBookRoute = require("express").Router();
const { AuthorBookController } = require("../controllers");

authorBookRoute.use((req, res, next) => {
    if (req.query._method == "DELETE") {
      req.method = "DELETE";
      req.url = req.path;
    }
    next();
  });
authorBookRoute.get("/", AuthorBookController.getAuthorBook);
authorBookRoute.post("/create", AuthorBookController.create);
authorBookRoute.get("/create", AuthorBookController.createPage);
authorBookRoute.delete("/delete/:id", AuthorBookController.delete);
authorBookRoute.delete("/deletefromejs/:authorId/:bookId", AuthorBookController.deleteFromEjs);
authorBookRoute.get("/update/:authorId/:bookId", AuthorBookController.updatePage);
authorBookRoute.patch("/update/:authorId/:bookId", AuthorBookController.update);
authorBookRoute.patch("/updatefromejs/:authorId/:bookId", AuthorBookController.updateFromEjs);

module.exports = authorBookRoute;
