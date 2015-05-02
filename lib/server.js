'use strict';

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var Blipp = require('blipp');
var Plugins = require('./tools/plunge');
var ServerConfig = require('./config/server.json');

exports.init = function(port, cb){
  var server = new Hapi.Server(ServerConfig);

  server.connection({port: port});
  Mongoose.connect(process.env.MONGO_URL);

  Mongoose.connection.once('open', function(){
    Plugins.push(Blipp);
    server.register(Plugins, function(err){
      if(err){return cb(err);}

      server.start(function(err){
        return cb(err, server);
      });
    });
  });
};
