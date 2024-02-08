const { Category } = require("../config").models;

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Create the category
        const category = new Category({
            title: req.body.title,
        });

        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const category = await Category.findOne({ where: { uid: req.params.uid } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the category
        await category.update(req.body);

        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const isAdmin = req.user && req.user.is_admin;

        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const categoryUid = req.params.uid;
        const category = await Category.findOne({ where: { uid: categoryUid } });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
