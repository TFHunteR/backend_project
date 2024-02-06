const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { QuarterlyGrades } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null

    return QuarterlyGrades.findAll({
      where: { enrolleeId }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
