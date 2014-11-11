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

/*\
 * Requestor
 [ method ]
 - config (object) #optional @config object
 = requestor (object) Interface for the requestor
\*/
function Requestor(config) {
  this.config = config || {};
}

/*\
 * Requestor.request
 [ method ]
 - method (string) HTTP method name
 - path (string) Path where to make the request
 = request (object) The actual request object
 | var Requestor = require('./requestor');
 | var config = require('./config');
 | var requestor = new Requestor(config);
 | var promise = requestor.request('GET', '/v1/some/endpoint').end();
 | promise.then(function (res) {
 |   console.log(res.data);
 | });
\*/
Requestor.prototype.request = function (method, path) {
  var endpoint = url.resolve(this.config.api.uri, path);
  var req = request(method, endpoint);
  if (this.config.token) {
    req.set('Authorization', this.config.token);
  }
  return req;
};

/*\
 * Requestor.setToken
 [ method ]
 * Set the token to the requestor so all requests are signed
 - token (string) The generated token coming from the server
 | var Requestor = require('./requestor');
 | var config = require('./config');
 | var requestor = new Requestor(config);
 | var promise = requestor.request('GET', '/v1/login').end();
 | promise.then(function (res) {
 |   requestor.setToken(res.data.token);
 | });
\*/
Requestor.prototype.setToken = function (token) {
  this.config.token = token;
};

module.exports = Requestor;
