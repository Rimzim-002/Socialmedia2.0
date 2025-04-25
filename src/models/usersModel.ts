import { DataTypes } from "sequelize";
import dbconnection from "../config/dbconnection";

const Users =  dbconnection.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    timeStamp:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  

})
 Users.sync().then(() => {   
    console.log("Table created successfully");
  }).catch((error) => {
    console.error("Error creating table:", error);
  });


export default Users;