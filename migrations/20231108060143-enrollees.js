module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enrollees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      schoolYearId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gradeLevel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      others: {
        type: Sequelize.JSON
      },

      createdBy: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedBy: { type: Sequelize.INTEGER },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Enrollees');
  },
};
