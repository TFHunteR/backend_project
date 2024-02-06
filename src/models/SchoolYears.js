const { Model } = require('sequelize');
const moment = require('moment');
const _ = require('lodash');
const { SCHOOL_YEAR_STATUS } = require('../constants/schoolYearStatus')

module.exports = (sequelize, DataTypes) => {
  class SchoolYears extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   const { SchoolYears, UserProfiles, UserFiles } = models;

    //   SchoolYears.hasOne(UserProfiles, {
    //     sourceKey: 'id', foreignKey: 'userId', as: 'profile'
    //   })

    //   Users.hasMany(UserFiles, { as: 'userFiles' })
    // }
  }

  SchoolYears.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get() { return moment(this.getDataValue('startDate')).format('YYYY-MM-DD'); },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      get() { return moment(this.getDataValue('endDate')).format('YYYY-MM-DD'); },
    },
    status: {
      type: DataTypes.ENUM(SCHOOL_YEAR_STATUS),
      defaultValue: 'PENDING'
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
    modelName: 'SchoolYears',
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

  return SchoolYears;
};
