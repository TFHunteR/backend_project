const { Model } = require('sequelize');
const moment = require('moment');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  class SectionAdvisers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { SectionAdvisers, Sections, Users, SchoolYears } = models;

      SectionAdvisers.belongsTo(Sections, {
        foreignKey: 'sectionId', targetKey: 'id', as: 'section',
      });

      SectionAdvisers.hasOne(Users, {
        sourceKey: 'teacherId', foreignKey: 'id', as: 'teacher'
      });

      SectionAdvisers.hasOne(SchoolYears, {
        sourceKey: 'schoolYearId', foreignKey: 'id', as: 'schoolYear'
      });
    }
  }

  SectionAdvisers.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schoolYearId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdBy: { type: DataTypes.INTEGER },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() { return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'); },
    },
    updatedBy: { type: DataTypes.INTEGER },
    updatedAt: {
      type: DataTypes.DATE,
      get() { return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss'); },
    },
    deletedBy: { type: DataTypes.INTEGER },
    deletedAt: {
      type: DataTypes.DATE,
      get() { return this.getDataValue('deletedAt') && moment(this.getDataValue('deletedAt')).format('YYYY-MM-DD HH:mm:ss'); },
    },
  }, {
    sequelize,
    modelName: 'SectionAdvisers',
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeDestroy: (model, options) => {
        const { deletedBy } = options;

        // workaround to log who deleted the record
        if (deletedBy) { model.update({ deletedBy }); }
      },
    },
  });

  return SectionAdvisers;
};
