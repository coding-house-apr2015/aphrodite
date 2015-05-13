/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;

describe('GET /version', function(){
  it('should return the version', function(done){
    Server.init(function(err, server){
      server.inject({method: 'GET', url: '/version', headers: {authorization: 'Bearer ' + server.app.environment.FIREBASE_TOKEN}}, function(response){
        expect(err).to.not.be.ok;
        expect(response.statusCode).to.equal(200);
        server.stop(function(){
          Mongoose.disconnect(done);
        });
      });
    });
  });
});
