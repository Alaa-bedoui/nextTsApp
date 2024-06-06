require('dotenv').config(); 
const { Sequelize, DataTypes } = require('sequelize');


const connection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



// This call will automatically perform an SQL query to the database and create a table
// Run this code one time after creating your connection
connection
  .sync({ force: true })
  .then(() => {
    console.log('Booking table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table:', error);
  });

  module.exports=connection

