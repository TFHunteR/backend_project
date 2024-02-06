const { Model } = require('sequelize');
const moment = require('moment');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  class UserAvatars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // const { UserFiles, UserAvatars } = models;

    // UserAvatars.hasOne(UserFiles, {
    //   sourceKey: 'id', foreignKey: 'fileId', as: 'file'
    // });

    // UserAvatars.belongsTo(UserFiles, {
    //   foreignKey: 'fileId', targetKey: 'id', as: 'file',
    // });
    // }
  }

  UserAvatars.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileId: {
      type: DataTypes.INTEGER
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
    modelName: 'UserAvatars',
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

  return UserAvatars;
};
