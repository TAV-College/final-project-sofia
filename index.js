const express = require("express");
const bodyParser = require("body-parser");
const { routerLogger } = require("./middleware/logger.js");

//Import routers
const mainRouter = require("./routers/main.js");
const adoptionsRouter = require("./routers/adoptions.js");
const userRouter = require("./routers/users.router.js");
const port = process.env.PORT || 3000;

//Configuration app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(routerLogger);

//Load roters
app.use("", mainRouter);
app.use("", adoptionsRouter);
app.use("", userRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Home Adoption page" });
});

app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    msg: "This page was not found.",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
