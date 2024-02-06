const Promise = require('bluebird');
const { Users } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash');
const { UserAvatars } = require('../../models');

module.exports = (__, payload) => new Promise((resolve, reject) => {
  const userId = _.has(payload, 'userId') ? payload.userId : null

  return UserAvatars.findOne({
    where: { userId }
  }).then(resolve).catch((err) => {
    const error = sequelizeHelper.extractError(err);

    reject(error)
  })
});
