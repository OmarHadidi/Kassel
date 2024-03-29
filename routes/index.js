const express = require("express");
const path = require("path");
const mw = require("../middlewares");
const router = express.Router();

const {
    getAllJobs,
    getJobByUid,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/job.controller");

const {
    getAllJobApplications,
    getJobApplicationByUid,
    deleteJobApplicationByUid,
} = require("../controllers/jobApplication.controller");

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
    createJobApplicationForJob,
    getJobApplicationsForJob,
} = require("../controllers/relations.controller");

const {
    createContactForm,
    deleteContactForm,
    getAllContactForms,
    getContactFormByUid,
} = require("../controllers/contactForm.controller");

const { upload, log, models } = require("../config");

// Job-User Relations
// router.post("/job/:jobUid/user/:userUid", applyUserToJob);
// router.post("/user/:userUid/job/:jobUid", applyUserToJob);
// router.delete("/job/:jobUid/user/:userUid", withdrawUserFromJob);
// router.delete("/user/:userUid/job/:jobUid", withdrawUserFromJob);

// Blog-Category Relations
router.post(
    "/blog/:blogUid/category/:categoryUid",
    mw.auth.isAuthenticated(),
    addCategoryToBlog
);
router.post(
    "/category/:categoryUid/blog/:blogUid",
    mw.auth.isAuthenticated(),
    addCategoryToBlog
);
router.delete(
    "/blog/:blogUid/category/:categoryUid",
    mw.auth.isAuthenticated(),
    removeCategoryFromBlog
);
router.delete(
    "/category/:categoryUid/blog/:blogUid",
    mw.auth.isAuthenticated(),
    removeCategoryFromBlog
);

// Job Routes
router.get("/jobs", getAllJobs);
router.get("/jobs/:uid", getJobByUid);
router.post("/jobs", mw.auth.isAuthenticated(), createJob);
router.put("/jobs/:uid", mw.auth.isAuthenticated(), updateJob);
router.delete("/jobs/:uid", mw.auth.isAuthenticated(), deleteJob);

// Job application Routes
router.get(
    "/job-applications",
    mw.auth.isAuthenticated(),
    getAllJobApplications
);
router.get(
    "/job-applications/:uid",
    mw.auth.isAuthenticated(),
    getJobApplicationByUid
);
router.delete(
    "/job-applications/:uid",
    mw.auth.isAuthenticated(),
    deleteJobApplicationByUid
);

// Job - Job application Routes
router.post(
    "/jobs/:jobUid/applications",
    upload.single("resume"),
    createJobApplicationForJob
);

router.get(
    "/jobs/:jobUid/applications",
    mw.auth.isAuthenticated(),
    getJobApplicationsForJob
);

// Blog Routes
router.get("/blogs", getAllBlogs);
router.get("/blogs/:uid", getBlogByUid);
router.post(
    "/blogs",
    mw.auth.isAuthenticated(),
    upload.single("image"),
    createBlog
);

router.put("/blogs/:uid", mw.auth.isAuthenticated(), updateBlog);
router.delete("/blogs/:uid", mw.auth.isAuthenticated(), deleteBlog);

// Category Routes
router.get("/categories", getAllCategories);
router.post("/categories", mw.auth.isAuthenticated(), createCategory);
router.put("/categories/:uid", mw.auth.isAuthenticated(), updateCategory);
router.delete("/categories/:uid", mw.auth.isAuthenticated(), deleteCategory);

// Contact Us Routes
router.post("/contact-forms", createContactForm);
router.delete("/contact-forms/:uid", deleteContactForm);
router.get("/contact-forms", getAllContactForms);
router.get("/contact-forms/:uid", getContactFormByUid);

// User Routes
router.get("/users", mw.auth.isAuthenticated(), getAllUsers);
router.get("/users/:uid", mw.auth.isAuthenticated(), getUserByUid);
// router.post("/users", mw.auth.isAuthenticated(), createUser);
// router.put("/users/:uid", updateUser);
// router.delete("/users/:uid", mw.auth.isAuthenticated(), deleteUser);

// Upload Images
router.post(
    "/upload",
    mw.auth.isAuthenticated(),
    upload.single("image"),
    (req, res) => {
        res.status(200).json({ url: `/uploads/${req.file.filename}` });
    }
);

/* GET home page. */
// TODO: Edit this
router.get("/", async function (req, res, next) {
    // Setup Data
    // await require('../fillDB')()

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
