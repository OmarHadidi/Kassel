const { Sequelize, DataTypes, Op } = require("sequelize");
const errors = require("../config/errors");

module.exports = function (sequelize) {
    return sequelize.define("Detail", {
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: errors.Missing("title") },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: errors.Missing("description") },
            },
        },
        image: {
            type: DataTypes.STRING, // Assuming image is stored as a URL or file path
            allowNull: true, // Image is optional, so it can be null
        },
    });
};
