var config = require('../config/');
var mongoose = require('mongoose');

// Require model schemas
var UserSchema = require('../models/schema/user');

connection = mongoose.createConnection(
  config.db.host,
  config.db.name,
  config.db.port
);

connection.model('User', UserSchema);

module.exports = connection;
