var Species = require("../models/species");
var express = require("express");

var router = express.Router();

// GET /species
router.get("/species", function(req, res, next) {
  var query = req.query;

  Species.find(query, function(err, results) {
    if (err) return next(err);
    res.json(results);
  });
});

// POST /species
router.post("/species", function(req, res, next) {
  var species = req.body;

  Species.create(species, function(err, newSpecies) {
    if (err) {
      return next(err);
    } else {
      res.set("Location", "/species/" + newSpecies._id);
      res.status(201).json(newSpecies);
    }
  });
});

// Add a callback cook for the :name parameter
// This will be executed before any of the below routes are called
// Saves us from duplicating the same code again and again
router.param("id", function(req, res, next, id) {
  Species.findById(id, function(err, species) {
    if (err) {
      return next(err);
    } else if (species) {
      // species found - attach to request
      req.species = species;
      next();
    } else {
      // no match found - send a 404
      res.sendStatus(404);
    }
  });
});

// GET /species/:name
router.get("/species/:id", function(req, res, next) {
  res.json(req.species);
});

// PUT /species/:name
router.put("/species/:id", function(req, res, next) {
  // update document with new data
  req.species.set(req.body);

  req.species.save(function(err) {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

// DELETE /species/:name
router.delete("/species/:id", function(req, res, next) {
  req.species.remove(function(err) {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

module.exports = router;
