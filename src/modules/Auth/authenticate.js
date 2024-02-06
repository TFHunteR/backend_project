const { Users } = require('../../models')
const { sequelizeHelper } = require('../../helpers')
const _ = require('lodash')
const bcrypt = require('bcrypt')

module.exports = (__, payload) => {
  return new Promise((resolve, reject) => {
    const username = _.has(payload, 'username') ? payload.username : null
    const password = _.has(payload, 'password') ? payload.password : null

    Users.findOne({
      where: { username },
      include: [
        {
          association: 'profile'
        }
      ]
    })
      .then(async (instance) => {
        const user = instance && instance.toJSON()

        if (!user) throw new Error('Invalid username or password!')

        const hash = _.has(user, 'password') ? user.password : null
        const isValid = await validate(password, hash)

        if (!isValid) throw new Error('Invalid username or password!')

        const status = _.has(user, 'status') ? user.status : null

        if (status === 'FOR_APPROVAL')
          throw new Error('Account is still waiting for approval!')

        if (status === 'INACTIVE') throw new Error('Account is inactive!')

        resolve(user)
      })
      .catch((err) => {
        const error = sequelizeHelper.extractError(err)
        reject(error)
      })
  })
}

const validate = (password, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      bcrypt.compare(password, hash, function (err, result) {
        resolve(result)
      })
    } catch (err) {
      reject(err)
    }
  })
}
