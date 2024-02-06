const Promise = require('bluebird')
const { TextMessages } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')

module.exports = (__) =>
  new Promise((resolve, reject) => {
    return TextMessages.findAll()
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
