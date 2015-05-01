'use strict';

var Hapi = require('hapi');
var Mongoose = require('mongoose');

var plugins = require('./tools/plunge');
plugins.push(require('Blipp'));

exports.init = function(port, cb){
  var server = new Hapi.Server();

  server.connection({port: port});
  Mongoose.connect(process.env.MONGO_URL);

  Mongoose.connection.once('open', function(){
    server.register(plugins, function(err){
      if(err){return cb(err);}

      server.start(function(err){
        return cb(err, server);
      });
    });
  });
};
