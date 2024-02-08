const { log } = require("../config");

const { User, Job, Blog, BlogCategory } = require("../config").models;

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
        const isAdmin = req.user && req.user.is_admin;

        if (!isAdmin) {
            return res
                .status(401)
                .json({ message: "Unauthorized to add category to blog" });
        }

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

        await blog.addBlogCategory(category);
        res.json({ message: "Category added to the blog successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const removeCategoryFromBlog = async (req, res) => {
    try {
        const isAdmin = req.user && req.user.is_admin;

        if (!isAdmin) {
            return res
                .status(401)
                .json({ message: "Unauthorized to remove category from blog" });
        }

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

module.exports = {
    applyUserToJob,
    withdrawUserFromJob,
    addCategoryToBlog,
    removeCategoryFromBlog,
};
