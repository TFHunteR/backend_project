const Promise = require('bluebird');
const { SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')
const { Op } = require('sequelize')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  return SchoolYears.findAll().then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
