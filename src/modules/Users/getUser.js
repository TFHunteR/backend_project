const Promise = require('bluebird')
const { Users } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const id = _.has(payload, 'id') ? payload.id : null

    return Users.findOne({
      where: { id },
      include: [
        {
          association: 'profile'
        }
      ]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
