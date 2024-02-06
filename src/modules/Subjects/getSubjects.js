const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Subjects } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const gradeLevel = _.has(payload, 'gradeLevel') ? payload.gradeLevel : null
    const where = {}

    if (gradeLevel) Object.assign(where, { gradeLevel })

    return Subjects.findAll({ where })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
