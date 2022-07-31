import Sequelize from "sequelize";
import { sequelize } from "./index.js";

const Item = sequelize.define(
  "Items",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemName: Sequelize.STRING,
    checked: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    doneTime: { type: Sequelize.DATE },
  },
  { freezeTableName: true },
  {
    /*  We are using in our where clauses only: id (2 queries) and checked (1 query). We already have an index on id and it can be useful to have an index on checked since all our services are exectuing the query which is using checked (as part of calculating tasks left)
     */
    indexes: [
      {
        name: "left_tasks",
        using: "BTREE",
        fields: ["checked"],
      },
    ],
  }
);

export default Item;
