const { log } = require("../config");

const { Job } = require("../config").models;

const getAllJobs = async (req, res) => {
    try {
        // Fetch all jobs (available & unavailable)
        const jobs = await Job.findAll({ where: query });

        res.json(jobs);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getJobByUid = async (req, res) => {
    try {
        const job = await Job.findOne({
            where: { uid: req.params.uid },
            attributes: { exclude: ["id"] },
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        const job = new Job({
            title: req.body.title,
            description: req.body.description,
        });

        const newJob = await job.save();

        // Construct response object excluding the 'id' field
        const responseJob = {
            uid: newJob.uid,
            title: newJob.title,
            description: newJob.description,
            createdAt: newJob.createdAt,
            updatedAt: newJob.updatedAt,
        };

        res.status(201).json(responseJob);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({ where: { uid: req.params.uid } });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Exclude 'id', 'uid', 'createdAt', and 'updatedAt' fields from update
        const updatedJob = await job.update({
            title: req.body.title,
            description: req.body.description,
        });
        const responseJob = {
            uid: updatedJob.uid,
            title: updatedJob.title,
            description: updatedJob.description,
            createdAt: updatedJob.createdAt,
            updatedAt: updatedJob.updatedAt,
        };

        res.json(responseJob);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({ where: { uid: req.params.uid } });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        await job.destroy();
        return res.json({ message: "Job deleted" });
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllJobs,
    getJobByUid,
    createJob,
    updateJob,
    deleteJob,
};
