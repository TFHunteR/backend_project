const Promise = require('bluebird');
const { Users } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')
const { Op } = require('sequelize')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const roleCodes = _.has(payload, 'roleCodes') ? payload.roleCodes : null
  const status = _.has(payload, 'status') ? payload.status : null
  const where = {}

  if (roleCodes && roleCodes.length) {
    const or = []
    _.map(roleCodes, roleCode => {
      or.push({ roleCode })
    })

    Object.assign(where, { [Op.or]: or })

  }

  if (status) {
    Object.assign(where, { status })
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
