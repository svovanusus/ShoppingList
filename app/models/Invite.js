const Sequelize = require('sequelize');
const connection = require('../database');

class Invite extends Sequelize.Model {}
Invite.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    inviter: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    invited: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'invite',
    tableName: 'invites'
});

module.exports = Invite;