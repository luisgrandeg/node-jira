var test = require('tape')
var PacklinkSDK = require('../../lib');

test('user-service', function (t) {
  t.plan(7);

  t.equal(typeof PacklinkSDK.shipmentsService, 'object');
  t.equal(typeof PacklinkSDK.shipmentsService.searchShipment, 'function');
  t.equal(typeof PacklinkSDK.shipmentsService.getShipments, 'function');
  t.equal(typeof PacklinkSDK.shipmentsService.getDetails, 'function');
  t.equal(typeof PacklinkSDK.shipmentsService.cancelShipment, 'function');
  t.equal(typeof PacklinkSDK.shipmentsService.getLabel, 'function');
  t.equal(typeof PacklinkSDK.shipmentsService.trackShipment, 'function');
});
