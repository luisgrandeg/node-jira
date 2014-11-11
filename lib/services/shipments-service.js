'use strict';

var config = require('../config/env');

var BASE_URL = config.api.uri + '/v1/shipments';

function shipmentsService(requestor) {
  return {
    searchShipment: function (term) {
      return requestor.request('GET', '/v1/searchshipment/' + term).end();
    },

    getShipments: function (offset, limit) {
      return requestor.request('GET', BASE_URL).query({offset: offset, limit: limit}).end();
    },

    getDetails: function (id) {
      return requestor.request('GET', BASE_URL + '/' + id).end();
    },

    cancelShipment: function (id) {
      return requestor.request('DELETE', BASE_URL + '/' + id).end();
    },

    getLabel: function (id) {
      return requestor.request('GET', BASE_URL + '/' + id + '/labels').end();
    },

    trackShipment: function (id) {
      return requestor.request('GET', BASE_URL + '/' + id + '/track').end();
    }
  };
}

module.exports = shipmentsService;
