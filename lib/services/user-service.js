'user strict';

var Promise = require('bluebird');

/*\
 * userService
 [function]
 - requestor (object) @Requestor object
 = userService (object) Interface for userService
\*/
function userService(requestor) {
  var currentUser = null;
  var isLoggedIn = false;

  return {
    /*\
     * userService.login
     [method]
     > Arguments
     - user (object) User login information
     o {
     o   email (string) user email
     o   password (string) user password
     o }
     = Promise (promise)
     > Example
     | var requestor = require('
     | var Requestor = require('./requestor');
     | var config = require('./config/env/index');
     | var requestor = new Requestor(config);
     | var userService = require('./user-service')(requestor);
     | userService.login({email: 'demo@demo.com', password: '123456'}).then(function (res) {
     |  console.log(res);
     | };
    \*/
    login: function (user) {
      return requestor.request('GET', '/v1/login')
        .auth(user.email, user.password)
        .end()
        .then(function (res) {
          requestor.setToken(res.data.token);
          isLoggedIn = true;
          return res;
        });
    },

    logout: function () {
      return new Promise(function (resolve) {
        isLoggedIn = false;
        currentUser = null;
        requestor.setToken(null);
        resolve(true);
      });
    },

    isLoggedIn: function () {
      return new Promise(function (resolve) {
        resolve(isLoggedIn);
      });
    },

    getUserInfo: function () {
      if (currentUser) {
        return new Promise(function (resolve) {
          resolve({data: currentUser});
        });
      } else {
       return requestor.request('GET', '/v1/user')
          .end()
          .then(function (res) {
            currentUser = res.data;
            return res;
          });
      }
    },

    getKeys: function () {
      return requestor.request('GET', '/v1/getKeys').end();
    }
  };
}

module.exports = userService;
