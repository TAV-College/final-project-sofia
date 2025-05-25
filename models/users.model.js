const { db } = require("./db_base");

const createUser = async ({ username, password }) => {
  const stmt = db.prepare(
    "INSERT INTO users (username, password) VALUES (@username, @password)",
  );
  let result;

  try {
    result = await stmt.run({ username, password });
  } catch (err) {
    console.error(err);
    return null;
  }
  return result;
};

const getUserByUsername = async (username) => {
  const stmt = db.prepare("SELECT * FROM users WHERE username=?");
  try {
    return await stmt.get(username);
  } catch (err) {
    console.error(err);
    return null;
  }
};
module.exports = {
  createUser,
  getUserByUsername,
};
