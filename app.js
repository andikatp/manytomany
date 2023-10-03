require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes");
var methodOverride = require("method-override");
const apiDocumentation = require("./json/apidocs.json");

app.use(express.json());
app.use(methodOverride("_method"));
app.use("/public", express.static("public"));
// app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(apiDocumentation, { explorer: true })
);

app.use(routes);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
