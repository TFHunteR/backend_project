const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SectionSubjects } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const sectionId = _.has(payload, 'sectionId') ? payload.sectionId : null
    const teacherId = _.has(payload, 'teacherId') ? payload.teacherId : null
    const subjectId = _.has(payload, 'subjectId') ? payload.subjectId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null
    const createdBy = _.has(context, 'id') ? context.id : null

    return SectionSubjects.create({
      sectionId,
      teacherId,
      schoolYearId,
      subjectId,
      createdBy
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
