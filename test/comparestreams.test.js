var fs     = require('fs');
var os     = require('os');
var assert = require('assert');
var path   = require('path');

var uuid  = require('uuid');
var equal = require('../');

var namespace;
namespace = uuid.unparse(uuid.v4(null, new Buffer(16), 0));

var garbage = [];

var write = function(fname) {
  var fname = path.join(os.tmpdir(), namespace + fname);
  garbage.push(fname);
  return fs.createWriteStream(fname);
}

var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

after(function() {
  garbage.forEach(function(path) {
    fs.unlinkSync(path);
  });
});

describe('equal-streams', function() {

  it('should throw error when only callback is given', function(done) {
    equal(function (result, err) {
      if (err) 
        done()
      else
        done(new Error('Was expecting an error to be given'));
    });
  });

  it('should throw error when no arguments are given', function() {
    assert.throws(function() {equal()});
  });

  it('should throw error when only 1 stream given with callback', function(done) {
    equal( read('tf0'), function(result, err) {
      if (err)
        done()
      else
        done(new Error('Was expecting an error'));
    });
  });

  it('should throw error when a stream is not readable', function(done) {
    var ws = write('tf2');
    var rs = read('tf0');
    rs.pipe(ws);

    equal(rs, ws, function(result, err) {
      if (err)
        done()
      else
        done(new Error('Was expecting an error'));
    });
  });

  it('should evaluate two equal streams to be equal', function(done) {
    equal( read('tf0'), read('tf0'), function(result, err) {
      if (err)
        done(err);
      else
        done(assert.equal(result, true));
    });
  });

  it('should evaluate two inequal streams to be inequal', function(done) {
    equal( read('tf0'), read('tf1'), function(result, err) {
      if (err)
        done()
      else
        done(assert.equal(result, false));
    });
    
  });

  it('shoudl evaluate two or more equal streams to be equal', function(done) {
    equal( read('tf0'), read('tf0'), read('tf0'), function(result, err) {
      if (err)
        done(err);
      else
        done(assert.equal(result, true));
    });
  });

  it('should evaluate two or more inequal streams to be inequal', function(done) {
    equal( read('tf0'), read('tf1'), read('tf0'), function(result, err) {
      if (err)
        done(err);
      else
        done(assert.equal(result, false));
    });
  });
});
