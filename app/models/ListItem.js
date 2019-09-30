const Sequelize = require('sequelize');
const connection = require('../database');

class ListItem extends Sequelize.Model {}
ListItem.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    
    listId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    isDone: {
        type: Sequelize.BOOLEAN,
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