var assert = require('assert')
  , nock = require('nock')
  , PacklinkSDK = require('../../lib');

describe('shipment-service', function () {

  var mock = nock('http://api.packitos.com')
    .get('/v1/searchshipment/1')
    .reply(200,
      {
        "canceled": true,
        "carrier": "UPS",
        "collection": {
          "city": "Deutschland",
          "country": "Alemania",
          "email": "test@testing.com",
          "name": "Daniel Werner",
          "phone": "01516113123",
          "postalcode": "24103",
          "street": "Alleestr 29"
        },
        "collectionDate": "2014-11-05",
        "delivery": {
          "city": "Deutschland",
          "country": "Alemania",
          "email": "test@testing.com",
          "name": "Helena Zimmermann",
          "phone": "+491601139291",
          "postalcode": "24103",
          "street": "Schlowiesenstrae 7"
        },
        "parcel_number": "1",
        "parcels": [
          {
            "height": "15.00",
            "length": "15.00",
            "weight": "2.00",
            "width": "15.00"
          }
        ],
        "price": "6.31",
        "reference": "DE005C98E1014AA",
        "service": "Access Point an Privat",
        "status": "In Transit",
        "weight": "2.00"
      }
    )
    .get('/v1/shipments?offset=0&limit=1')
    .reply(200, {
      "pagination": {
        "current_page": 1,
        "total_pages":  1,
        "total_registers": 1
      },
      "shipments": [
        {
          "canceled": true,
          "carrier": "UPS",
          "collection": {
            "city": "Deutschland",
            "country": "Alemania",
            "email": "test@testing.com",
            "name": "Daniel Werner",
            "phone": "01516113123",
            "postalcode": "24103",
            "street": "Alleestr 29"
          },
          "collectionDate": "2014-11-05",
          "delivery": {
            "city": "Deutschland",
            "country": "Alemania",
            "email": "test@testing.com",
            "name": "Helena Zimmermann",
            "phone": "+491601139291",
            "postalcode": "24103",
            "street": "Schlowiesenstrae 7"
          },
          "parcel_number": "1",
          "parcels": [
            {
              "height": "15.00",
              "length": "15.00",
              "weight": "2.00",
              "width": "15.00"
            }
          ],
          "price": "6.31",
          "reference": "DE005C98E1014AA",
          "service": "Access Point an Privat",
          "status": "In Transit",
          "weight": "2.00"
        }
      ]
    })
    .get('/v1/shipments/DE005C98E1014AA')
    .reply(200, {
      "canceled": true,
      "carrier": "UPS",
      "collection": {
        "city": "Deutschland",
        "country": "Alemania",
        "email": "test@testing.com",
        "name": "Daniel Werner",
        "phone": "01516113123",
        "postalcode": "10115",
        "street": "Alleestr 29"
      },
      "collectionDate": "2014-10-27",
      "delivery": {
        "city": "Deutschland",
        "country": "Alemania",
        "email": "test@testing.com",
        "name": "Helena Zimmermann",
        "phone": "+491601139291",
        "postalcode": "10115",
        "street": "Schlowiesenstrae 7"
      },
      "parcel_number": "2",
      "parcels": [
        {
          "height": "12.00",
          "length": "12.00",
          "weight": "1.00",
          "width": "12.00"
        }
      ],
      "price": "6.49",
      "reference": "DE005F98Q1114AA",
      "service": "Standard",
      "status": "In Transit",
      "weight": "2.00"
    })
    .delete('/v1/shipments/DE005C98E1014AA')
    .reply(200, {

    })
    .get('/v1/shipments/DE005C98E1014AA/labels')
    .reply(200, [
      "http://packlink.de/purchase/PostVenta/getLabelsByRef?ref=b8070b27961e0c474ba162a61e1587d19da2ae2b"
    ])
    .get('/v1/shipments/DE005C98E1014AA/track')
    .reply(200, []);


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


  it('should respond to searchShipment', function () {
    PacklinkSDK.shipmentsService.searchShipment(1).then(function (res) {
      assert.equal(typeof res, 'object');
      assert.equal(res.data.canceled, true);
      assert.equal(res.data.carrier, 'UPS');
      assert.equal(typeof res.data.collection, 'object');
      assert.equal(typeof res.data.delivery, 'object');
      assert.notEqual(res.data.collectionDate, undefined);
      assert.notEqual(res.data.parcel_number, undefined);
      assert.notEqual(res.data.parcels, undefined);
      assert.notEqual(res.data.price, undefined);
      assert.notEqual(res.data.reference, undefined);
      assert.notEqual(res.data.service, undefined);
      assert.notEqual(res.data.status, undefined);
      assert.notEqual(res.data.weight, undefined);
    });
  });

  it('should respond to getShipments', function () {
    PacklinkSDK.shipmentsService.getShipments(0, 1).then(function (res) {
      assert.equal(typeof res, 'object');
      assert.equal(typeof res.data.pagination, 'object');
      assert.notEqual(res.data.pagination.current_page, undefined);
      assert.notEqual(res.data.pagination.total_pages, undefined);
      assert.notEqual(res.data.pagination.total_registers, undefined);
      assert.equal(Array.isArray(res.data.shipments), true);
      assert.equal(res.data.shipments.length, 1);
    });
  });

  it('should respond to getDetails', function () {
    PacklinkSDK.shipmentsService.getDetails('DE005C98E1014AA').then(function (res) {
      assert.equal(typeof res, 'object');
      assert.equal(res.data.canceled, true);
      assert.equal(res.data.carrier, 'UPS');
      assert.equal(typeof res.data.collection, 'object');
      assert.equal(typeof res.data.delivery, 'object');
      assert.notEqual(res.data.collectionDate, undefined);
      assert.notEqual(res.data.parcel_number, undefined);
      assert.notEqual(res.data.parcels, undefined);
      assert.notEqual(res.data.price, undefined);
      assert.notEqual(res.data.reference, undefined);
      assert.notEqual(res.data.service, undefined);
      assert.notEqual(res.data.status, undefined);
      assert.notEqual(res.data.weight, undefined);
    });
  });

  it('should respond to cancelShipment', function () {
    PacklinkSDK.shipmentsService.cancelShipment('DE005C98E1014AA').then(function (res) {
      assert.equal(typeof res, 'object');
    });
  });

  it('should respond to getLabel', function () {
    PacklinkSDK.shipmentsService.getLabel('DE005C98E1014AA').then(function (res) {
      assert.equal(typeof res, 'object');
      assert.equal(Array.isArray(res.data), true);
    });
  });

  it('should respond to trackShipment', function () {
    PacklinkSDK.shipmentsService.trackShipment('DE005C98E1014AA').then(function (res) {
      assert.equal(typeof res, 'object');
      assert.equal(Array.isArray(res.data), true);
    });
  });
});
