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

User.hasMany(Group, {foreignKey: 'owner', sourceKey: 'id'});
Group.belongsTo(User, {foreignKey: 'owner', targetKey: 'id'});

User.hasMany(List, {foreignKey: 'owner', sourceKey: 'id'});
List.belongsTo(User, {foreignKey: 'owner', targetKey: 'id'});

User.hasMany(Invite, {foreignKey: 'inviter', sourceKey: 'id'});
Invite.belongsTo(User, {foreignKey: 'inviter', targetKey: 'id'});

User.hasMany(Invite, {foreignKey: 'invited', sourceKey: 'id'});
Invite.belongsTo(User, {foreignKey: 'invited', targetKey: 'id'});

User.belongsToMany(Group, {through: 'user_group'});

module.exports = User;