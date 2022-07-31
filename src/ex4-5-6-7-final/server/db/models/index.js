const env = process.env.NODE_ENV || "development";
import config from "../config/config.json" assert { type: "json" };
import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  config[env]["database"],
  config[env]["username"],
  config[env]["password"],
  {
    host: config[env]["host"],
    dialect: config[env]["dialect"],
    logQueryParameters: true,
  }
);
