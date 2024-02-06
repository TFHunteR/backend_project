const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { Sections } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const name = _.has(payload, 'name') ? payload.name : null
  const gradeLevel = _.has(payload, 'gradeLevel') ? payload.gradeLevel : null
  const createdBy = _.has(payload, 'createdBy') ? payload.createdBy : null

  return Sections.create({
    name, gradeLevel, createdBy
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
