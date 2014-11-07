'user strict';

var Promise = require('bluebird');

function userService(requestor) {
  var currentUser = null;
  var isLoggedIn = false;

  return {
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
      isLoggedIn = false;
      currentUser = null;
      requestor.setToken(null);
    },

    isLoggedIn: function () {
      return isLoggedIn;
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
