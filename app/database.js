const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://mafamrftiyqadd:ca723d18d194c2907d0d541895ea5cb931da0efdcb9eb256fe888454a3b0833b@ec2-54-216-48-43.eu-west-1.compute.amazonaws.com:5432/d191qave0goesl');

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = connection;