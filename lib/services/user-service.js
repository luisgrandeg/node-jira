'user strict';

var Promise = require('bluebird');

/*\
 * userService
 [object]
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
     * Login a user. To logout a user see @userService.logout
     > Arguments
     - user (object) User login information
     o {
     o   email (string) user email
     o   password (string) user password
     o }
     = Promise (promise)
     > Example
     | var Requestor = require('./requestor');
     | var config = require('./config/env/index');
     | var requestor = new Requestor(config);
     | var userService = require('./user-service')(requestor);
     | userService.login({email: 'demo@demo.com', password: '123456'}).then(function (res) {
     |  console.log(res);
     | });
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

    /*\
     * userService.logout
     [method]
     * Logout a user. To login a user see @userService.login
     = Promise (promise) To be resolved with a boolean.
     > Example
     | // Suppose the userService is already initialized
     | userService.logout().then(function (res) {
     |  console.log(res === true); // true
     | });
    \*/
    logout: function () {
      return new Promise(function (resolve) {
        isLoggedIn = false;
        currentUser = null;
        requestor.setToken(null);
        resolve(true);
      });
    },

    /*\
     * userService.isLoggedIn
     [method]
     * Check if a user is logged in
     = Promise (promise) Resolved with a boolean
     > Example
     | userService.isLoggedIn().then(function (isLoggedIn) {
     |  console.log(isLoggedIn);
     | });
    \*/
    isLoggedIn: function () {
      return new Promise(function (resolve) {
        resolve(isLoggedIn);
      });
    },

    /*\
     * userService.getUserInfo
     [method]
     * Get the users account information
     = Promise (promise)
     > Example
     | userService.getUserInfo().then(function (res) {
     |  console.log(res.data);
     | });
    \*/
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

    /*\
     * userService.getKeys
     [method]
     * Get the user API keys
     = Promise (promise)
     > Example
     | userService.getKeys().then(function (res) {
     |  console.log(res.data);
     | });
    \*/
    getKeys: function () {
      return requestor.request('GET', '/v1/getKeys').end();
    }
  };
}

module.exports = userService;
