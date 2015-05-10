'use strict';

exports.get = function(){
  var env = process.env.NODE_ENV || 'development';

  var common = {
    NODE_ENV: env,
    FIREBASE_SECRET: process.env.FIREBASE_SECRET,
    FIREBASE_EXPIRE: 24
  };

  var environments = {
    development: {
      PORT: process.env.PORT || 8000,
      MONGO_URL: 'mongodb://localhost/aphrodite-dev'
    },
    test: {
      PORT: process.env.PORT || 0,
      MONGO_URL: 'mongodb://localhost/aphrodite-test',
      FIREBASE_EXPIRE: Infinity,
      FIREBASE_TOKEN: process.env.FIREBASE_TOKEN
    },
    production: {
      PORT: process.env.PORT || 0,
      MONGO_URL: 'mongodb://heroku.mongolab.com/aphrodite-production'
    }
  };

  var environment = environments[env];

  Object.keys(common).forEach(function(key){
    if(!environment[key]){
      environment[key] = common[key];
    }
  });

  return environment;
};
