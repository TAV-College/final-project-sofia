const { db } = require("./db_base");

const getAllAdoptions = async () => {
  const stmt = db.prepare("SELECT * FROM adoptions;");
  try {
    return await stmt.all();
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getAdoptionById = async (id) => {
  const stmt = db.prepare("SELECT * FROM adoptions WHERE id=?");
  try {
    return await stmt.get(id);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getDogs = async () => {
  const stmt = db.prepare("SELECT * FROM adoptions WHERE species= ?");
  try {
    return await stmt.all("dog");
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getCats = async () => {
  const stmt = db.prepare("SELECT * FROM adoptions WHERE species= ?");
  try {
    return await stmt.all("cat");
  } catch (e) {
    console.log(e);
    return false;
  }
};

const addAdoption = async ({ name, age, breed, state, species }) => {
  const stmt = db.prepare(
    "INSERT INTO adoptions (name, age, breed, state, species) VALUES (@name, @age, @breed, @state, @species)",
  );
  try {
    return await stmt.run({ name, age, breed, state, species });
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getAllAdoptions,
  getAdoptionById,
  addAdoption,
  getDogs,
  getCats,
};
