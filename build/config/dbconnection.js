import Sequelize from "../../node_modules/sequelize/types/sequelize";
import { config } from 'dotenv';
config();
var dbconnection = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
});
export default dbconnection;
