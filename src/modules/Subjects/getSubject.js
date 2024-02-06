const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Subjects, SubjectTeachers, Users } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const id = _.has(payload, 'id') ? payload.id : null

    return Subjects.findOne({
      where: { id },
      include: [
        {
          model: SubjectTeachers,
          as: 'teachers',
          include: [
            {
              model: Users,
              as: 'user'
            }
          ]
        }
      ]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
