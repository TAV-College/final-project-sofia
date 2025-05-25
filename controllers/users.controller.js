const bcrypt = require("bcryptjs");
const { getUserByUsername } = require("../models/users.model");
const { generateToken } = require("../middleware/auth");

const encryptPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 10);
};

const validateUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = generateToken(user.username);
      return { username: user.username, token };
    }
  }
  return null;
};

module.exports = {
  encryptPassword,
  validateUser,
};
