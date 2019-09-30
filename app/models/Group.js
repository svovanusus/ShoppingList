const Sequelize = require('sequelize');
const connection = require('../database');

class Group extends Sequelize.Model {}
Group.init({
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
    }
}, {
    sequelize: connection,
    modelName: 'group',
    tableName: 'groups'
});

Group.sync();

module.exports = Group;