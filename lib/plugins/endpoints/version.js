'use strict';

var Package = require('../../../package.json');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/version',
    config: {
      description: 'Get the app version',
      handler: function(request, reply){
        return reply({version: Package.version});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'version'
};
