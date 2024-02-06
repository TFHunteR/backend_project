const { Model } = require("sequelize");
const moment = require("moment");
const _ = require("lodash");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Users, UserProfiles, UserFiles, Enrollees, SectionStudents } =
        models;

      Users.hasOne(UserProfiles, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "profile",
      });

      Users.hasMany(UserFiles, { as: "userFiles" });

      Users.hasOne(Enrollees, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "enrollment",
      });
    }
  }

  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("FOR_APPROVAL", "ACTIVE", "INACTIVE"),
        defaultValue: "FOR_APPROVAL",
      },
      roleCode: {
        type: DataTypes.ENUM(
          "STUDENT",
          "TEACHER",
          "REGISTRAR",
          "SCHOOL_ADMIN",
          "SYSTEM_ADMIN"
        ),
        defaultValue: "STUDENT",
      },

      createdBy: { type: DataTypes.INTEGER },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("createdAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      updatedBy: { type: DataTypes.INTEGER },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("updatedAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      deletedBy: { type: DataTypes.INTEGER },
      deletedAt: {
        type: DataTypes.DATE,
        get() {
          return (
            this.getDataValue("deletedAt") &&
            moment(this.getDataValue("deletedAt")).format("YYYY-MM-DD HH:mm:ss")
          );
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeDestroy: (model, options) => {
          const { deletedBy } = options;

          // workaround to log who deleted the record
          if (deletedBy) {
            model.update({ deletedBy });
          }
        },
      },
    }
  );

  return Users;
};
