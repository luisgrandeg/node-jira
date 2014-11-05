'use strict';

var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV || 'development'
};

module.exports = _.merge(all, require('./development') || {});
