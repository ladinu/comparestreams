var fs     = require('fs');
var assert = require('assert');
var path   = require('path');

var equal = require('../');

var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('streams-equal', function() {

  it('should throw error when only callback is given', function() {
    assert.throws(equal(function(){}));
  });

  it('should throw error when no arguments are given', function() {
    assert.throws(equal());
  });

  it('should throw error when only 1 stream given with callback', function() {
    assert.throws( equal(read('tf0'), function(){}) );
  });

  it.skip('should evaluate two equal streams to be equal', function(done) {

  });

  it.skip('should evaluate two inequal streams to be inequal', function(done) {

  });

  it.skip('shoudl evaluate two or more equal streams to be equal', function(done) {

  });

  it.skip('should evaluate two or more inequal streams to be inequal', function(done) {

  });
});
