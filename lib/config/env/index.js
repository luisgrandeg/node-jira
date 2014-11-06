'use strict';

var config = {
  development: {
    api: {
      uri: 'http://api.packitos.com'
    }
  },
  production: {
    api: {
      uri: 'http://api.packitos.com'
    }
  },
  test: {
    api: {
      uri: 'http://api.sandbox.packitos.com'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
