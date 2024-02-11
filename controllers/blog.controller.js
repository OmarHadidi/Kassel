const { log } = require("../config");
const { Blog, User, BlogCategory, Detail } = require("../config").models;
const path = require("path");
const fs = require("fs");

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
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Detail,
                    attributes: { exclude: ["id", "BlogId"] },
                    as: "details",
                },
            ],
            order: [["updatedAt", "DESC"]],
        });

        res.json(blogsWithCategories);
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
                {
                    model: Detail,
                    attributes: { exclude: ["id", "BlogId"] },
                    as: "details",
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
        const { title, details, categories, description } = req.body;

        const imageUrl = req.file ? "/uploads/" + req.file.filename : null;

        const blog = await Blog.create({
            title,
            details,
            author_id: req.user.id,
            description,
            image: imageUrl,
        });

        if (categories && categories.length > 0) {
            await Promise.all(
                categories.map(async (category) => {
                    const [newCategory] = await BlogCategory.findOrCreate({
                        where: { title: category },
                        defaults: { title: category },
                    });
                    await blog.addCategory(newCategory);
                })
            );
        }
        const responseBlog = blog.toJSON();
        delete responseBlog.id;
        delete responseBlog.author_id;
        responseBlog.categories = categories || [];

        res.status(201).json(responseBlog);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, details, description, categories } = req.body;

        let blog = await Blog.findOne({ where: { uid: req.params.uid } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        await blog.update({ title, details, description });
        // Remove existing categories
        await blog.removeCategories();

        // Add new categories
        if (categories && categories.length > 0) {
            const newCategories = [];
            await Promise.all(
                categories.map(async (category) => {
                    const [newCategory] = await BlogCategory.findOrCreate({
                        where: { title: category },
                        defaults: { title: category },
                    });
                    newCategories.push(newCategory);
                })
            );
            await blog.addCategories(newCategories);
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
                    through: {
                        attributes: [],
                    },
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
        // Remove image
        if (blog.image) {
            const filePath = path.join(__dirname, "../public", blog.image);
            log.system(filePath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    log.error(err);
                    return;
                }
            });
        }
        // Remove associated categories
        await blog.removeCategories();

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
