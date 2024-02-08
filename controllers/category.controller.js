const { Category } = require("../config").models;

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryByUid = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { uid: req.params.uid } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { uid: req.params.uid } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.update(req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { uid: req.params.uid } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.destroy();
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryByUid,
    createCategory,
    updateCategory,
    deleteCategory,
};
