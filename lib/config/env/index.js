'use strict';

/*\
 * config
 [object]
 * API config object
\*/
var config = {
  /*\
   * config.development
   [object]
   * Development config
   > Options
   - api (object)
   o {
   o   uri (string) The API uri for development environment
   o }
  \*/
  development: {
    api: {
      uri: 'http://api.packitos.com'
    }
  },

  /*\
   * config.production
   [object]
   * Development config
   > Options
   - api (object)
   o {
   o   uri (string) The API uri for production environment
   o }
  \*/
  production: {
    api: {
      uri: 'http://api.packitos.com'
    }
  },

  /*\
   * config.test
   [object]
   * Development config
   > Options
   - api (object)
   o {
   o   uri (string) The API uri for sandbox environment
   o }
  \*/
  test: {
    api: {
      uri: 'http://api.sandbox.packitos.com'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
