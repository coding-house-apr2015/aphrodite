'use strict';

var User = require('../models/user');

exports.register = function(server, options, next){
  var authenticate = {
    key: server.app.environment.FIREBASE_SECRET,
    validateFunc: function(jwt, cb){
      var past = jwt.iat * 1000;
      var now = Date.now();
      var future = past + server.app.environment.FIREBASE_EXPIRE * 3600 * 1000;

      if(past < now && now < future){
        User.findOne({firebaseId: jwt.d.uid}, function(err, user){
          if(err){ return cb(err); }
          return cb(null, true, {firebaseId: jwt.d.uid, _id: user ? user._id : null});
        });
      }else{
        return cb();
      }
    }
  };

  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name: 'authentication'
};
