const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Announcements } = require('../../models')

module.exports = (_, { annId }) => new Promise((resolve, reject) => {
  if (!annId) {
    reject("Missing annId in payload");
    return;
  }

  Announcements.destroy({ where: { id: annId } })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        reject("Announcement not found or already deleted");
        return;
      }
      resolve({ success: true, message: "Announcement deleted successfully" });
    })
    .catch((err) => {
      const error = sequelizeHelper.extractError(err);
      reject(error);
    });
});
