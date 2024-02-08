const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define(
        "Job",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            is_available: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: errors.Missing("job title") },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: errors.Missing("job description") },
                },
            },
        },
        { paranoid: true }
    );
};
