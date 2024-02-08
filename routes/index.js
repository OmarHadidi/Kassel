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
router.get("/jobs/:id", getJobById);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// Blog Routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

// Category Routes
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

/* GET home page. */
// TODO: Edit this
router.get("/", function (req, res, next) {
    res.render("index", { title: "Kassel", user: req.user });
});

module.exports = router;
