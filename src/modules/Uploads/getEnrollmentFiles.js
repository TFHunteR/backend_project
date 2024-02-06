const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { Enrollees, UserFiles, EnrolleeFiles } = require('../../models');
const { Op } = require('sequelize')

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const enrolleeId = _.has(payload, 'enrolleeId') ? payload.enrolleeId : null

  return UserFiles.findAll({
    attributes: ['id', 'name', 'type', 'fileSize', 'filePath', 'encoding'],
    include: [{
      model: EnrolleeFiles,
      as: 'enrolleeFiles',
      where: { enrolleeId: { [Op.eq]: enrolleeId } },
    }]
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
