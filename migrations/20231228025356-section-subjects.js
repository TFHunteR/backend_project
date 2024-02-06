module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('SectionSubjects', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        sectionId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        subjectId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        teacherId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        schoolYearId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        createdBy: { type: Sequelize.UUID },
        createdAt: { allowNull: false, type: Sequelize.DATE },
        updatedBy: { type: Sequelize.UUID },
        updatedAt: { type: Sequelize.DATE },
        deletedBy: { type: Sequelize.UUID },
        deletedAt: { type: Sequelize.DATE }
      })
      .then(async () => {
        await queryInterface.addIndex('SectionSubjects', {
          name: 'idx_sectionSubjects',
          fields: ['sectionId', 'subjectId', 'teacherId']
        })
      })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('SectionSubjects')
  }
}
