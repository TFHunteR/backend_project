const Promise = require('bluebird')
const _ = require('lodash')

const TWILIO_ACCOUNT = process.env.TWILIO_ACCOUNT
const TWILIO_TOKEN = process.env.TWILIO_TOKEN
const VIRTUAL_PHONE = process.env.VIRTUAL_PHONE
const client = require('twilio')(TWILIO_ACCOUNT, TWILIO_TOKEN)

module.exports = (__, payload) =>
  new Promise((resolve, reject) => {
    const body = _.has(payload, 'body') ? payload.body : null
    const to = _.has(payload, 'to') ? payload.to : null

    return client.messages
      .create({
        from: VIRTUAL_PHONE,
        to,
        body
      })
      .then(resolve)
      .catch(reject)
  })
