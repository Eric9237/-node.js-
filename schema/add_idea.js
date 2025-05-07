const Joi = require('joi');

const add_idea_schema = Joi.object({
    content: Joi.string().min(1).required(),

    id: Joi.number()
});

exports.add_idea_schema = add_idea_schema;