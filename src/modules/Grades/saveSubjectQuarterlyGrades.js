const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { QuarterlyGrades } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const sectionSubjectId = _.has(payload, 'sectionSubjectId')
      ? payload.sectionSubjectId
      : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null
    const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null
    const createdBy = _.has(context, 'id') ? context.id : null
    // console.log({ createdBy })
    return QuarterlyGrades.findOrCreate({
      where: { sectionSubjectId, schoolYearId, enrolleeId },
      defaults: { ...payload, createdBy }
    })
      .then(async ([saved, isInsert]) => {
        if (!isInsert) {
          const q1 = _.has(payload, 'q1') ? payload.q1 : null
          const q2 = _.has(payload, 'q2') ? payload.q2 : null
          const q3 = _.has(payload, 'q3') ? payload.q3 : null
          const q4 = _.has(payload, 'q4') ? payload.q4 : null
          const verdict = _.has(payload, 'verdict') ? payload.verdict : null

          saved.set({ q1, q2, q3, q4, verdict, updatedBy: createdBy })
          await saved.save()
        }

        resolve(saved)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
