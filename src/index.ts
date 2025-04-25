import Express, { Application, Request, Response } from 'express';
import dbconnection from './config/dbconnection.js';
import {config} from 'dotenv';
import "./models/usersModel"
config();

const app: Application = Express();
const port: Number = 3000;


dbconnection.authenticate()
.then(()=>{
  console.log(" Database connection sucessfull")
})
.catch((err:Error)=>{
  console.log(Error,"unable to  connnect")
})


app.get('/', (req: Request, res: Response) => {
    res.send("Hello programmer");
  console.log('helo');
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
