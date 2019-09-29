const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://shopping_list_app:application@localhost:5432/shopping_list');

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports.sequelize = Sequelize;
module.exports.connection = connection;