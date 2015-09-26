// TODO: Controllers are a bit hefty, delegate off some responsibilities to the model?

var mongoose = require('mongoose');
var createToken = require('../utils/create-token');
var createResponse = require('../utils/create-response');
var HTTPStatus = require('http-status');

var db = require('../db');
var User = db.model('User');

exports.login = function(req, res) {
  User.findOne({username: req.body.user.username}, function(err, user) {
    if (err) {
      res
        .status(HTTPStatus.BAD_REQUEST)
        .send(createResponse('error', 'Database error'));
    } else if (!user) {
      res
        .status(HTTPStatus.BAD_REQUEST)
        .send(createResponse('fail', 'User does not exist'));
    } else {
      var bcrypt = require('bcrypt');
      var encrypted = user.password;
      var password = req.body.password;

      bcrypt.compare(password, encrypted, function(err, result) {
        if (result === false) {
          res
            .status(HTTPStatus.UNAUTHORIZED)
            .send(createResponse('fail', 'Incorrect password'));
        } else {
          var token = createToken({username: user.username});
          res
            .status(HTTPStatus.OK)
            .send(createResponse('success', 'Successfully logged in', {token: token}));
        }
      });
    }
  });
}

exports.signup = function(req, res) {
  var user = new User(req.body.user);

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        res
          .status(HTTPStatus.CONFLICT)
          .send(createResponse('fail', 'Username or email already exists'));
      } else {
        res
          .status(HTTPStatus.BAD_REQUEST)
          .send(createResponse('fail', 'Database error'));
      }
    } else {
       res
        .status(HTTPStatus.OK)
        .send(createResponse('success', 'Successfully logged in'));
    }
  });
}

// FIXME: currently in place to test authentication middleware
exports.getProfile = function(req, res) {
  res
    .status(HTTPStatus.OK)
    .send(createResponse('sucess', 'Authorized'));
}
