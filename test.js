// const { Sequelize, DataTypes } = require("sequelize");

// require("dotenv").config();
// const { DB_PORT, DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;
// const sequelize = new Sequelize({
//     dialect: "mysql",
//     port: DB_PORT,
//     username: DB_USER,
//     host: DB_HOST,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
// });

// const Blog = sequelize.define("Blog", {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });
// const X = sequelize.define("x");
// Blog.hasMany(X);

// (async function () {
//     await sequelize.sync({ force: true });

//     const blog = await Blog.create({ title: "a", content: "a" });
//     await blog.update({ title: "b", content: "b" });
//     await blog.addX(await X.create());
//     console.log(blog.toJSON());
// })();

const blog = {
    uid,
    title,
    description,
    image,
    details: [
        { uid, title, content, image },
        { uid, title, content, image },
    ],
};
