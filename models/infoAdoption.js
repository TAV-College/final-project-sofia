const { db } = require("./db_base");

const getAllInfoAdoptions = async () => {
  const stmt = db.prepare("SELECT * FROM adoptions");
  let infoAdoptions;
  try {
    infoAdoptions = await stmt.all();
  } catch (err) {
    console.error(err);
    return null;
  }
  return infoAdoptions ? infoAdoptions : null;
};

module.exports = {
  getAllInfoAdoptions,
};
