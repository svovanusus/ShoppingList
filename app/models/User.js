const db = require('../database');
var connection = db.connection;

class User extends db.sequelize.Model {}
User.init({
    id: {
        type: db.sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    username: {
        type: db.sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    
    password: {
        type: db.sequelize.STRING(65),
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'user',
    tableName: 'users'
});

User.sync();

module.exports = User;