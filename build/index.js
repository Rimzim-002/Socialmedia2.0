import Express from 'express';
import dbconnection from './config/dbconnection';
import { config } from 'dotenv';
config();
var app = Express();
var port = 3000;
dbconnection.authenticate()
    .then(function () {
    console.log(" Database connection sucessfull");
})
    .catch(function (err) {
    console.log(Error, "unable to  connnect");
});
app.get('/', function (req, res) {
    //   res.status(200)json.({messsage:"Hello programmer"});
    console.log('helo');
});
app.listen(port, function () {
    console.log("Connected successfully on port ".concat(port));
});
