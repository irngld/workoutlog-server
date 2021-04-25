const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, 'postgres', process.env.DB_PWD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

module.exports = db;