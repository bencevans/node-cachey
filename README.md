# Cachey [![Travis Build Status](https://img.shields.io/travis/bencevans/node-cachey.svg?style=flat-square)](https://travis-ci.org/bencevans/node-cachey) [![Coverage Status](https://img.shields.io/coveralls/bencevans/node-cachey.svg?style=flat-square)](https://coveralls.io/r/bencevans/node-cachey?branch=master) [![Dependency Status](https://img.shields.io/david/bencevans/node-cachey.svg?style=flat-square)](https://david-dm.org/bencevans/node-cachey)

> Redis Backed Cache for Node.JS

## Features

* Asynchronous
* Key/Value Cache
* Flush a key
* Flush all keys
* JSON stringify and parse for storing Objects in Redis

## Install

    $ npm install cachey

## Usage

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



## Examples

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

    $ npm test

##Links

* [GitHub Repo](https://github.com/bencevans/node-cachey)
* [Issue Tracker](https://github.com/bencevans/node-cachey/issues)

## Licence

MIT © [Ben Evans](http://bensbit.co.uk)
