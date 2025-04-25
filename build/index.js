import Express from 'express';
import dbconnection from './config/dbconnection.js';
import { config } from 'dotenv';
import "./models/usersModel";
config();
const app = Express();
const port = 3000;
dbconnection.authenticate()
    .then(() => {
    console.log(" Database connection sucessfull");
})
    .catch((err) => {
    console.log(Error, "unable to  connnect");
});
app.get('/', (req, res) => {
    res.send("Hello programmer");
    console.log('helo');
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
