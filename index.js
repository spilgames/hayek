exports.Agent = require('./agent')

exports.config = function() {
  var c = require('minimist')(process.argv.slice(2));
  delete c._;
  return c;
}
