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

// GET /species/:name
router.get("/species/:id", function(req, res, next) {
  Species.findById(req.params.id, function(err, species) {
    if (err) {
      return next(err);
    } else if (species) {
      res.json(species);
    } else {
      // no match found - send a 404
      res.sendStatus(404);
    }
  });
});

// PUT /species/:name
router.put("/species/:id", function(req, res, next) {
  Species.findById(req.params.id, function(err, species) {
    if (err) {
      return next(err);
    } else if (species) {
      // update document with new data
      species.set(req.body);
      // ... and save
      species.save(function(err) {
        if (err) return next(err);
        res.sendStatus(200);
      });
    } else {
      // no match found - send a 404
      res.sendStatus(404);
    }
  });
});

// DELETE /species/:name
router.delete("/species/:id", function(req, res, next) {
  Species.findById(req.params.id, function(err, species) {
    if (err) {
      return next(err);
    } else if (species) {
      species.remove(function(err) {
        if (err) return next(err);
        res.sendStatus(200);
      });
    } else {
      // no match found - send a 404
      res.sendStatus(404);
    }
  });
});

module.exports = router;
