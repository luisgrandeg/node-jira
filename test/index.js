var test = require('tape')
var PacklinkSDK = require('../lib');

test('index', function (t) {
  t.plan(3);

  t.equal(typeof PacklinkSDK, 'object');
  t.equal(typeof PacklinkSDK.shipmentsService, 'object');
  t.equal(typeof PacklinkSDK.userService, 'object');
});
