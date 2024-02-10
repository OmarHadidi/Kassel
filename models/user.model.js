const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: { msg: errors.AlreadyExists("email") },
                validate: {
                    isEmail: { msg: errors.NotEmail("email") },
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: errors.AlreadyExists("username") },
                validate: {
                    notEmpty: { msg: errors.Missing("username") },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: errors.Missing("password") },
                },
            },
        }
    );
};
