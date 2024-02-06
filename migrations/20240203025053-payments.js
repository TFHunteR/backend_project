module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('Payments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        referenceId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        paymentType: {
          type: Sequelize.STRING,
          allowNull: false
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        others: {
          type: Sequelize.JSON
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
        await queryInterface.addIndex('Payments', {
          name: 'idx_payments',
          fields: ['id', 'type', 'status']
        })
      })

    await queryInterface.addColumn('Enrollees', 'paymentType', {
      type: Sequelize.STRING
    })

    await queryInterface.addColumn('Enrollees', 'status', {
      type: Sequelize.STRING
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Payments')

    await queryInterface.removeColumn('Enrollees', 'paymentType')
    await queryInterface.removeColumn('Enrollees', 'status')
  }
}
