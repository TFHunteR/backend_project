'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'tissuepaper56@gmail.com',
      password: '$2b$10$AwJXUPverugi5kVG0DB0WuONoSAJuVk7TNJD4VcGNaxeQ9iV8s73m',
      roleCode: 'SYSTEM_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: 'tissuepaper56+1@gmail.com',
      password: '$2b$10$AwJXUPverugi5kVG0DB0WuONoSAJuVk7TNJD4VcGNaxeQ9iV8s73m',
      roleCode: 'SCHOOL_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      username: 'tissuepaper56+2@gmail.com',
      password: '$2b$10$AwJXUPverugi5kVG0DB0WuONoSAJuVk7TNJD4VcGNaxeQ9iV8s73m',
      roleCode: 'TEACHER',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      username: 'tissuepaper56+3@gmail.com',
      password: '$2b$10$AwJXUPverugi5kVG0DB0WuONoSAJuVk7TNJD4VcGNaxeQ9iV8s73m',
      roleCode: 'STUDENT',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      username: 'tissuepaper56+4@gmail.com',
      password: '$2b$10$AwJXUPverugi5kVG0DB0WuONoSAJuVk7TNJD4VcGNaxeQ9iV8s73m',
      roleCode: 'REGISTRAR',
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);

    await queryInterface.bulkInsert('UserProfiles', [{
      id: 1,
      userId: 1,
      firstName: 'Teddy',
      lastName: 'Wall',
      email: 'tissuepaper56@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      userId: 2,
      firstName: 'Lillie',
      lastName: 'Gray',
      email: 'tissuepaper56+1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      userId: 3,
      firstName: 'Vera',
      lastName: 'House',
      email: 'tissuepaper56+2@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      userId: 4,
      firstName: 'Mariyah',
      lastName: 'Malone',
      email: 'tissuepaper56+3@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      userId: 5,
      firstName: 'Faisal',
      lastName: 'Sanchez',
      email: 'tissuepaper56+4@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
