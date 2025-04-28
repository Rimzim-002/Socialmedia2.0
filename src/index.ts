import express, { Application, Request, Response } from 'express';
import dbconnection from './config/dbconnection.js';
import { config } from 'dotenv';
import './models/userModel.js';
import router from './Routes/userRoutes.js';
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

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello programmer');
  console.log('helo');
});

// const PORT = 5000 ;
// console.log(PORT)
app.listen(Number(process.env.port), () => {
  console.log(`✅ Express server started   on port ${process.env.port}`);
});
