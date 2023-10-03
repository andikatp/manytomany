const route = require("express").Router();

route.get("/", (req, res) => {
  res.render('index.ejs');
});

const bookRoutes = require("./book");
const authorRoutes = require("./author");
const authorBookRoutes = require("./authorBook");
route.use("/books", bookRoutes);
route.use("/authors", authorRoutes);
route.use("/authorbooks", authorBookRoutes);

module.exports = route;
