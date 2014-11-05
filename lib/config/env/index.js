'use strict';

var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV
};

module.exports = _.merge(all, require('./' + all.env + '.js') || {});
