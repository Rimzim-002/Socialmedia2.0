import { Sequelize } from 'sequelize'
import {config} from  'dotenv';
config();
const dbconnection= new Sequelize(
    process.env.DATABASE as  string,
    process.env.DATABASE_USER as  string,
    process.env.DATABASE_PASSWORD as  string,
{
    host:process.env.DATABASE_HOST as string,
    dialect:'mysql'
},

)
export default dbconnection;
