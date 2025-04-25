import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();
const dbconnection = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
});
export default dbconnection;
