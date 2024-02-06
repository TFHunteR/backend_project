const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')
const { Sections, SchoolYears, Users, SectionAdvisers } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  return Sections.findAll({
    include: [{
      model: SectionAdvisers,
      as: 'sectionAdviser',
      // include: [{
      //   model: Users,
      //   as: 'teacher',
      //   order: [['createdAt', 'DESC']]
      // }, 
      // {
      //   model: SchoolYears,
      //   as: 'schoolYear',
      //   order: [['createdAt', 'DESC']]
      // }],
      order: [['createdAt', 'DESC']]
    }]
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
