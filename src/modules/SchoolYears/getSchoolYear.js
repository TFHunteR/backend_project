const Promise = require('bluebird');
const { SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const id = _.has(payload, 'id') ? payload.id : null

  return SchoolYears.findOne({
    where: { id }
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
