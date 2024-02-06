const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { QuarterlyGrades } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const id = _.has(payload, 'id') ? payload.id : null

    return QuarterlyGrades.findOne({
      where: { id }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
