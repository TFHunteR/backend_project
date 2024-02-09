const Promise = require('bluebird');
const { SchoolYears } = require('../../models');
const { sequelizeHelper } = require('../../helpers');
const _ = require('lodash')

module.exports = (_, { syId, userId }) => new Promise((resolve, reject) => {
  if (!syId) {
    reject("Missing syId in payload");
    return;
  }

  SchoolYears.destroy({ where: { id: syId }, individualHooks: true, hooks: true, deletedBy: userId })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        reject("Section not found or already deleted");
        return;
      }
      resolve({ success: true, message: "School Year deleted successfully" });
    })
    .catch((err) => {
      const error = sequelizeHelper.extractError(err);
      reject(error);
    });
});
