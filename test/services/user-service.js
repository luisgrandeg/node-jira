var assert = require("assert")
var nock = require('nock')
var PacklinkSDK = require('../../lib');

describe('user-service', function () {
  it('should be an object', function () {
    assert.equal(typeof PacklinkSDK.userService, 'object');
  });

  it('should have a login method', function () {
    assert.equal(typeof PacklinkSDK.userService.login, 'function');
  });

  it('should have a logout method', function () {
    assert.equal(typeof PacklinkSDK.userService.logout, 'function');
  });

  it('should have a isLoggedIn method', function () {
    assert.equal(typeof PacklinkSDK.userService.isLoggedIn, 'function');
  });

  it('should have a getUserInfo method', function () {
    assert.equal(typeof PacklinkSDK.userService.getUserInfo, 'function');
  });

  it('should have a getKeys method', function () {
    assert.equal(typeof PacklinkSDK.userService.getKeys, 'function');
  });

  it('should check if user is logged in', function () {
    PacklinkSDK.userService.isLoggedIn().then(function (isLoggedIn) {
      assert.ok(!isLoggedIn);
    });
  });

  it('should login a user', function () {
    var mock = nock('http://api.packitos.com')
      .get('/v1/login')
      .reply(200, {
        email: 'demo@demo.com',
        password: '123456',
        token: 'xyzASDF12345'
      });

    PacklinkSDK.userService.login({email: 'demo@demo.com', password: '123456'})
      .then(function (res) {
        assert.equal(res.data.token, 'xyzASDF12345');
      });
  });

  it('should return user info', function () {
    var mock = nock('http://api.packitos.com')
      .get('/v1/user')
      .reply(200, {
        email: 'demo@demo.com'
      });

    PacklinkSDK.userService.getUserInfo()
      .then(function (res) {
        assert.equal(res.data.email, 'demo@demo.com');
      });
  });

  it('shuold get userInfo is already logged in', function () {
    var mock = nock('http://api.packitos.com')
      .get('/v1/user')
      .reply(200, {
        email: 'demo@demo.com'
      });

    PacklinkSDK.userService.getUserInfo()
      .then(function (res) {
        assert.equal(res.data.email, 'demo@demo.com')
      });
  });

  it('should return user api keys', function () {
    var mock = nock('http://api.packitos.com')
      .get('/v1/getKeys')
      .reply(200, {
        email: 'demo@demo.com',
        token: 'xyzASDF12345'
      });

    PacklinkSDK.userService.getKeys()
      .then(function (res) {
        assert.equal(res.data.email, 'demo@demo.com');
        assert.equal(res.data.token, 'xyzASDF12345');
      });
  });

  it('should logout a user', function () {
    PacklinkSDK.userService.isLoggedIn().then(function (isLoggedIn) {
      assert.ok(isLoggedIn);
      PacklinkSDK.userService.logout().then(function () {
        PacklinkSDK.userService.isLoggedIn().then(function (isLoggedIn) {
          assert.ok(!isLoggedIn);
        });
      });
    });
  });
});
