import { DataTypes } from 'sequelize';
import {dbconnection} from '../config/dbconnection.js';
import Users from './userModel.js';
import { nanoid } from 'nanoid';
const Posts = dbconnection.define(
  'posts',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);

Users.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(Users, { foreignKey: 'user_id' });

Posts.sync()
  .then(() => {
    console.log('  POST table created successfully');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });
export default Posts;
