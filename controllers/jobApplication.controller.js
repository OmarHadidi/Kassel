const { log } = require("../config");
const { JobApplication } = require("../config").models;

const createJobApplication = async (req, res) => {
    try {
        // Destructure fields from request body
        const { firstName, lastName, email, phone, hearAbout, message } =
            req.body;
        // Construct the file link using the uploaded file path
        const resumeLink = req.file ? `/uploads/${req.file.filename}` : null;

        // Create the job application
        const jobApplication = await JobApplication.create({
            firstName,
            lastName,
            email,
            phone,
            hearAbout,
            message,
            resume: resumeLink, // Store the resume link
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
        });
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createJobApplication,
};
