var assert = require("assert")
  , nock = require('nock')
  , Requestor = require('../lib/requestor');

// set up mock
var mock = nock('http://api.packitos.com')
  .get('/v1/login')
  .reply(200, {
    token: 'xyzASDF12345',
    username: 'tester',
    email: 'tester@packlink.com'
  })
  .get('/v1/user')
  .reply(400, {
    message: 'You\'re not allowed here'
  });

describe('Requestor', function () {
  it('should be a constructor', function () {
    assert.equal(typeof Requestor, 'function');
    assert.equal(Requestor.prototype.constructor, Requestor);
  });

  it('should initialize with a config object', function () {
    var requestor = new Requestor({api: 'someUrl'});
    assert.equal(JSON.stringify(requestor.config), JSON.stringify({api: 'someUrl'}));

    requestor = new Requestor();
    assert.equal(typeof requestor.config, 'object');
  });

  it('should have a request method', function () {
    var requestor = new Requestor({
      token: '12345ASDFyxz',
      api: {
        uri: 'http://api.packitos.com'
      }
    });

    assert.equal(typeof requestor.request, 'function');

    var request = requestor.request('GET', '/v1/login');

    assert.equal(typeof request, 'object');

    request.end().then(function (res) {
      assert.equal(res.data.token, 'xyzASDF12345');
      assert.equal(res.data.username, 'tester');
      assert.equal(res.data.email, 'tester@packlink.com');
    });

    requestor.setToken(undefined);
    request = requestor.request('GET', '/v1/user');
    request.end().then(
      function (res) { },
      function (res) {
        assert.equal(res.status, 400);
      });
  });

  it('should be able to set the token into the requestor', function () {
    var requestor = new Requestor();
    assert.equal(typeof requestor.setToken, 'function');
    requestor.setToken('ASDF');
    assert.equal(requestor.config.token, 'ASDF');

    requestor.setToken('FOOBAR');
    assert.equal(requestor.config.token, 'FOOBAR');
  });
});
