/* eslint-disable no-undef */
const redis = require('redis')
const bluebird = require('bluebird')

// promisifying
bluebird.promisifyAll(redis)

let options = {
	host: process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1',
	port: process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379',
}

if (process.env.REDIS_PASSWORD && process.env.REDIS_PASSWORD !== '')
	options.password = process.env.REDIS_PASSWORD

if (process.env.REDIS_TLS_SERVER_NAME && process.env.REDIS_TLS_SERVER_NAME !== '')
	options.tls = { servername: process.env.REDIS_TLS_SERVER_NAME }

if (process.env.REDIS_TTL && process.env.REDIS_TTL !== '')
	options.REDIS_TTL = process.env.REDIS_TTL || 86400

const client = redis.createClient(options)

module.exports = client