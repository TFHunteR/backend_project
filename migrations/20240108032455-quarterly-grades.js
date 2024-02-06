module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('QuarterlyGrades', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        sectionSubjectId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        schoolYearId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        enrolleeId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        q1: {
          type: Sequelize.FLOAT
        },
        q2: {
          type: Sequelize.FLOAT
        },
        q3: {
          type: Sequelize.FLOAT
        },
        q4: {
          type: Sequelize.FLOAT
        },
        verdict: {
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
        await queryInterface.addIndex('QuarterlyGrades', {
          name: 'idx_quarterlyGrades',
          fields: ['enrolleeId', 'schoolYearId', 'sectionSubjectId']
        })
      })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('QuarterlyGrades')
  }
}
