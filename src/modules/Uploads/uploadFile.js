const Promise = require("bluebird");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { UserFiles } = require("../../models");
const { sequelizeHelper } = require("../../helpers");
const moment = require("moment/moment");

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    async function doUpload() {
      try {
        const userId = _.has(context, "id") ? context.id : null;
        const transaction = _.has(payload, "transaction")
          ? payload.transaction
          : null;

        if (!userId) throw new Error("User session expired!");

        const { file } = payload;

        const name = _.has(file, "name")
          ? `${moment().unix()}_${file.name}`
          : null;
        const type = _.has(file, "type") ? file.type : null;
        const encoding = _.has(file, "encoding") ? file.encoding : null;

        const fileArrayBuffer = await file.arrayBuffer();
        const dir = path.join("./", "assets", "uploads", `userId-${userId}`);
        const filePath = path.join(dir, name);

        if (fs.existsSync(filePath)) throw new Error("File already exists!");

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        await fs.promises.writeFile(filePath, Buffer.from(fileArrayBuffer));

        const stats = fs.statSync(filePath);
        fileSize = stats.size;

        const props = {
          name,
          type,
          fileSize,
          filePath,
          encoding,
        };

        const options = {};

        if (transaction) Object.assign(options, { transaction });

        return saveFile(props, options).catch(async (err) => {
          // delete uploaded file
          await fs.unlinkSync(filePath);

          return err;
        });
      } catch (e) {
        throw e;
      }
    }

    doUpload()
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });

const saveFile = (payload, options) => {
  return new Promise((resolve, reject) => {
    return UserFiles.create({ ...payload }, { ...options })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err);

        reject(error);
      });
  });
};
