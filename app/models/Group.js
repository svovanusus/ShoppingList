const db = require('../database');

var connection = db.connection;

class Group extends db.sequelize.Model {}
Group.init({
    id: {
        type: db.sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    title: {
        type: db.sequelize.STRING(256),
        allowNull: false
    },
    
    owner: {
        type: db.sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'group',
    tableName: 'groups'
});

Group.sync();

module.exports = Group;