const Sequelize = require('sequelize');
const connection = require('../database');

class User extends Sequelize.Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    
    password: {
        type: Sequelize.STRING(65),
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'user',
    tableName: 'users'
});

User.sync();

module.exports = User;