const Promise = require('bluebird')
const { Payments } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const referenceId = _.has(payload, 'referenceId')
      ? payload.referenceId
      : null

    return Payments.findAll({
      where: { referenceId }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)
        reject(error)
      })
  })
