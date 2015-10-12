var config = require('./api/config');
var server = require('./api/server');

server.listen(config.port, config.host);
