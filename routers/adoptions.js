const router = require("express").Router();
const {
  getAllAdoptions,
  getAdoptionById,
  addAdoption,
  getDogs,
  getCats,
} = require("../models/adoptions");
const { getAllInfoAdoptions } = require("../models/infoAdoption");

// Router to get All posibles adoptions
router.get("/adoptions", async (req, res) => {
  const adoptions = await getAllAdoptions();
  if (adoptions) {
    res.render("adoptions", {
      title: `${adoptions.length} Adoptions`,
      adoptions,
    });
  } else {
    res.redirect("/");
  }
});

//Router to get the form to add a new adoption
router.get("/adoptions/add", async (req, res) => {
  const infoAdoptions = await getAllInfoAdoptions();
  if (infoAdoptions) {
    res.render("add_adoption", { title: "New Adoption", infoAdoptions });
  } else {
    res.redirect("/adoptions");
  }
});

//Router to get the id of an adoption
router.get("/adoptions/:id", async (req, res) => {
  const gid = req.params.id;
  const adoption = await getAdoptionById(gid);
  if (adoption) {
    res.render("adoption", { title: adoption.name, adoption });
  } else {
    res.redirect("/adoptions");
  }
});

//Router to get all the possible adoptions for dogs
router.get("/dogs", async (req, res) => {
  const dogs = await getDogs();
  if (dogs) {
    res.render("dogs", { title: `${dogs.length} Dogs for Adoption`, dogs });
  } else {
    res.redirect("/adoptions");
  }
});

//Router to get all the possible adoptions for cats
router.get("/cats", async (req, res) => {
  const cats = await getCats();
  if (cats) {
    res.render("cats", { title: `${cats.length} Cats for Adoption`, cats });
  } else {
    res.redirect("/adoptions");
  }
});

//Router to add new adoptions
router.post("/adoptions", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const breed = req.body.breed;
  const state = req.body.state;
  const species = req.body.species;

  const result = await addAdoption({ name, age, breed, state, species });
  res.json({
    adoption: result,
    msg: `${name} was added to the library`,
  });
});

module.exports = router;
