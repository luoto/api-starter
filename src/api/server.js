var express = require('express');
app = express();

require('./middleware')(app);
require('./router')(app);

module.exports = app;
