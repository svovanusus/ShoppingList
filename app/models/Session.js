const Sequelize = require('sequelize');
const connection = require('../database');

class Session extends Sequelize.Model {}
Session.init({
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },

      expires: Sequelize.DATE,
      
      data: Sequelize.STRING(50000),
}, {
    sequelize: connection,
    modelName: 'session',
    tableName: 'sessions',
    indexes: [{
        name: 'session_sid_index',
        method: 'BTREE',
        fields: ['sid'],
    }]
});

module.exports = Session;