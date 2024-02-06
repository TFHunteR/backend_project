const { Model } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')
const { GRADE_LEVELS } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Enrollees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { EnrolleeFiles, Enrollees, SectionStudents, Users, Payments } =
        models

      Enrollees.hasMany(EnrolleeFiles, { as: 'files' })

      Enrollees.hasOne(SectionStudents, {
        sourceKey: 'id',
        foreignKey: 'enrolleeId',
        as: 'sectionStudent'
      })

      Enrollees.hasOne(Users, {
        sourceKey: 'userId',
        foreignKey: 'id',
        as: 'student'
      })

      Enrollees.hasMany(Payments, { as: 'payments', foreignKey: 'referenceId' })
    }
  }

  Enrollees.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      schoolYearId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      gradeLevel: {
        type: DataTypes.ENUM(GRADE_LEVELS),
        allowNull: false
      },
      paymentType: {
        type: DataTypes.ENUM('FULL', 'PARTIAL')
      },
      others: {
        type: DataTypes.JSON
      },
      status: {
        type: DataTypes.ENUM('UNPAID', 'PARTIALLY_PAID', 'FULLY_PAID'),
        defaultValue: 'UNPAID'
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
      modelName: 'Enrollees',
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

  return Enrollees
}
