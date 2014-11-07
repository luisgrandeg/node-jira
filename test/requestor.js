var test = require('tape')
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

test('Requestor', function (t) {
  t.plan(2);

  t.equal(typeof Requestor, 'function');
  t.equal(Requestor.prototype.constructor, Requestor);
});

test('Requestor config', function (t) {
  t.plan(2);

  var requestor = new Requestor({api: 'someUrl'});
  t.equal(JSON.stringify(requestor.config), JSON.stringify({api: 'someUrl'}));

  requestor = new Requestor();
  t.equal(typeof requestor.config, 'object');
});

test('Requestor.request', function (t) {
  t.plan(5);

  var requestor = new Requestor({
    token: '12345ASDFyxz',
    api: {
      uri: 'http://api.packitos.com'
    }
  });

  var request = requestor.request('GET', '/v1/login');

  t.equal(typeof request, 'object');

  request.end().then(function (res) {
    t.equal(res.data.token, 'xyzASDF12345');
    t.equal(res.data.username, 'tester');
    t.equal(res.data.email, 'tester@packlink.com');
  });


  requestor.setToken(undefined);
  request = requestor.request('GET', '/v1/user');
  request.end().then(
    function (res) {

    },
    function (res) {
      console.log('error', res);
      t.equal(res.status, 400)
    });

});



test('Requestor.setToken', function (t) {
  t.plan(2);

  var requestor = new Requestor();
  requestor.setToken('ASDF');
  t.equal(requestor.config.token, 'ASDF');

  requestor.setToken('FOOBAR');
  t.equal(requestor.config.token, 'FOOBAR');
});

