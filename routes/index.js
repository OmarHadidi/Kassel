const express = require("express");
const router = express.Router();

const {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/job.controller");

const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blog.controller");

const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

// Job Routes
router.get("/jobs", getAllJobs);
router.get("/jobs/:uid", getJobById);
router.post("/jobs", createJob);
router.put("/jobs/:uid", updateJob);
router.delete("/jobs/:uid", deleteJob);

// Blog Routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:uid", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:uid", updateBlog);
router.delete("/blogs/:uid", deleteBlog);

// Category Routes
router.get("/categories", getAllCategories);
router.get("/categories/:uid", getCategoryById);
router.post("/categories", createCategory);
router.put("/categories/:uid", updateCategory);
router.delete("/categories/:uid", deleteCategory);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:uid", getUserById);
router.post("/users", createUser);
router.put("/users/:uid", updateUser);
router.delete("/users/:uid", deleteUser);

/* GET home page. */
// TODO: Edit this
router.get("/", function (req, res, next) {
    res.render("index", { title: "Kassel", user: req.user });
});

module.exports = router;
