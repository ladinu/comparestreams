var crypto = require('crypto');
var events = require('events');
var util   = require('util');

// Create `n` SHA1 hash streams
var createHashes = function(n) {
  var hashes = [];
  for (i = 0; i < len; i++)
    hashes.push( crypto.createHash('sha1') );
  return hashes;
}

function Comparestreams() {
  var args     = Array.prototype.slice.call(arguments);
  var callback = args[args.length > 0 ? args.length -1: 0;];

  if (typeof callback !== 'function') {

  }
}

util.inherits(Comparestreams, events.EvenetEmitter);

module.exports = comparestream;
var comparestreams = function() {
  return new Comparestreams(arguments);
}
