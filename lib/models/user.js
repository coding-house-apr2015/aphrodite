/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var User;

var userSchema = Mongoose.Schema({
  firebaseId: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

User = Mongoose.model('User', userSchema);
module.exports = User;
