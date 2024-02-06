const { Model } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')

module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { UserProfiles, Users, Enrollees } = models

      UserProfiles.belongsTo(Users, { as: 'user' })
    }
  }

  UserProfiles.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: true
      },
      lrnNo: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      middleName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE')
      },
      mobile: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      parents: {
        type: DataTypes.JSON
      },
      guardian: {
        type: DataTypes.JSON
      },
      address: {
        type: DataTypes.JSON
      },
      birthDay: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('birthDay')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
      },
      birthPlace: {
        type: DataTypes.JSON
      },
      others: {
        type: DataTypes.JSON
      },

      createdBy: { type: DataTypes.INTEGER },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
      },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
      },
      deletedBy: { type: DataTypes.INTEGER },
      deletedAt: {
        type: DataTypes.DATE,
        get() {
          return (
            this.getDataValue('deletedAt') &&
            moment(this.getDataValue('deletedAt')).format('YYYY-MM-DD HH:mm:ss')
          )
        }
      }
    },
    {
      sequelize,
      modelName: 'UserProfiles',
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeDestroy: (model, options) => {
          const { deletedBy } = options

          // workaround to log who deleted the record
          if (deletedBy) {
            model.update({ deletedBy })
          }
        }
      }
    }
  )

  return UserProfiles
}
