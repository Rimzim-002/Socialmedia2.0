import { DataTypes } from 'sequelize';
import dbconnection from '../config/dbconnection.js';
import { nanoid } from 'nanoid';
import Posts from './postModel.js';
import Users from './userModel.js';
const Comments = dbconnection.define('Comments', {
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
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reply_id: {
        type: DataTypes.STRING,
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
// Realtion of posts and commnets
Posts.hasMany(Comments, { foreignKey: 'post_id' });
Comments.belongsTo(Posts, { foreignKey: 'post_id' });
// Relation of users and comments
Users.hasMany(Comments, { foreignKey: 'user_id' });
Comments.belongsTo(Users, { foreignKey: 'user_id' });
// Relation of comments with nested comments
Comments.hasMany(Comments, { foreignKey: 'reply_id', as: 'replies' });
Comments.belongsTo(Comments, { foreignKey: 'reply_id', as: 'parentComment' });
Comments.sync()
    .then(() => {
    console.log('Comments table created successfully');
})
    .catch((error) => {
    console.error('Error creating table:', error);
});
export default Comments;
