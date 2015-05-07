'use strict';

var Hoek = require('hoek');
var Server = require('./lib/server');

Server.init(function(err, server){
  Hoek.assert(!err, err);
  console.log('--------------------------------------------------------------------------------');
  console.log('Hapi:\n', server.info.uri);
  console.log('Environment:\n', server.app.environment);
  console.log('--------------------------------------------------------------------------------');
});
