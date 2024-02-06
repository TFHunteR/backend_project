const Promise = require('bluebird');
const { Users, Enrollees, SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  async function doGet() {
    // const schoolYearId = _.has(payload, 'schoolYearId') ? payload.schoolYearId : null

    // get active school year
    const schoolYearId = await SchoolYears.findOne({ where: { status: 'ENROLLMENT' } })
      .then(instance => {
        const schoolYear = instance && instance.toJSON()
        let schoolYearId = _.has(schoolYear, 'id') ? schoolYear.id : null

        return schoolYearId
      })

    return Users.findAll({
      attributes: ['id', 'username', 'status'],
      where: { roleCode: 'STUDENT', status: 'ACTIVE' },
      include: [
        'profile',
        {
          model: Enrollees,
          as: 'enrollment',
          required: false,
          where: {
            schoolYearId: { [Op.ne]: schoolYearId }
          }
        }]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err);
        throw error
      })
  }

  doGet().then(resolve).catch(reject)

});
