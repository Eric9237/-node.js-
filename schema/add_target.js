const Joi = require('joi');

const add_target_schema = Joi.object({
    content: Joi.string().min(1).required(),

    id: Joi.number()
});

exports.add_target_schema = add_target_schema;