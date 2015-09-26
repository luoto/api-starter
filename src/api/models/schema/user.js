var config = require('../../config');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

// Encrypts user password before storing into database
UserSchema.pre('save', function(next) {
  var _this = this;

  if (!_this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(_this.password, config.salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      _this.password = hash;
      next();
    });
  }
});

module.exports = UserSchema;
