const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
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
                isAlpha: { msg: errors.AlphaOnly("name") },
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
        role: {
            // NOTE
            type: DataTypes.ENUM("user", "admin", "customerSupport"),
            defaultValue: "user",
            allowNull: false,
        },
    });
};
