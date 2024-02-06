const { Model } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')
const { GRADE_LEVELS } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
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

  Payments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.ENUM('ENROLLMENT', 'MISCELLANEOUS'),
        allowNull: false
      },
      referenceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      paymentType: {
        type: DataTypes.ENUM('FULL', 'PARTIAL'),
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      others: {
        type: DataTypes.JSON
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REFUNDED'),
        defaultValue: 'PENDING'
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
      modelName: 'Payments',
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

  return Payments
}
