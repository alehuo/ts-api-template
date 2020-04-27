import { Sequelize } from "sequelize";
import { dbConfig } from "./config";

export default new Sequelize(dbConfig.connectionString);
