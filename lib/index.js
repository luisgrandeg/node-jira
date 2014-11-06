'use strict';

var Requestor = require('./requestor');
var config = require('./config/env/index');
var requestor = new Requestor(config);

module.exports = {
  shipmentsService: require('./services/shipments-service')(requestor),
  userService: require('./services/user-service')(requestor)
};
