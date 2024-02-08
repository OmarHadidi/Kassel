const { Blog } = require("../config").models;

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await blog.update(req.body);
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await blog.destroy();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};
