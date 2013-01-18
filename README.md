#Cachey [![Travis Build Status](https://secure.travis-ci.org/bencevans/node-cachey.png)](https://travis-ci.org/bencevans/node-cachey)

Redis Backed Cache for Node.JS

# Features

* Asynchronous
* Key/Value Cache
* Flush a key
* Flush all keys
* JSON stringify and parse for storing Objects in Redis

##Install

```bash
npm install cachey
```

##Usage

1. Create a Redis Client Instance

    ```javascript
    var redis = require('redis').createClient();
    ```

2. Require Cachey & Parse in the redis instance

    ```javascript
    var cachey = require('cachey')({redisClient:redis});
    ```

3. Start Caching

    ```javascript
    cachey.cache(key, ttl, getDataFunction, returnDataFunction)
    ```

    Parameters:

    1. key - String - Unique Id for the data your caching
    * ttl - Number - Time (in Seconds) you want to cache data for
    * getDataFunction - Function - The first parameter parsed is a callback with the structure callback(err, data)
    * return DataFunction - Function - Callback that errors, then data.



##Examples

### Flushing a Key

```javascript
cachey.flush('beep', function(err, flushed) {
  if(err) throw err;
  console.log('beep was flushed away');
});
```

### Flushing all Keys

```javascript
cachey.flush(function(err, flushed) {
  if(err) throw err;
  console.log('all keys were flushed');
});
```

##Testing

`npm test`

##Links

* [GitHub Repo](https://github.com/bencevans/node-cachey)
* [Issue Tracker](https://github.com/bencevans/node-cachey/issues)

##Licence

(The MIT Licence)

Copyright (c) 2012 Ben Evans &lt;ben@bensbit.co.uk&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
