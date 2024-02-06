const Promise = require('bluebird')
const { Users, Enrollees } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null

    return Enrollees.findOne({
      where: { id: enrolleeId },
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
