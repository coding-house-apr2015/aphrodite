'use strict';

var Hoek = require('hoek');
var Server = require('./lib/server');

Server.init(process.env.PORT, function(err, server){
  Hoek.assert(!err, err);
  console.log('Hapi:', server.info.uri);
  console.log('Mongo:', process.env.MONGO_URL);
});
