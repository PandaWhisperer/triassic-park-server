var config     = require("config");
var express    = require("express");
var bodyParser = require("body-parser");
var logger     = require("morgan");
var mongoose   = require("mongoose");

// connect to database
mongoose.connect(config.db.url);

// create app
var app = express();

// load middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

if (config.server.logger)
  app.use( logger(config.server.logger) );

// load routes

module.exports = app;
