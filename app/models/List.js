const Sequelize = require('sequelize');
const connection = require('../database');

class List extends Sequelize.Model {}
List.init({
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
    
    owner: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    groupLink: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    sequelize: connection,
    modelName: 'list',
    tableName: 'lists'
});

List.sync();

module.exports = List;