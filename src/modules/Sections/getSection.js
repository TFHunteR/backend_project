const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Sections, SectionAdvisers, SectionStudents } = require('../../models')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const id = _.has(payload, 'id') ? payload.id : null

    return Sections.findOne({
      where: { id },
      include: [
        {
          model: SectionAdvisers,
          as: 'sectionAdviser',
          order: [['createdAt', 'DESC']]
        },
        {
          model: SectionStudents,
          as: 'sectionStudents'
        }
      ]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
