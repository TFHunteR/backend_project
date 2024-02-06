const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SubjectTeachers } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const subjectId = _.has(payload, 'subjectId') ? payload.subjectId : null

    return SubjectTeachers.findAll({
      where: { subjectId }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
