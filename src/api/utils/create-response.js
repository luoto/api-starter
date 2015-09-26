module.exports = function(status, message, data, code) {
  return {
    status: status,
    message: message || null,
    data: data || null,
    code: code || null,
  };
}
