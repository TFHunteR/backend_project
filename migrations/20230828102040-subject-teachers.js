module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubjectTeachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      teacherId: {
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
  },
  async down(queryInterface) {
    await queryInterface.dropTable('SubjectTeachers');
  },
};
