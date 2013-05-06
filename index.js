var crypto = require('crypto');

// Create `n` SHA1 hashes
var createHashes = function(n) {
  var hashes = [];
  for (var i = 0; i < n; i++)
    hashes.push( crypto.createHash('sha1') );
  return hashes;
}


// If a single stream emit an error, then streams aren't equal
var addErrorHandlers = function(streams, callback) {
  var lock = 0;
  streams.forEach(function(stream) {
    stream.once('error', function() {
      ++lock;
      if (lock === 1) callback(null, new Error('A stream emitted and error'));
    });
  });
}

// Check if a list of streams are readable
var areReadable = function(streams) {
  var readable = true;
  streams.forEach(function(i) {
    if (!i.readable)
      readable = false;
  });
  return readable;
}


var checkHashes = function (hashes, callback) {
  var isEqual = true;
  var hexHashSample = hashes[0].digest('hex');
  
  for (var i = 1; (i < hashes.length) && isEqual; i++) {
    var hexHash = hashes[i].digest('hex');
    if (hexHashSample !== hexHash) isEqual = false;
  }
  if (isEqual) callback(true, null); else callback(false, null);
}


var areEqual = function(streams, callback) {
  addErrorHandlers(streams, callback);

  var hashes  = createHashes(streams.length);
  var lock    = 0;
  var lockCap = streams.length;

  streams.forEach(function(stream, index) {
    stream.on('data', function(data) {
      hashes[index].update(data);
    });

    stream.once('end', function() {
      ++lock;
      if (lock === lockCap) checkHashes(hashes, callback);
    });
  });
}

module.exports = equalStreams;
function equalStreams() {
  var args     = Array.prototype.slice.call(arguments);
  var callback = args[args.length > 0 ? args.length -1: 0]; // Last item of args

  args.pop();
  var streams = args;

  if (typeof callback !== 'function') {
    throw new Error("Must give a callback");
  } else if (streams.length < 2){
    callback(null, new Error("must give 2 or more streams"));
    return;
  }

  if (!areReadable(streams)) {
    callback(null, new Error("Must provide readable streams"));
  } else {
    areEqual(streams, callback);
  }
}

