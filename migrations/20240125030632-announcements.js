module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('Announcements', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        audience: {
          type: Sequelize.JSON,
          allowNull: false
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.STRING
        },

        createdBy: { type: Sequelize.UUID },
        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedBy: { type: Sequelize.UUID },
        updatedAt: { type: Sequelize.DATE },
        deletedBy: { type: Sequelize.UUID },
        deletedAt: { type: Sequelize.DATE }
      })
      .then(async () => {
        await queryInterface.addIndex('Announcements', {
          name: 'idx_announcements',
          fields: ['id']
        })
      })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Announcements')
  }
}
