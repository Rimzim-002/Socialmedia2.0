import express, { Application, Request, Response } from 'express';
import dbconnection from './config/dbconnection.js';
import { config } from 'dotenv';
import './models/userModel.js';
import router from './Routes/userRoutes.js';
import postrouter from './Routes/postRoutes.js';
import commentRouter from './Routes/commentRoutes.js';
import LikeRouter from './Routes/likerouter.js';

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
app.use(postrouter);
app.use(commentRouter);
app.use(LikeRouter);

// const PORT = 5000 ;
// console.log(PORT)
app.listen(Number(process.env.port), () => {
  console.log(` Express server started   on port ${process.env.port}`);
});
 export default router