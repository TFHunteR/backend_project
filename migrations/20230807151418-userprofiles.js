module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfiles', {
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
        unique: true,
      },
      lrnNo: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      parents: {
        type: Sequelize.JSON,
      },
      guardian: {
        type: Sequelize.JSON
      },
      address: {
        type: Sequelize.JSON
      },
      birthDay: {
        type: Sequelize.DATE
      },
      birthPlace: {
        type: Sequelize.JSON
      },
      others: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('UserProfiles');
  },
};
