'use strict';

var Good = require('good');
var GoodConsole = require('good-console');

module.exports = {
  register: Good,
  options: {
    reporters: [{
      reporter: GoodConsole,
      events: {log: '*', response: '*', error: '*', request: '*'}
    }]
  }
};
