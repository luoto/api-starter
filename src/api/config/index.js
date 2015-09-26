// FIXME: have ability to merge config objects to reduce repeated code
// NOTE: Remember to change the secrets!

var config;

if (process.env.NODE_ENV === 'test') {
  config = {
    db: {
      host: 'localhost',
      name: 'users',
      port: '27017',
      uri: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
    },
    salt: 10,
    token: {
      secret: 'THE_SECRET',
      expiration: 60 * 24 * 7, // in minutes
      issuer: 'https://mydomain.com'
    },
    logging: false, // morgan
    cors: true
  };
}

if (process.env.NODE_ENV === 'dev') {
  config = {
    db: {
      host: 'localhost',
      name: 'test0001',
      port: '27017',
      uri: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
    },
    salt: 10,
    token: {
      secret: 'THE_SECRET',
      expiration: 60 * 24 * 7, // in minutes
      issuer: 'https://mydomain.com'
    },
    logging: true, // morgan
    cors: true
  };
}

if (process.env.NODE_ENV === 'prod') {
  config = {
    db: {
      host: 'localhost',
      name: 'users',
      port: '27017',
      uri: process.env.MONGOLAB_URI || 'mongodb://localhost/users'
    },
    salt: 10,
    token: {
      secret: 'THE_SECRET',
      expiration: 60 * 24 * 7, // in minutes
      issuer: 'https://mydomain.com'
    },
    logging: true, // morgan
    cors: true
  };
}

module.exports = config;
