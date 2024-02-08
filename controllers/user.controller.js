const { User } = require("../config").models;

const getAllJobs = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        // TODO: use config errors
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
};
