var app    = require("./app");
var config = require("config");

// start server
var server = app.listen(config.get('server.port'), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening on http://%s:%s', host, port);
});
