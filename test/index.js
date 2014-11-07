var assert = require("assert")
var PacklinkSDK = require('../lib');

describe('index', function (t) {

  it('should export PacklinkSDK', function () {
    assert.equal(typeof PacklinkSDK, 'object');
  });

  it('should export shipmentsService', function () {
    assert.equal(typeof PacklinkSDK.shipmentsService, 'object');
  });

  it('should export userService', function () {
    assert.equal(typeof PacklinkSDK.userService, 'object');
  })
});
