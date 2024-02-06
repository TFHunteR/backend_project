const Promise = require("bluebird");
const { UserAvatars } = require("../../models");
const _ = require("lodash");

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const userId = _.has(context, "id") ? context.id : null;
    const fileId = _.has(payload, "fileId") ? payload.fileId : null;

    return UserAvatars.findOrCreate({
      where: { userId, updatedBy: userId },
      defaults: { ...payload, createdBy: userId },
    })
      .then(async ([saved, isInsert]) => {
        if (!isInsert) {
          saved.set({ fileId });
          await saved.save();
        }
        resolve(saved);
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err);

        reject(error);
      });
  });
