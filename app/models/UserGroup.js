const db = require('../database');

var connection = db.connection;

class UserGroup extends db.sequelize.Model {}
UserGroup.init({
    userId: {
        type: db.sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    groupId: {
        type: db.sequelize.INTEGER,
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