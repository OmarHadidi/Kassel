const Joi = require("joi");

module.exports.signupSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(1).max(50),
    password: Joi.string().min(6).required()
});

