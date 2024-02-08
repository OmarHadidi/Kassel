const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define("Blog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false
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
