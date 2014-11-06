'use strict';

var __ = require('lodash');

var all = {
  env: process.env.NODE_ENV || 'development'
};

module.exports = __.merge(all, require('./development.js') || {});
