const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define("BlogCategory", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: errors.Missing("category title") },
            },
        },
    });
};
