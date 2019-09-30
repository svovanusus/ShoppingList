const Sequelize = require('sequelize');
const connection = require('../database');

class UserGroup extends Sequelize.Model {}
UserGroup.init({
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    groupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'user-group',
    tableName: 'user_group'
});

UserGroup.sync();

module.exports = UserGroup;