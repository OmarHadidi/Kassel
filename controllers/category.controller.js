const { log } = require("../config");

const { BlogCategory } = require("../config").models;

const getAllCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.findAll({
            attributes: { exclude: ["id"] },
        });
        res.json(categories);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        // Create the category
        const category = new BlogCategory({
            title: req.body.title,
        });

        const newCategory = await category.save();

        // Construct response object excluding the 'id', 'createdAt', and 'updatedAt' fields
        const responseCategory = {
            uid: newCategory.uid,
            title: newCategory.title,
            createdAt: newCategory.createdAt,
            updatedAt: newCategory.updatedAt,
        };

        res.status(201).json(responseCategory);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await BlogCategory.findOne({
            where: { uid: req.params.uid },
        });
        if (!category) {
            return res.status(404).json({ message: "BlogCategory not found" });
        }

        // Update the category
        await category.update(req.body);
        const responseCategory = {
            uid: category.uid,
            title: category.title,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
        res.json(responseCategory);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await BlogCategory.destroy({
            where: { uid: req.params.uid },
        });

        if (!category)
            return res.status(404).json({ message: "BlogCategory not found" });

        res.json({ message: "BlogCategory deleted successfully" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
