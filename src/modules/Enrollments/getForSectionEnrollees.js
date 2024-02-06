const Promise = require('bluebird')
const { Users, Enrollees, SectionStudents } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Op } = require('sequelize')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    // console.log({ payload });
    const { gradeLevel, schoolYearId } = payload

    return Users.findAll({
      include: [
        'profile',
        {
          model: Enrollees,
          as: 'enrollment',
          required: true,
          where: { gradeLevel },
          include: [
            {
              model: SectionStudents,
              as: 'sectionStudent',
              required: false,
              where: {
                [Op.and]: {
                  schoolYearId: { [Op.ne]: schoolYearId },
                  id: { [Op.eq]: null }
                }
              }
            }
          ]
        }
      ]
    })
      .then((usersInt) => {
        resolve(usersInt)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)
        reject(error)
      })
  })
