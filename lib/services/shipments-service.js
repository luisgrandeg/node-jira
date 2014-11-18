'use strict';

var config = require('../config');

function shipmentsService(requestor) {
  return {
    searchShipment: function (term) {
      return requestor.request('GET', '/v1/searchshipment/' + term).end();
    },

    getShipments: function (offset, limit) {
      return requestor.request('GET', '/v1/shipments').query({offset: offset, limit: limit}).end();
    },

    getDetails: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id).end();
    },

    cancelShipment: function (id) {
      return requestor.request('DELETE', '/v1/shipments/' + id).end();
    },

    getLabel: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id + '/labels').end();
    },

    trackShipment: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id + '/track').end();
    }
  };
}

module.exports = shipmentsService;
