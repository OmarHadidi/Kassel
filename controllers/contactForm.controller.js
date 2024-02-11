// controllers/contactFormController.js
const { log } = require("../config");
const { ContactForm } = require("../config").models;

const createContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const contactForm = await ContactForm.create({
            name,
            email,
            phone,
            message,
        });
        const responseContactForm = contactForm.toJSON();
        delete responseContactForm.id;
        res.status(201).json(responseContactForm);
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteContactForm = async (req, res) => {
    try {
        const { uid } = req.params;
        await ContactForm.destroy({ where: { uid } });
        res.status(204).end();
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: error.message });
    }
};

const getAllContactForms = async (req, res) => {
    try {
        const contactForms = await ContactForm.findAll({
            attributes: { exclude: ["id"] },
            order: [["createdAt", "DESC"]],
        });
        res.json(contactForms);
    } catch (error) {
        log.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getContactFormByUid = async (req, res) => {
    try {
        const { uid } = req.params;
        const contactForm = await ContactForm.findOne({
            where: { uid },
            attributes: { exclude: ["id"] },
        });
        if (!contactForm) {
            return res.status(404).json({ message: "Contact form not found" });
        }
        res.json(contactForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContactForm,
    deleteContactForm,
    getAllContactForms,
    getContactFormByUid,
};
