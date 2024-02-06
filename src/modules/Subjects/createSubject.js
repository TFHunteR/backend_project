const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { Subjects } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const name = _.has(payload, 'name') ? payload.name : null
  const gradeLevel = _.has(payload, 'gradeLevel') ? payload.gradeLevel : null
  const category = _.has(payload, 'category') ? payload.category : null
  const createdBy = _.has(payload, 'createdBy') ? payload.createdBy : null

  return Subjects.create({
    name, gradeLevel, category, createdBy
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
