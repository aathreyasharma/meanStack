const Joi = require('@hapi/joi');

const newEventValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
		
	})
	return schema.validate(data);
}

module.exports.newEventValidation = newEventValidation;