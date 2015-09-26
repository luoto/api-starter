var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(payload) {
  var options = {
    expiresInMinutes: config.token.expiration,
    issuer: config.token.issuer
  };

  var token = jwt.sign(payload, config.token.secret, options);
  return token;
}
