const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { Sections } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const id = _.has(payload, 'id') ? payload.id : null
  const status = _.has(payload, 'status') ? payload.status : null
  const updatedBy = _.has(payload, 'updatedBy') ? payload.updatedBy : null

  return Sections.findOne({
    where: { id },
  })
    .then(async instance => {
      if (!instance)
        throw new Error('Empty result, change status failed!')

      instance.set({ status, updatedBy })
      await instance.save()

      resolve(instance)
    }).catch((err) => {
      const error = sequelizeHelper.extractError(err);

      reject(error)
    })
});
