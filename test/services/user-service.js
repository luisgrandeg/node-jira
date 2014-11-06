var test = require('tape')
var PacklinkSDK = require('../../lib');

test('user-service', function (t) {
  t.plan(7);

  t.equal(typeof PacklinkSDK.userService, 'object');
  t.equal(typeof PacklinkSDK.userService.login, 'function');
  t.equal(typeof PacklinkSDK.userService.logout, 'function');
  t.equal(typeof PacklinkSDK.userService.isLoggedIn, 'function');
  t.equal(typeof PacklinkSDK.userService.getUserInfo, 'function');
  t.equal(typeof PacklinkSDK.userService.getKeys, 'function');
  t.notOk(PacklinkSDK.userService.isLoggedIn());
});
