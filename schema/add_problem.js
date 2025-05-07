const Joi = require('joi');

const add_problem_schema = Joi.object({
    content: Joi.string().min(1).required(),

    id: Joi.number()
});

exports.add_problem_schema = add_problem_schema;