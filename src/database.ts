import { Sequelize } from "sequelize";
import { dbConnectionString } from "./config";

export default new Sequelize(dbConnectionString);
