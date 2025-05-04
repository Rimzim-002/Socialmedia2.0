import express, { Application, Request, Response } from 'express';
import dbconnection from './config/dbconnection.js';
import { config } from 'dotenv';
import './models/userModel.js';
import router from './Routes/routesEnum.js';

config();

const app: Application = express();
app.use(express.json());
dbconnection
  .authenticate()
  .then(() => {
    console.log(' Database connection sucessfull');
  })
  .catch((err: Error) => {
    console.log(Error, 'unable to  connnect');
  });
 app.use(router);

// const PORT = 5000 ;
// console.log(PORT)
app.listen(Number(process.env.port), () => {
  console.log(` Express server started   on port ${process.env.port}`);
});
 export default router