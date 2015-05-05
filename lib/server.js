'use strict';

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var Plugins = require('./tools/plugins');
var Server = require('./config/server');
var Config = require('./config');

exports.init = function(cb){
  var server = new Hapi.Server(Server);
  server.app.environment = Config.environment;
  server.connection({port: server.app.environment.PORT});
  Mongoose.connect(server.app.environment.MONGO_URL);

  Mongoose.connection.once('open', function(){
    server.register(Plugins, function(err){
      if(err){return cb(err);}

      server.auth.strategy('token', 'jwt', true, server.plugins.authentication.authenticate);
      server.start(function(err){
        return cb(err, server);
      });
    });
  });
};
