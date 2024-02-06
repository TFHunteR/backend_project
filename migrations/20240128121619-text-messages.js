module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('TextMessages', {
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
        recipients: {
          type: Sequelize.JSON
        },
        message: {
          type: Sequelize.TEXT,
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
        await queryInterface.addIndex('TextMessages', {
          name: 'idx_sms',
          fields: ['id']
        })
      })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('TextMessages')
  }
}
