var fs     = require('fs');
var assert = require('assert');
var path   = require('path');

var equal = require('../');

var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('streams-equal', function() {

  it('should throw error when only callback is given', function(done) {
    equal(done);
  });

  it('should throw error when no arguments are given', function() {
    assert.throws(equal());
  });

});
