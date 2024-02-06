module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EnrolleeFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      enrolleeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('EnrolleeFiles');
  },
};
