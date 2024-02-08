const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define("Blog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: errors.Missing("blog title") },
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: errors.Missing("blog content") },
            },
        },
    },
    { paranoid: true }
    );
};
