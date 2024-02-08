const express = require("express");
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
router.post("/jobs", createJob);
router.put("/jobs/:uid", updateJob);
router.delete("/jobs/:uid", deleteJob);

// Blog Routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:uid", getBlogByUid);
router.post("/blogs", createBlog);
router.put("/blogs/:uid", updateBlog);
router.delete("/blogs/:uid", deleteBlog);

// Category Routes
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:uid", updateCategory);
router.delete("/categories/:uid", deleteCategory);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:uid", getUserByUid);
router.post("/users", createUser);
// router.put("/users/:uid", updateUser);
router.delete("/users/:uid", deleteUser);

// Upload Images
router.post("/upload", upload.single("image"), (req, res) => {
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
});

/* GET home page. */
// TODO: Edit this
router.get("/", function (req, res, next) {
    res.render("index", { title: "Kassel", user: req.user });
});

module.exports = router;
