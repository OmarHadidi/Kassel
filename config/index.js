require("dotenv").config();

const { sequelize, models } = require("./models-setup");
const passportConf = require("./passport-setup");
const upload = require("./multer-setup");
const log = require("./log");
const errors = require("./errors");
const session = require("express-session");

const SequelizeSessionStore = require("connect-session-sequelize")(
    session.Store
);
const sequelizeSessionStore = new SequelizeSessionStore({
    db: sequelize,
});
sequelizeSessionStore.sync();

module.exports = {
    sequelize,
    models,
    passport: passportConf,
    upload,
    log,
    errors,
    sequelizeSessionStore,
};
