import express from 'express';
import { connectToDB } from './config/dbconnection.js';
import { config } from 'dotenv';
import './models/userModel.js';
import router from './Routes/routesEnum.js';
import logger from './utils/logger.js';
config();
const app = express();
app.use(express.json());
connectToDB;
app.use(router);
app.listen(Number(process.env.port), () => {
    logger.info(` Express server started   on port ${process.env.port}`);
});
export default router;
