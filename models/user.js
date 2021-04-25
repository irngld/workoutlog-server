// const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = User;