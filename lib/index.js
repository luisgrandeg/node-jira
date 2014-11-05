'use strict';

var RequestManager = require('./request-manager');
var config = require('./config/env/index');
var requestManager = new RequestManager(config);

module.exports = {
  shipmentsService: require('./services/shipments-service')(requestManager),
  userService: require('./services/user-service')(requestManager)
};
