const Sequelize = require('sequelize');
const connection = require('../database');
const Group = require('./Group');
const List = require('./List');
const Invite = require('./Invite');

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

User.hasMany(Group, {as: 'GroupOwnership', foreignKey: 'owner', sourceKey: 'id'});
Group.belongsTo(User, {as: 'Owner', foreignKey: 'owner', targetKey: 'id'});

User.hasMany(List, {as: 'ListOwnership', foreignKey: 'owner', sourceKey: 'id'});
List.belongsTo(User, {as: 'Owner', foreignKey: 'owner', targetKey: 'id'});

User.hasMany(Invite, {as: 'Invitings', foreignKey: 'inviter', sourceKey: 'id'});
Invite.belongsTo(User, {as: 'Inviter', foreignKey: 'inviter', targetKey: 'id'});

User.hasMany(Invite, {as: 'Invitations', foreignKey: 'invited', sourceKey: 'id'});
Invite.belongsTo(User, {as: 'Invited', foreignKey: 'invited', targetKey: 'id'});

User.belongsToMany(Group, {as: 'Groups', through: 'user_group'});
Group.belongsToMany(User, {as: 'Users', through: 'user_group'});

module.exports = User;