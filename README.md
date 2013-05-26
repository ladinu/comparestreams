# equal-streams

This module check if two (or more) readable streams are equal. A SHA1 hash is 
created for each given stream. After all streams end, the hashes are compared
and results are returned through a callback.

## Install
Using npm:
```sh
$ npm install equal-streams
```
From source:
```sh
$ git clone https://github.com/ladinu/equal-streams.git
$ cd equal-streams/
$ npm link
```

## Examples

```javascript
var compare = require('equal-streams');

var streamOne = request('http://example.com');
var streamTwo = request('http://example.com');

compare(streamOne, streamTwo, function(err, equal) {
  if (err) return console.log(err);
  if (equal) console.log('streamOne === streamTwo');
});

var google = request('http://google.com');
var bing   = request('http://bing.com');

compare(google, bing, function(err, equal) {
  if (err) return console.log(err);
  if (!equal) console.log('google !== bing');
});
```

## API
### equalStreams([streams], callback)
  - Must provide at least two readable streams and a callback. If one of the streams
    emit an `error`, callback will return with an error.

  - `streams` can be a single array of streams (`equalStreams([s1, s2, s3], callback)`) or multiple streams 
    i.e `equalStreams(s1, s2, s3, callback)`

  - `callback` will return with a `boolean` or an `error` (`callback(err, equal)`)


## Testing

```sh
$ cd equal-streams/
$ npm install
$ npm test
```

## License

Copyright (c) 2013 Ladinu Chandrasinghe

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
THE USE OR OTHER DEALINGS IN THE SOFTWARE.
