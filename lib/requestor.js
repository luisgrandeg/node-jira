'use strict';

var url = require('url');
var q = require('bluebird');
var request = require('superagent');

// Make superagent return a promise after sending a request
var end = request.Request.prototype.end;
request.Request.prototype.end = function () {
  var deferred = q.defer();
  end.call(this, function (res) {
    deferred[res.error ? 'reject' : 'resolve']({
      data: res.body,
      status: res.status,
      headers: res.headers
    });
  });
  return deferred.promise;
};

function Requestor(config) {
  this.config = config || {};
}

Requestor.prototype.request = function (method, path) {
  var endpoint = url.resolve(this.config.api.uri, path);
  var req = request(method, endpoint);
  if (this.config.token) {
    req.set('Authorization', this.config.token);
  }
  return req;
};

Requestor.prototype.setToken = function (token) {
  this.config.token = token;
};

module.exports = Requestor;
