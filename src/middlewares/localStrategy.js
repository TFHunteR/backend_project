const LocalStrategy = require('passport-local');
const authenticate = require('../modules/Auth/authenticate')
const _ = require('lodash')

module.exports = new LocalStrategy((username, password, done) => {
  const payload = { username, password }

  authenticate(null, payload).then(user => {
    if (!user)
      return done(null, false, { message: 'Incorrect username or password' })

    const id = _.has(user, 'id') ? user.id : null
    const username = _.has(user, 'username') ? user.username : null
    const roleCode = _.has(user, 'roleCode') ? user.roleCode : null

    return done(null, { id, username, roleCode })
  }).catch(err => {
    return done(null, false, { message: err })
  })
})