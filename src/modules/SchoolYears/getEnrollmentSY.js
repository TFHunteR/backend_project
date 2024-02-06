const Promise = require('bluebird');
const { SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')
const { Op } = require('sequelize')

module.exports = () => new Promise((resolve, reject) => {
  return SchoolYears.findAll({
    where: {
      status: {
        [Op.or]: [
          { [Op.eq]: 'ENROLLMENT' },
          { [Op.eq]: 'ONGOING' }
        ]
      }
    }
  })
    .then(resolve).catch((err) => {
      const error = sequelizeHelper.extractError(err);

      reject(error)
    })
});
