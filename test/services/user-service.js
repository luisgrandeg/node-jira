var test = require('tape')
var nock = require('nock')
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

test('user-service login', function (t) {
  t.plan(1);

  var mock = nock('http://api.packitos.com')
    .get('/v1/login')
    .reply(200, {
      email: 'demo@demo.com',
      password: '123456',
      token: 'xyzASDF12345'
    });

  PacklinkSDK.userService.login({email: 'demo@demo.com', password: '123456'})
    .then(function (res) {
      t.equal(res.data.token, 'xyzASDF12345');
    });
});

test('user-service getUserInfo', function (t) {
  t.plan(1);

  var mock = nock('http://api.packitos.com')
    .get('/v1/user')
    .reply(200, {
      email: 'demo@demo.com'
    });

  PacklinkSDK.userService.getUserInfo()
    .then(function (res) {
      t.equal(res.data.email, 'demo@demo.com');
    });
});

test('user-service getKeys', function (t) {
  t.plan(2);

  var mock = nock('http://api.packitos.com')
    .get('/v1/getKeys')
    .reply(200, {
      email: 'demo@demo.com',
      token: 'xyzASDF12345'
    });

  PacklinkSDK.userService.getKeys()
    .then(function (res) {
      t.equal(res.data.email, 'demo@demo.com');
      t.equal(res.data.token, 'xyzASDF12345');
    });
});

test('user-service logout', function (t) {
  t.plan(1);
  PacklinkSDK.userService.logout();
  t.ok(true);
});
