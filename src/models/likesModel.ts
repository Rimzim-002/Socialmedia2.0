import { DataTypes } from 'sequelize';
import dbconnection from '../config/dbconnection.js';
import { nanoid } from 'nanoid';
import Posts from './postModel.js';
import Users from './userModel.js';
import Comments from './commentsModel.js';
const Likes = dbconnection.define(
  'Likes',
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
    type: {
      type: DataTypes.ENUM('post', 'comment'),
      allowNull: false,
    },

    parent_id: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

    status: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: true,
      defaultValue: null,
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


Users.hasMany(Likes, { foreignKey: 'user_id', as: 'likes' });
Likes.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });


Likes.sync()
  .then(() => {
    console.log('Comments table created successfully');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });

export default Likes;
