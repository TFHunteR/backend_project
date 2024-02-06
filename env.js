require('dotenv').config()
const fs = require('fs')
const dotenv = require('dotenv')
const path = require('path')


if (fs.existsSync('.env.local')) {
  let envConfig = dotenv.parse(fs.readFileSync('.env.local'))

  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

if (fs.existsSync(path.resolve(__dirname) + './.env.local')) {
  let envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname) + './.env.local'))

  for (let k in envConfig) {
    process.env[k] = envConfig[k]
  }
}