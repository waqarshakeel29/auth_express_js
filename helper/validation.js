const Joi = require('joi');

const registerValidation = async (data) => {
    const validationSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).required()
    });
    await validationSchema.validateAsync(data);
}

const loginValidation = async (data) => {
    const validationSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).required()
    });
    await validationSchema.validateAsync(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
