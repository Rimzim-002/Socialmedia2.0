import { DataTypes } from 'sequelize';
import { dbconnection } from '../config/dbconnection.js';
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
    post_id: {
        type: DataTypes.STRING,
        references: {
            model: Posts,
            key: 'id',
        },
        allowNull: true,
    },
    Comment_id: {
        type: DataTypes.STRING,
        references: {
            model: Comments,
            key: 'id',
        },
        allowNull: true,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
});
Users.hasMany(Likes, { foreignKey: 'user_id', as: 'likes' });
Likes.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
Posts.hasMany(Likes, { foreignKey: 'post_id', as: 'likes' });
Likes.belongsTo(Posts, { foreignKey: 'post_id', as: 'post' });
Comments.hasMany(Likes, { foreignKey: 'Comment_id', as: 'likes' });
Likes.belongsTo(Comments, { foreignKey: 'Comment_id', as: 'comment' });
Likes.sync()
    .then(() => {
    console.log('Comments table created successfully');
})
    .catch((error) => {
    console.error('Error creating table:', error);
});
export default Likes;
