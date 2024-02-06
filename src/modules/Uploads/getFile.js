const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { UserFiles } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const id = _.has(payload, 'fileId') ? payload.fileId : null

  return UserFiles.findOne({
    attributes: ['id', 'name', 'type', 'fileSize', 'filePath', 'encoding'],
    where: { id }
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
