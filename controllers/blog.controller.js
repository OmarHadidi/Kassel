const { log } = require("../config");

const { Blog } = require("../config").models;

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getBlogByUid = async (req, res) => {
    try {
        const blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Create the blog
        const blog = new Blog({
            title: req.body.title,
            content: req.body.description,
            author_id: req.user.id,
        });

        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the blog
        await blog.update(req.body);

        res.json(blog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const blogId = req.params.id;
        const hardDelete = req.query.permanent === "true"; // Check if hard delete is requested

        let blog;

        if (hardDelete) {
            // Perform hard delete
            blog = await Blog.findByPk(blogId);
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            await blog.destroy({ force: true });
            return res.json({ message: "Blog permanently deleted" });
        } else {
            // Perform soft delete
            const result = await Blog.destroy({ where: { id: blogId } });
            if (result === 0) {
                return res.status(404).json({ message: "Blog not found" });
            }
            return res.json({ message: "Blog deleted" });
        }
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogByUid,
    createBlog,
    updateBlog,
    deleteBlog,
};
