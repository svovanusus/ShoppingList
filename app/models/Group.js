const Sequelize = require('sequelize');
const connection = require('../database');
const List = require('./List');
const Invite = require('./Invite');

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

Group.hasMany(List, {as: 'Lists', foreignKey: 'group_link', sourceKey: 'id'});
List.belongsTo(Group, {foreignKey: 'group_link', targetKey: 'id'});

Group.hasMany(Invite, {foreignKey: 'groupId', sourceKey: 'id'});
Invite.belongsTo(Group, {foreignKey: 'groupId', targetKey: 'id'});

module.exports = Group;