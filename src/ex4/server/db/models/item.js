import Sequelize from "sequelize";
import { sequelize } from "./index.js";

const Item = sequelize.define(
  "Items",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    itemName: Sequelize.STRING,
  },
  { freezeTableName: true }
);

export default Item;
