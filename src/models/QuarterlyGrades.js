const { Model } = require('sequelize')
const moment = require('moment')
const _ = require('lodash')

module.exports = (sequelize, DataTypes) => {
  class QuarterlyGrades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // const { SectionSubjects, SectionStudents } = models
      // SectionSubjects.hasMany(SectionStudents, { as: 'students' })
    }
  }

  QuarterlyGrades.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
      },
      sectionSubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      schoolYearId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      enrolleeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      q1: {
        type: DataTypes.FLOAT
      },
      q2: {
        type: DataTypes.FLOAT
      },
      q3: {
        type: DataTypes.FLOAT
      },
      q4: {
        type: DataTypes.FLOAT
      },
      verdict: {
        type: DataTypes.ENUM(['PASSED', 'FAILED', 'INCOMPLETE']),
        defaultValue: null
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
      modelName: 'QuarterlyGrades',
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

  return QuarterlyGrades
}
