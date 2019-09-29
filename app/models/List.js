const db = require('../database');

var connection = db.connection;

class List extends db.sequelize.Model {}
List.init({
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
    },

    groupLink: {
        type: db.sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'list',
    tableName: 'lists'
});

List.sync();

module.exports = List;