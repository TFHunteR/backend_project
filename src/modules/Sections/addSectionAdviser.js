const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SectionAdvisers } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const sectionId = _.has(payload, 'sectionId') ? payload.sectionId : null
    const teacherId = _.has(payload, 'teacherId') ? payload.teacherId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null
    const createdBy = _.has(context, 'id') ? context.id : null

    // return SectionAdvisers.create({
    //   sectionId,
    //   teacherId,
    //   schoolYearId,
    //   createdBy
    // })
    //   .then(resolve)
    //   .catch((err) => {
    //     const error = sequelizeHelper.extractError(err)

    //     reject(error)
    //   })

    return SectionAdvisers.findOrCreate({
      where: { sectionId, teacherId, schoolYearId },
      defaults: { sectionId, teacherId, schoolYearId, createdBy }
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
