var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var config = require('../config');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  if (config.logging) {
    app.use(morgan('dev'));
  }

  if (config.cors) {
    app.use(cors());
  }
}
