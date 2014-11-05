'use strict';

var config = require('./config/env');

var BASE_URL = config.api.uri + '/v1/shipments';

function shipmentsService(requestManager) {
  return {
    searchShipment: function (term) {
      return requestManager.get('/v1/searchshipment/' + term);
    },

    getShipments: function (offset, limit) {
      return requestManager.get(BASE_URL, {params: {offset: offset, limit: limit}});
    },

    getDetails: function (id) {
      return requestManager.get(BASE_URL + '/' + id);
    },

    cancelShipment: function (id) {
      return requestManager.delete(BASE_URL + '/' + id);
    },

    getLabel: function (id) {
      return requestManager.get(BASE_URL + '/' + id + '/labels');
    },

    trackShipment: function (id) {
      return requestManager.get(BASE_URL + '/' + id + '/track');
    }
  };
}

module.exports = shipmentsService;
