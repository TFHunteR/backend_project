const Promise = require('bluebird');
const { Users } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')
const { Op } = require('sequelize')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const status = _.has(payload, 'status') ? payload.status : null
  const where = { roleCode: 'STUDENT' }

  if (status && status.length) {
    let or = []
    _.map(status, stat => {
      or.push({ status: stat })
    })

    Object.assign(where, { [Op.or]: or })
  }

  return Users.findAll({
    where,
    include: [{
      association: 'profile'
    }]
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
