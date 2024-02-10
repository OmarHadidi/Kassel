const express = require("express");
const path = require("path");
const mw = require('../middlewares');
const router = express.Router();

const {
    getAllJobs,
    getJobByUid,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/job.controller");

const {
    getAllBlogs,
    getBlogByUid,
    createBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blog.controller");

const {
    getAllCategories,
    getCategoryByUid,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");

const {
    getAllUsers,
    getUserByUid,
    createUser,
    // updateUser,
    deleteUser,
} = require("../controllers/user.controller");

const {
    applyUserToJob,
    withdrawUserFromJob,
    addCategoryToBlog,
    removeCategoryFromBlog,
} = require("../controllers/relations.controller");

const { upload, log } = require("../config");

// Job-User Relations
router.post("/job/:jobUid/user/:userUid", applyUserToJob);
router.post("/user/:userUid/job/:jobUid", applyUserToJob);
router.delete("/job/:jobUid/user/:userUid", withdrawUserFromJob);
router.delete("/user/:userUid/job/:jobUid", withdrawUserFromJob);

// Blog-Category Relations
router.post("/blog/:blogUid/category/:categoryUid", addCategoryToBlog);
router.post("/category/:categoryUid/blog/:blogUid", addCategoryToBlog);
router.delete("/blog/:blogUid/category/:categoryUid", removeCategoryFromBlog);
router.delete("/category/:categoryUid/blog/:blogUid", removeCategoryFromBlog);

// Job Routes
router.get("/jobs", getAllJobs);
router.get("/jobs/:uid", getJobByUid);
router.post("/jobs", mw.auth.isAuthenticated(), createJob);
router.put("/jobs/:uid", mw.auth.isAuthenticated(), updateJob);
router.delete("/jobs/:uid", mw.auth.isAuthenticated(), deleteJob);

// Blog Routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:uid", getBlogByUid);
router.post("/blogs", mw.auth.isAuthenticated(), createBlog);
router.put("/blogs/:uid", mw.auth.isAuthenticated(), updateBlog);
router.delete("/blogs/:uid", mw.auth.isAuthenticated(), deleteBlog);

// Category Routes
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:uid", updateCategory);
router.delete("/categories/:uid", deleteCategory);

// User Routes
router.get("/users", mw.auth.isAuthenticated(), getAllUsers);
router.get("/users/:uid", mw.auth.isAuthenticated(), getUserByUid);
// router.post("/users", mw.auth.isAuthenticated(), createUser);
// router.put("/users/:uid", updateUser);
// router.delete("/users/:uid", mw.auth.isAuthenticated(), deleteUser);

// Upload Images
router.post("/upload", upload.single("image"), (req, res) => {
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

/* GET home page. */
// TODO: Edit this
router.get("/", function (req, res, next) {
    res.render("index", { title: "Kassel", user: req.user });
});

// GET swagger.yaml file
router.get("/swagger.yaml", (req, res, next) => {
    // Path to Swagger specification file
    const swaggerFilePath = path.join(__dirname, "..", "swagger.yaml");

    // Send the file as the response
    res.sendFile(swaggerFilePath, (err) => {
        if (err) next(err);
    });
});

module.exports = router;
