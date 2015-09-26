var config = require('../config');
var HTTPStatus = require('http-status');
var jwt = require('jsonwebtoken');
var createResponse = require('../utils/create-response');

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.header['x-access-token'];
  if (!token) {
    res
      .status(HTTPStatus.UNAUTHORIZED)
      .send(createResponse('fail', 'Token required'));
  } else {
    jwt.verify(token, config.token.secret, function(err, decoded) {
      if (err) {
        res
          .status(HTTPStatus.UNAUTHORIZED)
          .send(createResponse('fail', 'Invalid token'));
      } else {
        // Do what needs to be done with the token payload
        req._username = decoded.username;

        next();
      }
    });
  }
}
