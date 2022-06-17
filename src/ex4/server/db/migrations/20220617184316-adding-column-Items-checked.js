"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("Items", "checked", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Items", "checked");
  },
};
