const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const cls = require('cls-hooked')

const basename = path.basename(__filename)
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config')[env]
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../../config/config`)
const db = {}

// Automatically pass transactions to all queries
const namespace = cls.createNamespace('transaction')
Sequelize.useCLS(namespace)
console.log({ dbConfig: config })
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

async function test() {
  try {
    await sequelize.authenticate()
    console.log(
      `Connection to the database ${config.host} has been established successfully.`
    )
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

test()

module.exports = db
