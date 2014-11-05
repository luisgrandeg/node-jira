'user strict';

function userService(requestManager) {
  var currentUser = null;
  var isLoggedIn = false;

  return {
    login: function (user) {
      return requestManager.get({
        url: '/v1/login',
        headers: {
          Authorization: 'Basic ' + new Buffer(user.email + ':' + user.password).toString('base64')
        }
      })
        .then(function (data, status, headers, config, statusText) {
          // set apiKey to requestManager
          isLoggedIn = true;
        });
    },

    logout: function () {
      isLoggedIn = false;
      currentUser = null;
    },

    isLoggedIn: function () {
      return isLoggedIn;
    },

    getUserInfo: function () {
      return requestManager.get('/v1/user').then(function (data) {
        currentUser = data;
      });
    },

    getKeys: function () {
      return requestManager.get('/v1/getKeys');
    }
  };
}

module.exports = userService;
