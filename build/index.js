import express from 'express';
import dbconnection from './config/dbconnection.js';
import { config } from 'dotenv';
import './models/userModel.js';
import router from './Routes/userRoutes.js';
import postrouter from './Routes/postRoutes.js';
import commentRouter from './Routes/commentRoutes.js';
config();
const app = express();
app.use(express.json());
dbconnection
    .authenticate()
    .then(() => {
    console.log(' Database connection sucessfull');
})
    .catch((err) => {
    console.log(Error, 'unable to  connnect');
});
app.use(router);
app.use(postrouter);
app.use(commentRouter);
// const PORT = 5000 ;
// console.log(PORT)
app.listen(Number(process.env.port), () => {
    console.log(` Express server started   on port ${process.env.port}`);
});
