/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Sinon = require('sinon');
var Server = require('../../lib/server');
var User = require('../../lib/models/user');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;

var server;

describe('authentication.js', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should have a empty token', function(done){
    server.plugins.authentication.authenticate.validateFunc({}, function(err, isAuth, credentials){
      expect(err).to.not.be.ok;
      expect(isAuth).to.not.be.ok;
      expect(credentials).to.not.be.ok;
      done();
    });
  });

  it('should have a valid issued at token', function(done){
    var iat = (Date.now() / 1000) - 5;
    server.plugins.authentication.authenticate.validateFunc({iat: iat, d: {uid: 'fake'}}, function(err, isAuth, credentials){
      expect(err).to.not.be.ok;
      expect(isAuth).to.be.ok;
      expect(credentials).to.be.ok;
      done();
    });
  });

  it('should cause a db error', function(done){
    var iat = (Date.now() / 1000) - 5;
    var stub = Sinon.stub(User, 'findOne').yields(new Error());
    server.plugins.authentication.authenticate.validateFunc({iat: iat, d: {uid: 'fake'}}, function(err, isAuth, credentials){
      expect(err).to.be.ok;
      expect(isAuth).to.not.be.ok;
      expect(credentials).to.not.be.ok;
      stub.restore();
      done();
    });
  });

  it('should find a user', function(done){
    var iat = (Date.now() / 1000) - 5;
    var stub = Sinon.stub(User, 'findOne').yields(null, {_id: 3});
    server.plugins.authentication.authenticate.validateFunc({iat: iat, d: {uid: 'fake'}}, function(err, isAuth, credentials){
      expect(err).to.not.be.ok;
      expect(isAuth).to.be.ok;
      expect(credentials._id).to.equal(3);
      stub.restore();
      done();
    });
  });
});
