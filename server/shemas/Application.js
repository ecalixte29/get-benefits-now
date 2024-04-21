import Joi from 'joi';

const commonDetails = Joi.object({
    first_name: Joi.string().required(true),
    last_name: Joi.string().required(true),
    gender: Joi.string().pattern(/male|female/).required(true),
    dob: Joi.date().required(true),
    social_security_number: Joi.number().required(true),
    email: Joi.string().email().required(true),
    phone: Joi.string().required(true),
    uses_tobacco: Joi.bool().required(true)
})

const schema = Joi.object({
    details: Joi.object({
        current_insurance: Joi.string().required(true),
        estimated_income: Joi.string().required(true),
        gross_income: Joi.number().required(true),
        street: Joi.string().required(true),
        city: Joi.string().required(true),
        state: Joi.string().required(true),
        zip: Joi.string().required(true),
        us_national: Joi.bool().required(true),
        recent_employer: Joi.string().required(true),
    }).concat(commonDetails).required(true),
    spouse_details: commonDetails,
    dependents: Joi.array().items(Joi.object({
        relationship: Joi.string().required(true)
    }).concat(commonDetails)),
    type: Joi.string().required(true)
}).required(true)

export default schema