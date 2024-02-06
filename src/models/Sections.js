const { Model } = require("sequelize");
const moment = require("moment");
const _ = require("lodash");
const { GRADE_LEVELS } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  class Sections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Sections, SectionAdvisers, SectionStudents } = models;

      Sections.hasOne(SectionAdvisers, {
        sourceKey: "id",
        foreignKey: "sectionId",
        as: "sectionAdviser",
      });

      Sections.hasMany(SectionStudents, { as: "sectionStudents" });
    }
  }

  Sections.init(
    {
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
      gradeLevel: {
        type: DataTypes.ENUM(GRADE_LEVELS),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
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
      modelName: "Sections",
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

  return Sections;
};
