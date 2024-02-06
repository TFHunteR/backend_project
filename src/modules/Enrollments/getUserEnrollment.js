const Promise = require('bluebird')
const { Users, Enrollees } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const userId = _.has(payload, 'userId') ? payload.userId : null
    const schoolYearId = _.has(payload, 'schoolYearId')
      ? payload.schoolYearId
      : null

    return Enrollees.findOne({
      where: { userId, schoolYearId },
      include: [
        {
          model: Users,
          as: 'student',
          required: true,
          include: ['profile']
        }
      ]
    })
      .then((enrollIns) => {
        resolve(enrollIns)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)
        reject(error)
      })
  })
