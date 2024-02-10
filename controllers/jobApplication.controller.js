const { log } = require("../config");
const { JobApplication, Job } = require("../config").models;

const createJobApplication = async (req, res) => {
    try {
        log.dump("form data aplication", req.body)
        // Destructure fields from request body
        const { firstName, lastName, email, phone, hearAbout, message } =
            req.body;
        // Construct the file link using the uploaded file path
        const resumeLink = req.file ? `/uploads/${req.file.filename}` : null;
        // Find the Job based on the uid passed in the URL parameter
        const jobUid = req.params.jobUid; // Assuming jobUid is the parameter for the Job's uid
        const job = await Job.findOne({ where: { uid: jobUid } });
        // Create the job application
        const jobApplication = await JobApplication.create({
            firstName,
            lastName,
            email,
            phone,
            hearAbout,
            message,
            resume: resumeLink, // Store the resume link
            JobId: job.id, // Associate with the specified Job
        });

        // Send response with selected fields
        res.status(201).json({
            uid: jobApplication.uid,
            firstName,
            lastName,
            email,
            phone,
            hearAbout,
            message,
            resume: resumeLink,
            jobUid,
        });
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createJobApplication,
};
