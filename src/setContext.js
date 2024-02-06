const _ = require('lodash')

module.exports = (props) => {
  const { req, res } = props
  async function doInit() {
    const { session, body } = req
    const passport = _.has(session, 'passport') ? session.passport : null

    if (!passport) {
      const operationName = _.has(body, 'operationName')
        ? body.operationName
        : null

      switch (operationName) {
        case 'registerStudent':
          break
        default:
          res.status(401).send('User session expired!')
      }
    }

    const user = _.has(passport, 'user') ? passport.user : null
    const context = {}

    if (user) Object.assign(context, { ...user })

    return context
  }

  return doInit()
}
