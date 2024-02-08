const { Job } = require("../config").models;

const getAllJobs = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // Define base query
        let query = { is_available: true };

        // If user is admin, show all jobs
        if (isAdmin) {
            query = {};
        }

        // Fetch jobs based on the query
        const jobs = await Job.findAll({ where: query });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const isAdmin = req.user && req.user.is_admin;
        const jobId = req.params.id;

        let job;
        if (isAdmin) {
            job = await Job.findByPk(jobId);
        } else {
            job = await Job.findOne({ where: { id: jobId, is_available: true } });
        }

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const { Job, User } = require('../models');

const createJob = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Create the job
        const job = new Job({
            title: req.body.title,
            description: req.body.description,
            // Add other fields as necessary
        });

        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Update the job
        await job.update(req.body);

        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin, return unauthorized
        if (!isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const jobId = req.params.id;
        const hardDelete = req.query.permanent === 'true'; // Check if hard delete is requested

        let job;

        if (hardDelete) {
            // Perform hard delete
            job = await Job.findByPk(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            await job.destroy({force:true});
            return res.json({ message: 'Job permanently deleted' });
        } else {
            // Perform soft delete
            const result = await Job.destroy({ where: { id: jobId } });
            if (result === 0) {
                return res.status(404).json({ message: 'Job not found' });
            }
            return res.json({ message: 'Job deleted' });
        }
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
