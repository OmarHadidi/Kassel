const { Sequelize } = require("sequelize");
const { setupModels } = require("../models");

// const sequelize = new Sequelize(process.env.DB_URI);
const { DB_PORT, DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;
const sequelize = new Sequelize({
    dialect: "mysql",
    port: DB_PORT,
    username: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

module.exports = {
    sequelize,
    models: setupModels(sequelize),
};
