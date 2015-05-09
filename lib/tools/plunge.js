'use strict';

var Fs = require('fs');
var Path = require('path');

var path = Path.join(__dirname, '../plugins');
var plugins = [];

function requireDirectory(dir){
  Fs.readdirSync(dir).forEach(function(file){
    var full = dir + '/' + file;

    if(Fs.statSync(full).isDirectory()){
      requireDirectory(full);
    }else{
      plugins.push(require(full));
    }
  });
}

requireDirectory(path);
module.exports = plugins;
