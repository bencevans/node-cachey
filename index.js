var fs = require("fs");
var async = require('async');

exports = module.exports = createCachey;

function createCachey (config) {

  if(!config)
    throw "You've not provided a redisClient instance";

  if(!config.preKey)
    config.preKey = 'cachey:';

  if(typeof config.redisClient == "undefined")
    throw "You've not provided a redisClient instance";

  return new cachey(config);

}

var cachey = function (config) {
  this.preKey = config.preKey || 'cachey:';
  this.redisClient = config.redisClient || config;
  return this;
};

cachey.prototype.cache = function (key, ttl, getDataFunction, returnDataFunction) {
  var self = this;

  // Get Data From DB
  self.redisClient.get(self.preKey + key, function (err, data) {
    if(err) return returnDataFunction(err);

    // Data Exists? Return That!
    if(data !== null) return returnDataFunction(null, data);

    // Get Data from Function
    getDataFunction(function(err, data) {
      if(err) return returnDataFunction(err);

      // Save Data to DB
      self.redisClient.set(self.preKey + key, data, function (err) {
        if(err) return returnDataFunction(err);

        // Set it to Expire with ttl provided
        self.redisClient.expire(self.preKey + key, ttl, function(err) {
          return returnDataFunction(err, data);
        });
      });
    });
  });
};

cachey.prototype.flush = function (key, callback) {
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