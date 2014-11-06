'use strict';

var url = require('url');
var q = require('q');

var request = require('request');

function RequestManager(config) {
  this.config = config;
}

RequestManager.prototype.request = function (options) {
  var that = this;
  var deferred = q.defer();
  options.url = url.resolve(this.config.api.url, options.url);
  request(options, function (error, response, body) {
    if (error) {
      deferred.reject(error, body, response);
    }
    deferred.resolve(body, response.statusCode, that.getHeaders(response.headers), options);
  });
  return deferred.promise;
};

RequestManager.prototype.getHeader = function (headers) {
  return function(headerName) {
    return headers[headerName];
  }
};

module.exports = RequestManager;
