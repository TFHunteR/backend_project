const Promise = require('bluebird')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const { Announcements } = require('../../models')

module.exports = (__) =>
  new Promise((resolve, reject) => {
    return Announcements.findAll({
      limit: 5,
      order: [['id', 'desc']]
    })
      .then(resolve)
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)

        reject(error)
      })
  })
