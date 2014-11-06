var test = require('tape')
  , Requestor = require('../lib/requestor');

test('Requestor', function (t) {
  t.plan(2);

  t.equal(typeof Requestor, 'function');
  t.equal(Requestor.prototype.constructor, Requestor);
});

test('Requestor config', function (t) {
  t.plan(2);

  var r1 = new Requestor({api: 'someUrl'});
  t.equal(JSON.stringify(r1.config), JSON.stringify({api: 'someUrl'}));

  var r2 = new Requestor();
  t.equal(r2.config, undefined);
});
