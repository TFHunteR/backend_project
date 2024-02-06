module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.FLOAT,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      encoding: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('UserFiles');
  },
};
