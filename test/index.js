var test = require('tape')
  , sdk = require('../lib');

test('index', function (t) {
  t.plan(7);

  t.equal(typeof sdk.shipmentsService, 'object');
  t.equal(typeof sdk.shipmentsService.searchShipment, 'function');
  t.equal(typeof sdk.shipmentsService.getShipments, 'function');
  t.equal(typeof sdk.shipmentsService.getDetails, 'function');
  t.equal(typeof sdk.shipmentsService.cancelShipment, 'function');
  t.equal(typeof sdk.shipmentsService.getLabel, 'function');
  t.equal(typeof sdk.shipmentsService.trackShipment, 'function');
});
