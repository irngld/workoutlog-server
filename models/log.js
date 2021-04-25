// const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const database = require('../db')



const Log = database.define('log', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Log;