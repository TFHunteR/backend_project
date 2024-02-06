const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Announcements } = require('../../models')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const id = _.has(payload, 'id') ? payload.id : null
    const audience = _.has(payload, 'audience') ? payload.audience : null
    const message = _.has(payload, 'message') ? payload.message : null
    const status = _.has(payload, 'status') ? payload.status : undefined
    const createdBy = _.has(context, 'id') ? context.id : null

    return Announcements.findOrCreate({
      where: { id },
      defaults: {
        audience,
        message,
        status,
        createdBy
      }
    })
      .then(async ([saved, isInsert]) => {
        if (!isInsert) {
          saved.set({ audience, message, status, updatedBy: createdBy })
          await saved.save()
        }

        resolve(saved)
      })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
