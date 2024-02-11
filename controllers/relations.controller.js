const { log } = require("../config");

const { User, Job, Blog, BlogCategory, JobApplication } = require("../config").models;

const applyUserToJob = async (req, res) => {
    try {
        const { userUid, jobUid } = req.params;
        const currentUserUid = req.user.uid;

        if (userUid !== currentUserUid) {
            return res
                .status(401)
                .json({ message: "Unauthorized to apply for another user" });
        }

        const user = await User.findOne({ where: { uid: userUid } });
        const job = await Job.findOne({ where: { uid: jobUid } });

        if (!user || !job) {
            return res.status(404).json({ message: "User or Job not found" });
        }

        await user.addAppliedJob(job);
        res.json({ message: "User applied to the job successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const withdrawUserFromJob = async (req, res) => {
    try {
        const { userUid, jobUid } = req.params;
        const currentUserUid = req.user.uid;

        if (userUid !== currentUserUid) {
            return res
                .status(401)
                .json({ message: "Unauthorized to withdraw for another user" });
        }

        const user = await User.findOne({ where: { uid: userUid } });
        const job = await Job.findOne({ where: { uid: jobUid } });

        if (!user || !job) {
            return res.status(404).json({ message: "User or Job not found" });
        }

        await user.removeAppliedJob(job);
        res.json({ message: "User withdrew from the job successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const addCategoryToBlog = async (req, res) => {
    try {
        const { blogUid, categoryUid } = req.params;
        const blog = await Blog.findOne({ where: { uid: blogUid } });
        const category = await BlogCategory.findOne({
            where: { uid: categoryUid },
        });

        if (!blog || !category) {
            return res
                .status(404)
                .json({ message: "Blog or Category not found" });
        }

        await blog.addCategory(category);
        res.json({ message: "Category added to the blog successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const removeCategoryFromBlog = async (req, res) => {
    try {
        const { blogUid, categoryUid } = req.params;
        const blog = await Blog.findOne({ where: { uid: blogUid } });
        const category = await BlogCategory.findOne({
            where: { uid: categoryUid },
        });

        if (!blog || !category) {
            return res
                .status(404)
                .json({ message: "Blog or Category not found" });
        }

        await blog.removeBlogCategory(category);
        res.json({ message: "Category removed from the blog successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getJobApplicationsForJob = async (req, res) => {
    try {
        const jobUid = req.params.jobUid;

        // Find the job based on the provided jobUid
        const job = await Job.findOne({ where: { uid: jobUid } });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Find all job applications associated with the found job
        const jobApplications = await JobApplication.findAll({
            where: { JobId: job.id },
            attributes: { exclude: ["id", "JobId"] }, // Exclude unnecessary fields
        });

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createJobApplicationForJob = async (req, res) => {
    try {
        log.dump("form data aplication", req.body);
        // Destructure fields from request body
        const { firstName, lastName, email, phone, hearAbout, message } =
            req.body;
        // Construct the file link using the uploaded file path
        const resumeLink = req.file ? `/uploads/${req.file.filename}` : null;
        log.dump("resumeLink", resumeLink)
        // Find the Job based on the uid passed in the URL parameter
        const jobUid = req.params.jobUid; // Assuming jobUid is the parameter for the Job's uid
        log.dump("jobUid", jobUid)
        const job = await Job.findOne({ where: { uid: jobUid } });
        // Create the job application
        const jobApplication = await JobApplication.create({
            firstName,
            lastName,
            email,
            phone,
            hearAbout,
            message,
            resume: resumeLink, // Store the resume link
            JobId: job.id, // Associate with the specified Job
        });

        // Send response with selected fields
        res.status(201).json({
            uid: jobApplication.uid,
            firstName,
            lastName,
            email,
            phone,
            hearAbout,
            message,
            resume: resumeLink,
            jobUid,
        });
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    applyUserToJob,
    withdrawUserFromJob,
    addCategoryToBlog,
    removeCategoryFromBlog,
    getJobApplicationsForJob,
    createJobApplicationForJob,
};
