"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addIndex("Items", {
      name: "left_tasks",
      using: "BTREE",
      fields: ["checked"],
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeIndex("Items", "left_tasks");
  },
};
