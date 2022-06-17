"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Items", "doneTime", {
      type: Sequelize.DATE,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Items", "doneTime");
  },
};
