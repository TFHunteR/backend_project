const Promise = require('bluebird');
const { sequelizeHelper } = require('../../helpers');
const { Sections } = require('../../models');

module.exports = (_, { sectionId, userId }) => new Promise((resolve, reject) => {
  if (!sectionId) {
    reject("Missing sectionId in payload");
    return;
  }

  Sections.destroy({ where: { id: sectionId }, individualHooks: true, hooks: true, deletedBy: userId })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        reject("Section not found or already deleted");
        return;
      }
      resolve({ success: true, message: "Section deleted successfully" });
    })
    .catch((err) => {
      const error = sequelizeHelper.extractError(err);
      reject(error);
    });
});
