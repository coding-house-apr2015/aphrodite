'use strict';

var Hoek = require('hoek');
var Server = require('./lib/server');

Server.init(function(err, server){
  Hoek.assert(!err, err);
  console.log('Hapi:', server.info.uri);
  console.log('Environment:', server.app.environment);
});
