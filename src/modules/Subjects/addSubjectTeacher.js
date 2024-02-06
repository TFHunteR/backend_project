const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SubjectTeachers } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise(async (resolve, reject) => {
    const subjectId = _.has(payload, 'subjectId') ? payload.subjectId : null
    const userId = _.has(payload, 'userId') ? payload.userId : null
    const createdBy = _.has(context, 'id') ? context.id : null

    // validate if exists
    const isExist = await SubjectTeachers.findOne({
      where: { teacherId: userId, subjectId }
    })

    if (isExist) throw new Error('Teacher already exists')

    return SubjectTeachers.create({ teacherId: userId, subjectId, createdBy })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
