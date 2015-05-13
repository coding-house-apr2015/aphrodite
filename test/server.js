/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Sinon = require('sinon');
var Server = require('../lib/server');
var Version = require('../lib/plugins/endpoints/version');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;

describe('server.js', function(){
  it('should create a server', function(done){
    Server.init(function(err, server){
      expect(err).to.not.be.ok;
      expect(server).to.be.ok;
      server.stop(function(){
        Mongoose.disconnect(done);
      });
    });
  });

  it('should cause a plugin failure', function(done){
    var stub = Sinon.stub(Version, 'register').yields(new Error());
    Server.init(function(err, server){
      expect(err).to.be.ok;
      expect(server).to.not.be.ok;
      stub.restore();
      Mongoose.disconnect(done);
    });
  });
});
