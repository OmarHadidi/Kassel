const { log } = require("../config");

const { Blog, User, BlogCategory } = require("../config").models;

const getAllBlogs = async (req, res) => {
    try {
        const blogsWithCategories = await Blog.findAll({
            attributes: { exclude: ["id", "author_id"] },
            include: [
                { model: User, attributes: ["uid", "username"], as: "author" },
                {
                    model: BlogCategory,
                    attributes: ["uid", "title"],
                    as: "categories",
                },
            ],
            order: [["updatedAt", "DESC"]],
        });

        // hide id
        const blogs = blogsWithCategories.map((blog) => {
            delete blog.id;
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
            attributes: { exclude: ["id", "author_id"] },
            include: [
                { model: User, attributes: ["username", "uid"], as: "author" },
                {
                    model: BlogCategory,
                    attributes: ["title", "uid"],
                    as: "categories",
                },
            ],
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
        const { title, content, categories } = req.body;

        const blog = await Blog.create({
            title,
            content,
            author_id: req.user.id,
        });

        if (categories && categories.length > 0) {
            await Promise.all(
                categories.map(async (category) => {
                    const [newCategory] = await BlogCategory.findOrCreate({
                        where: { title: category },
                        defaults: { title: category },
                    });
                    await blog.addBlogCategory(newCategory);
                })
            );
        }
        delete blog.id;
        delete blog.author_id;
        blog.categories = categories || [];

        res.status(201).json(blog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, content, categories } = req.body;

        let blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await blog.update({ title, content });
        // Remove existing categories
        await blog.removeCategories();

        // Add new categories
        if (categories && categories.length > 0) {
            const newCategories = [];
            await Promise.all(
                categories.map(async (category) => {
                    const [newCategory] = await BlogCategory.findOrCreate({
                        where: { name: category },
                        defaults: { name: category },
                    });
                    newCategories.push(newCategory);
                })
            );
            await blog.addBlogCategories(newCategories);
        }

        blog = await Blog.findOne({
            where: { uid: req.params.uid },
            attributes: { exclude: ["id", "author_id"] },
            include: [
                { model: User, attributes: ["username", "uid"], as: "author" },
                {
                    model: BlogCategory,
                    attributes: ["uid", "title"],
                    as: "categories",
                },
            ],
        });

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
        // Remove associated categories
        await blog.removeBlogCategories();

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
