const Promise = require('bluebird')
const { Users, Enrollees, SectionStudents, Sections } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    return Enrollees.findAll({
      include: [
        {
          model: Users,
          as: 'student',
          required: false,
          include: ['profile']
        },
        {
          model: SectionStudents,
          as: 'sectionStudent',
          include: [
            {
              model: Sections,
              as: 'section'
            }
          ]
        }
      ]
    })
      .then((enrollIns) => {
        // if (enrollIns) console.log(enrollIns)
        resolve(enrollIns)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)
        reject(error)
      })
  })
