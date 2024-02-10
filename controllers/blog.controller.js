const { log } = require("../config");

const { Blog, User } = require("../config").models;

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: { exclude: ["id", "author_id"] }, // Exclude 'id' and 'author_id' fields
            include: [{ model: User, attributes: ["username"], as: "author" }], // Include User model to get author's username
            order: [["updatedAt", "DESC"]],
        });
        res.json(blogs);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getBlogByUid = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            where: { uid: req.params.uid },
            attributes: { exclude: ["id", "author_id"] }, // Exclude 'id' and 'author_id' fields
            include: [{ model: User, attributes: ["username"], as: "author" }], // Include User model to get author's username
        });
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
        const blog = new Blog({
            title: req.body.title,
            content: req.body.description,
            author_id: req.user.id,
        });

        const newBlog = await blog.save();

        // Hide 'id' field and replace 'author_id' with 'author' (username)
        const responseBlog = {
            uid: newBlog.uid, // Assuming there's a uid field
            title: newBlog.title,
            content: newBlog.content,
            author: req.user.username, // Assuming req.user contains the user object with username
            createdAt: newBlog.createdAt,
            updatedAt: newBlog.updatedAt,
        };

        res.status(201).json(responseBlog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the blog
        await blog.update({
            title: req.body.title,
            content: req.body.content,
        });

        // Hide 'id' field and replace 'author_id' with 'author' (username)
        const responseBlog = {
            uid: blog.uid, // Assuming there's a uid field
            title: blog.title,
            content: blog.content,
            author: req.user.username, // Assuming req.user contains the user object with username
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };

        res.json(blog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await blog.destroy();
        res.json({ message: "Blog deleted" });
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
