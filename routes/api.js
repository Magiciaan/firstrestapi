const express = require("express");
const router = express.Router();
const Person = require("./../models/persons");

//get a list of peoples from DB
router.get("/home/all", function (req, res, next) {
  Person.find()
    .then((result) => {
      res.send(result);
    })
    .catch(next);
});
router.get("/nearby", function (req, res, next) {
  Person.aggregate()
  .near({
    near: {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    maxDistance: 300000, // 300 KM
    spherical: true,
    distanceField: "distance"
  })
  .then(person => {
    console.log(person);
    if (person) {
      if (person.length === 0)
        return res.send({
          message:
            "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
        });
      return res.send(person);
    }
  })
  .catch(next);
    //max distance works in meters and spherical means the map type
    //parse float to convert STR to Float;
});
//addinng new person to the DB
router.post("/home", function (req, res, next) {
  Person.create(req.body)
    .then(function (person) {
      res.send(person);
    })
    .catch(next);
});
//updating person from the DB
//the :id works like (localhost:6969/4921 (4921 is the ID))
router.put("/home/:id", function (req, res, next) {
  Person.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Person.findOne({ _id: req.params.id }).then((person) => {
      res.send(`${person.name} works in ${person.work}is the updated details`);
      //here we did this again to bring in the updated data from the DB instead of old "Person"
    });
  });
});
//deleting person from the DB
router.delete("/home/:id", function (req, res, next) {
  Person.findByIdAndRemove({ _id: req.params.id }).then((Person) => {
    res.send(`${Person.name} is deleted`);
  });
});

module.exports = router;
