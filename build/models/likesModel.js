import { DataTypes } from 'sequelize';
import dbconnection from '../config/dbconnection.js';
import { nanoid } from 'nanoid';
import Posts from './postModel.js';
import Users from './userModel.js';
import Comments from './commentsModel.js';
const Likes = dbconnection.define('Likes', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => nanoid(6),
    },
    post_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Posts,
            key: 'id',
        },
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
    Comment_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
Posts.hasMany(Likes, { foreignKey: 'post_id', as: 'likes' });
Likes.belongsTo(Posts, { foreignKey: 'post_id', as: 'posts' });
Users.hasMany(Likes, { foreignKey: 'user_id', as: 'likes' });
Likes.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Comments.hasMany(Likes, { foreignKey: 'comment_id', as: 'like' });
Likes.belongsTo(Comments, { foreignKey: 'comment_id', as: 'user' });
Likes.sync()
    .then(() => {
    console.log('Comments table created successfully');
})
    .catch((error) => {
    console.error('Error creating table:', error);
});
export default Likes;
