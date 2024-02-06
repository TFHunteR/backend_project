const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SectionSubjects } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const sectionId = _.has(payload, 'sectionId') ? payload.sectionId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null

    return SectionSubjects.findAll({
      where: { sectionId, schoolYearId }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
