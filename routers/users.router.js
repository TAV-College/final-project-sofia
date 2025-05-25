const express = require("express");
const router = express.Router();
const { createUser } = require("../models/users.model");
const {
  encryptPassword,
  validateUser,
} = require("../controllers/users.controller");

router.post("/user", async (req, res) => {
  const username = req.body?.username;
  const password1 = req.body?.password1;
  const password2 = req.body?.password2;
  let errorMsg = "";

  if (!username) {
    errorMsg += "Missing Username\n";
  }

  if (!password1) {
    errorMsg += "Missing Password\n";
  }

  if (!password2) {
    errorMsg += "Passwords do not match";
  }

  if (errorMsg) {
    res.render("signup", { title: "Signup", errorMsg });
  } else {
    const password = await encryptPassword(password1);
    await createUser({ username, password });
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("logins", { title: "login" });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await validateUser(username, password);
  if (user) {
    res.render("profile", { title: `${user.username}'s Profile`, user });
  } else {
    res.redirect("/login");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup" });
});

module.exports = router;
