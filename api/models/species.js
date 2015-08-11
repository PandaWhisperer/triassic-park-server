var mongoose = require("mongoose");

var speciesSchema = new mongoose.Schema({
  name: String,
  legs: Number,
  carnivorous: Boolean,
  nocturnal: Boolean,
  description: String
});

module.exports = mongoose.model('Species', speciesSchema);
