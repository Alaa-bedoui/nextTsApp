const {DataTypes} = require("sequelize");
const sequelize = require("../database");

const Booking = sequelize.define(
    "booking", 
    {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Booking;
