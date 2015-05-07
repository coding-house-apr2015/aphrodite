'use strict';

var Secrets;

try{
    Secrets = require('./secrets');
}catch(ex){}

var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets ? Secrets.FIREBASE_SECRET : process.env.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: process.env.PORT || 8000,
    MONGO_URL: 'mongodb://localhost/aphrodite-dev'
  },
  test: {
    PORT: process.env.PORT || 0,
    MONGO_URL: 'mongodb://localhost/aphrodite-test'
  },
  production: {
    PORT: process.env.PORT || 0,
    MONGO_URL: 'mongodb://heroku.mongolab.com'
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});

exports.environment = environment;
