var fs    = require('fs');
var path  = require('path');

var equal = require('../');

var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('streams-equal', function() {
});
