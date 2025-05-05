import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import logger from '../utils/logger.js';

config();
const dbconnection = new Sequelize(
  process.env.DATABASE as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST as string,
    dialect: 'mysql',
  },
);
const connectToDB = async () => {
  try {
    await dbconnection.authenticate();
    logger.info(' Database connection successful');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if DB connection fails
  }
};
export { dbconnection, connectToDB };
