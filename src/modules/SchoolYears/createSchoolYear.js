const Promise = require('bluebird');
const { SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const name = _.has(payload, 'name') ? payload.name : null
  const startDate = _.has(payload, 'startDate') ? payload.startDate : null
  const endDate = _.has(payload, 'endDate') ? payload.endDate : null
  const createdBy = _.has(payload, 'createdBy') ? payload.createdBy : null

  return SchoolYears.create({
    name, startDate, endDate, createdBy
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
