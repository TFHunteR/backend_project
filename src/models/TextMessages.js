const { Model } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')
const { GRADE_LEVELS } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class TextMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   const { EnrolleeFiles, Enrollees, SectionStudents, Users } = models
    //   Enrollees.hasMany(EnrolleeFiles, { as: 'files' })
    //   Enrollees.hasOne(SectionStudents, {
    //     sourceKey: 'id',
    //     foreignKey: 'enrolleeId',
    //     as: 'sectionStudent'
    //   })
    //   Enrollees.hasOne(Users, {
    //     sourceKey: 'userId',
    //     foreignKey: 'id',
    //     as: 'student'
    //   })
    // }
  }

  TextMessages.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      audience: {
        type: DataTypes.JSON,
        allowNull: false,
        set(value) {
          this.setDataValue('audience', JSON.stringify(value))
        },
        get() {
          const value = this.getDataValue('audience')

          return JSON.parse(value)
        }
      },
      recipients: {
        type: DataTypes.JSON,
        allowNull: false,
        set(value) {
          this.setDataValue('recipients', JSON.stringify(value))
        },
        get() {
          const value = this.getDataValue('recipients')

          return JSON.parse(value)
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('FAILED', 'SENT'),
        defaultValue: 'SENT'
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
      modelName: 'TextMessages',
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

  return TextMessages
}
