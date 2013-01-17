var assert = require("assert");

var redisClient = require('redis').createClient();
var cachey = require('./')({redisClient:redisClient});


describe("Cachey", function(){

  it("shouldn't execute getDataFunction for a second time within the ttl and instead return cached data", function (done) {

    this.timeout(10000);

    var executed = 0;

    cachey.cache('hello', 4, function(callback){
      executed++;
      callback(null, 'world');
    }, function (err, data) {

      cachey.cache('hello', 4, function(callback){
        executed++;
        callback(null, "world2");
      }, function(err, data) {
        assert.equal(1, executed);
        assert.equal("world", data);
        done();
      });

    });

  });

  it("should return getDataFunction errors to returnDataFunction", function (done) {

    this.timeout(5000);

    cachey.cache('helloworld', 4, function(callback){
      callback("BIGERROR", 'world');
    }, function (err, data) {
      assert.equal("BIGERROR", err);
      done();
    });

  });

  it("should flush a key", function (done) {

    this.timeout(5000);

    cachey.cache('tmp', 60, function(cb){
      cb(null, 'yo');
    }, function(err, data) {
      //assert(null, err);
      assert('yo', data);
      cachey.flush(function(err, ok){
        assert.equal(null, err);
        assert.equal(true, ok);
        done();
      });
    });
  });

});

