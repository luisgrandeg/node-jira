var assert = require("assert")
var PacklinkSDK = require('../../lib');

describe('user-service', function () {
  it('should be an object', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService, 'object');
  });

  it('should have a searchShipment method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.searchShipment, 'function');
  });

  it('should have a getShipments method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.getShipments, 'function');
  });

  it('should have a getDetails method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.getDetails, 'function');
  });

  it('should have a cancelShipment method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.cancelShipment, 'function');
  });

  it('should have a getLabel method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.getLabel, 'function');
  });

  it('should have a trackShipment method', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService.trackShipment, 'function');
  });
});
