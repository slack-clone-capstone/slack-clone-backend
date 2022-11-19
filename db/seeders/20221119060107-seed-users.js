"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "James",
        last_name: "Chan",
        username: "JC",
        email: "james_chan@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Amy",
        last_name: "Tan",
        username: "AT",
        email: "amy_tan@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Evelyn",
        last_name: "Low",
        username: "EL",
        email: "evenlyn_low@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Katrina",
        last_name: "Lee",
        username: "KL",
        email: "katrina_lee@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Mark",
        last_name: "Chew",
        username: "MC",
        email: "mark_chew@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      // in order to reset auto increment after dropping table
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
