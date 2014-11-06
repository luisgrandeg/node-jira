(function (isNode) {
  if (isNode) {
    PacklinkSDK = require('../lib');
  }
  PacklinkSDK.userService.login({email: 'demo@demo.com', password: '123456'}).then(function () {
    PacklinkSDK.shipmentsService.getShipments(0, 10).then(function (res) {
      console.log(res.data);
    });
  });
}(module && typeof module.exports !== 'undefined'));
