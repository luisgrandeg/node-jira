'use strict';

var config = require('../config');

/*\
 * shipmentsService
 [ method ]
 > Arguments
 - requestor (object) @Requestor object
 = shipmentsService (object) Interface for shipmentsService
\*/
function shipmentsService(requestor) {
  return {
    /*\
     * shipmentsService.searchShipment
     [ method ]
     * Search shipments by a provided term
     > Arguments
     - term (string) A string to search
     = Promise (promise)
     > Example
     | shipmentsService.searchShipment('whatever').then(function (res) {
     |  console.log(res);
     | });
    \*/
    searchShipment: function (term) {
      return requestor.request('GET', '/v1/searchshipment/' + term).end();
    },

    /*\
     * shipmentsService.getShipments
     [ method ]
     * Get a list of shipments, paginated.
     > Arguments
     - offset (number) The page number
     - limit (number) Max amount of shipments per page
     = Promise (promise)
     > Example
     | shipmentsService.getShipments(0, 10).then(function (res) {
     |  console.log(res.data.length); // 10
     | });
    \*/
    getShipments: function (offset, limit) {
      return requestor.request('GET', '/v1/shipments').query({offset: offset, limit: limit}).end();
    },

    /*\
     * shipmentsService.getDetails
     [ method ]
     * Get details from a shipment by reference id
     > Arguments
     - id (string) Shipment reference id
     = Promise (promise)
     > Example
     | shipmentsService.getDetails('E789234287923').then(function (res) {
     |  console.log(res);
     | });
    \*/
    getDetails: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id).end();
    },

    /*\
     * shipmentsService.cancelShipment
     [ method ]
     * Cancel a shipment by reference id
     > Arguments
     - id (string) Shipment reference id
     = Promise (promise)
     > Example
     | shipmentsService.cancelShipment('E789234287923').then(function (res) {
     |  console.log('shipment cancelled');
     | });
    \*/
    cancelShipment: function (id) {
      return requestor.request('DELETE', '/v1/shipments/' + id).end();
    },

    /*\
     * shipmentsService.getLabel
     [ method ]
     * Get links to download shipment labels
     > Arguments
     - id (string) Shipment reference id
     = Promise (promise)
     > Example
     | shipmentsService.getLabel('E789234287923').then(function (res) {
     |  console.log(res);
     | });
    \*/
    getLabel: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id + '/labels').end();
    },

    /*\
     * shipmentsService.trackShipment
     [ method ]
     * Get shipment tracking information
     > Arguments
     - id (string) Shipment reference id
     = Promise (promise)
     > Example
     | shipmentsService.trackShipment('E789234287923').then(function (res) {
     |  console.log(res);
     | });
    \*/
    trackShipment: function (id) {
      return requestor.request('GET', '/v1/shipments/' + id + '/track').end();
    }
  };
}

module.exports = shipmentsService;
