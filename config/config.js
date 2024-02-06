require('../env')

const max = process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 2000
const min = process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN) : 0
const acquire = process.env.DB_POOL_ACQUIRE
  ? parseInt(process.env.DB_POOL_ACQUIRE)
  : 30000 // default to 30 seconds
const idle = process.env.DB_POOL_IDLE
  ? parseInt(process.env.DB_POOL_IDLE)
  : 5000 // default to 5 seconds
const maxUses = parseInt(process.env.DB_POOL_MAX_USES) || 7200
const timezone = process.env.DB_TIMEZONE ? process.env.DB_TIMEZONE : '+08:00'
const logging = process.env.DB_LOGGER ? process.env.DB_LOGGER : false

const host = process.env.DB_HOST || 'localhost'
const database = process.env.DB_NAME || 'learnlab'
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || 'root'

const replicas = process.env.DB_READ_REPLICAS
  ? process.env.DB_READ_REPLICAS
  : [{ host, database, username, password }]
const write = { host, database, username, password }

module.exports = {
  host,
  database,
  username,
  password,
  dialect: 'mysql',
  logging: (logging && true) || false,
  migrationTimestamps: true,
  timezone,
  pool: { max, min, acquire, idle, maxUses },
  replication: { write, read: replicas },
  benchmark: true,
  retry: { max: 0 }
}
