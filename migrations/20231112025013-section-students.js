module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("SectionStudents", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        sectionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        schoolYearId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        enrolleeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        createdBy: { type: Sequelize.UUID },
        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedBy: { type: Sequelize.UUID },
        updatedAt: { type: Sequelize.DATE },
        deletedBy: { type: Sequelize.UUID },
        deletedAt: { type: Sequelize.DATE },
      })
      .then(async () => {
        await queryInterface.addIndex("SectionStudents", {
          name: "idx_sectionStudents",
          fields: ["sectionId", "schoolYearId", "enrolleeId"],
        });
      });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("SectionStudents");
  },
};
