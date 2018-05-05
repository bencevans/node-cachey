
/**
 * Dependencies
 */

var fs = require("fs");
var async = require('async');

/**
 * create a Cachey instance
 * @param  {Object} config should include a 'redisClient' element 
 * @return {Cachey Instance}
 */
function createCachey (config) {

  if(!config)
    throw "You've not provided a redisClient instance";

  if(!config.preKey)
    config.preKey = 'cachey:';

  if(typeof config.redisClient == "undefined")
    throw "You've not provided a redisClient instance";

  return new Cachey(config);

}

/**
 * Cachey Object "Class"
 * @param {Object}
 */
var Cachey = function (config) {
  this.preKey = config.preKey || 'cachey:';
  this.redisClient = config.redisClient || config;
  return this;
};

/**
 * Cache an item for x seconds
 * @param  {String} key                A unique id for the object your caching
 * @param  {Number} ttl                Time To Live in seconds
 * @param  {Function} getDataFunction  Data generating/providing function with a callback of (err, data)
 * @param  {Function} returnDataFunction Returns the data either from cache or getDataFunction
 * @return {Void}
 */
Cachey.prototype.cache = function (key, ttl, getDataFunction, returnDataFunction) {
  var self = this;

  // Get Data From DB
  self.redisClient.get(self.preKey + key, function (err, data) {
    if(err) return returnDataFunction(err);

    if(data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return returnDataFunction(e);
      }
      return returnDataFunction(null, data);
    }

    // Data Exists? Return That!
    if(data !== null) return returnDataFunction(null, data);

    // Get Data from Function
    getDataFunction(function(err, data) {
      if(err) return returnDataFunction(err);

      var dataString;

      try {
        dataString = JSON.stringify(data);
      } catch (e) {
        return returnDataFunction(e);
      }

      // Save Data to DB
      self.redisClient.set(self.preKey + key, dataString, function (err) {
        if(err) return returnDataFunction(err);

        // Set it to Expire with ttl provided
        self.redisClient.expire(self.preKey + key, ttl, function(err) {
          return returnDataFunction(err, data);
        });
      });
    });
  });
};

/**
 * Flush all or a specified key
 * @param  {String}   key      Optional Identifier (No Identifier will flush all keys)
 * @param  {Function} callback Callback function with params (err, flushed)
 * @return {Void}
 */
Cachey.prototype.flush = function (key, callback) {
  var self = this;

  if(typeof callback == 'undefined') {
    callback = key;
    key = '*';
  }
  this.redisClient.keys(this.preKey + key + '*', function(err, keys) {
    async.map(keys, function(key, cb) {
      self.redisClient.del(this.preKey + key, cb);
    }, function(err, ress) {
      if(err) return callback(err);
      return callback(null, true);
    });
  });

};

module.exports = createCachey;