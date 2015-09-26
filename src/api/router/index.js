module.exports = function (app) {
  app.use('/api/users', require('./routes/user'));
}
