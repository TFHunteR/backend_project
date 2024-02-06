const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { SectionStudents, SectionSubjects } = require('../../models')

module.exports = (__, payload) =>
  new Promise(async (resolve, reject) => {
    const sectionId = _.has(payload, 'sectionId') ? payload.sectionId : null
    const subjectId = _.has(payload, 'subjectId') ? payload.subjectId : null

    const await SectionSubjects.findOne({ where: { subjectId } }).

    return SectionStudents.findAll({
      where: { sectionId, subjectId },
      include: [
        {
          model: SectionSubject,
          as: 'subject'
        }
      ]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
