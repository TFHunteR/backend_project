const Promise = require('bluebird')
const { Users } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    async function doSave() {
      const user = _.has(payload, 'user') ? payload.user : null
      const password = _.has(user, 'password') ? user.password : null
      const hashed = await hashPassword(password)

      return Users.create(
        {
          ...user,
          password: hashed
        },
        {
          include: [
            {
              association: 'profile'
            }
          ]
        }
      ).catch((err) => {
        const error = sequelizeHelper.extractError(err)

        throw error
      })
    }

    doSave().then(resolve).catch(reject)
  })

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          resolve(hash)
        })
      })
    } catch (err) {
      reject(err)
    }
  })
}
