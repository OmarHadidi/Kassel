const chalk = require("chalk");
const { Sequelize, DataTypes, Op } = require("sequelize");
require("dotenv").config();

/**
 * get a list of special methods added to a Model for associations
 * @param {*} model
 */
function getSpecialFuncs(model) {
    console.log("model.associations :>> ", model.associations);
    for (let assoc of Object.keys(model.associations)) {
        for (let accessor of Object.keys(model.associations[assoc].accessors)) {
            console.log(
                chalk.redBright(
                    model.name +
                        "." +
                        model.associations[assoc].accessors[accessor] +
                        "()"
                )
            );
        }
    }
}

/**
 * Gets all Models from files, and Setup Relations between them, then return them in object
 * @param {*} sequelize
 * @returns all models in object
 */
function setupModels(sequelize) {
    const Job = require("./Job.model")(sequelize),
        User = require("./user.model")(sequelize),
        Blog = require("./Blog.model")(sequelize),
        BlogCategory = require("./BlogCategory.model")(sequelize),
        JobApplication = require("./JobApplication.model")(sequelize),
        ContactForm = require("./ContactForm.model")(sequelize);
    const models = {
        Job,
        Blog,
        BlogCategory,
        User,
        JobApplication,
        ContactForm,
    };

    // Relations
    // Define associations
    User.belongsToMany(Job, { through: "User_Job", as: "appliedJobs" });
    Job.belongsToMany(User, { through: "User_Job", as: "applyers" });

    Blog.belongsTo(User, { foreignKey: "author_id", as: "author" });
    User.hasMany(Blog, { foreignKey: "author_id", as: "authoredBlogs" });

    Blog.belongsToMany(BlogCategory, {
        through: "Blog_Categories",
        as: "categories",
    });
    // BlogCategory.belongsToMany(Blog, { through: "BlogCategories" });

    Job.hasMany(JobApplication, { onDelete: "CASCADE" });
    JobApplication.belongsTo(Job);

    getSpecialFuncs(Job);

    return models;
}

/**
 * calls `sync()` after setting models and relations
 * @param {*} sequelize
 */
async function syncModels(sequelize) {
    setupModels(sequelize);
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
}

// To run here
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
sequelize.authenticate().then(async () => {
    await syncModels(sequelize);
});

module.exports = {
    setupModels,
    syncModels,
};
