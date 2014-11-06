'use strict';

var __ = require('lodash');

var all = {
  env: process.env.NODE_ENV || 'development'
};
console.log(all.env);

module.exports = __.merge(all, require('./development.js') || {});
