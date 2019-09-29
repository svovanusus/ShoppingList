const db = require('../database');

var connection = db.connection;

class ListItem extends db.sequelize.Model {}
ListItem.init({
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
    
    listId: {
        type: db.sequelize.INTEGER,
        allowNull: false
    },

    isDone: {
        type: db.sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: connection,
    modelName: 'list-item',
    tableName: 'list_items'
});

ListItem.sync();

module.exports = ListItem;