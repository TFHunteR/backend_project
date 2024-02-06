const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Sections, SectionStudents } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null

    return Sections.findOne({
      include: [
        {
          model: SectionStudents,
          as: 'sectionStudents',
          required: true,
          where: { enrolleeId, schoolYearId }
        }
      ]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
