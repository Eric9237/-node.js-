const Joi = require('joi');

const add_progress_schema = Joi.object({
    date: Joi.date().required(),
    content: Joi.string().min(1).required(),
    hour: Joi.number().min(1).max(24).required(),

    id: Joi.number()
});

exports.add_progress_schema = add_progress_schema;

