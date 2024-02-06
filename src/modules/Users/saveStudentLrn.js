const Promise = require('bluebird')
const { UserProfiles } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload, context) =>
  new Promise((resolve, reject) => {
    const userId = _.has(payload, 'userId') ? payload.userId : null
    const lrnNo = _.has(payload, 'lrnNo') ? payload.lrnNo : null
    const updatedBy = _.has(context, 'id') ? context.id : null

    return UserProfiles.findOne({
      where: { userId }
    })
      .then(async (instance) => {
        if (!instance) throw new Error('User not found!')

        instance.set({ lrnNo, updatedBy })
        await instance.save()

        resolve(instance)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
