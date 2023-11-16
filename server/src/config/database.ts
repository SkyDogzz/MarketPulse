import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = DATABASE_URL ? new Sequelize(DATABASE_URL) : new Sequelize();

export default sequelize;
