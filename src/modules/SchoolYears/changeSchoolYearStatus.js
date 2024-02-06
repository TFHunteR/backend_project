const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { SchoolYears } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const id = _.has(payload, 'id') ? payload.id : null
  const status = _.has(payload, 'status') ? payload.status : null
  const updatedBy = _.has(payload, 'updatedBy') ? payload.updatedBy : null

  SchoolYears.findOne({
    where: { id }
  })
    .then(async instance => {
      if (!instance)
        throw new Error('User not found!')

      instance.set({ status, updatedBy })
      await instance.save()

      resolve(instance)
    }).catch((err) => {
      const error = sequelizeHelper.extractError(err);

      reject(error)
    })
});
