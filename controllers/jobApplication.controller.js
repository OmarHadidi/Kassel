const { log } = require("../config");
const { JobApplication, Job } = require("../config").models;

const getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await JobApplication.findAll({
            include: [{ model: Job, attributes: ["title", "uid"] }],
            attributes: { exclude: ["id", "JobId"] },
        });

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getJobApplicationByUid = async (req, res) => {
    try {
        const uid = req.params.uid;
        const jobApplication = await JobApplication.findOne({
            where: { uid },
            include: [{ model: Job, attributes: ["title", "uid"] }],
            attributes: { exclude: ["id", "JobId"] },
        });

        if (!jobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }

        res.status(200).json(jobApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteJobApplicationByUid = async (req, res) => {
    try {
        const uid = req.params.uid;
        const deletedJobApplication = await JobApplication.destroy({
            where: { uid },
        });

        if (!deletedJobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllJobApplications,
    getJobApplicationByUid,
    deleteJobApplicationByUid,
};
