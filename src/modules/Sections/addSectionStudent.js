const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SectionStudents, Users, Enrollees } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise(async (resolve, reject) => {
    const sectionId = _.has(payload, 'sectionId') ? payload.sectionId : null
    const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null
    const createdBy = _.has(context, 'id') ? context.id : null

    // validate if exists
    const isExist = await SectionStudents.findOne({
      where: { enrolleeId, sectionId, schoolYearId }
    })

    if (isExist) throw new Error('Student already exists')

    return SectionStudents.create({
      sectionId,
      enrolleeId,
      schoolYearId,
      createdBy
    })
      .then(() => {
        return Users.findOne({
          include: [
            'profile',
            {
              model: Enrollees,
              as: 'enrollment',
              where: { id: enrolleeId },
              include: [
                {
                  model: SectionStudents,
                  as: 'sectionStudent'
                }
              ]
            }
          ]
        })
      })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
