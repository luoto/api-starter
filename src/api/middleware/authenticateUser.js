var createResponse = require('../utils/create-response');
var HTTPStatus = require('http-status');

module.exports = function(req, res, next) {
  if (req.params.username != req._username) {
    res
      .status(HTTPStatus.UNAUTHORIZED)
      .send(createResponse('fail', 'Unauthorized access'));
  } else {
    next();
  }
}
