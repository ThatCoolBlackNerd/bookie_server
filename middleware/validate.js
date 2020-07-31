const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

module.exports = {
    
    validateUser(user) {
        const complexityOptions = {
            min: 5,
            max: 50,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1
        }

        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: passwordComplexity(complexityOptions).required()
        });

        return schema.validate(user)
    },
    validateWager(wager) {
        const schema = Joi.object({
            bet: Joi.string().min(3).required(),
            bet_type: Joi.string().valid('Money', 'Food', 'Other').required(),
            stakes: Joi.string().min(5).required(),
            opponent: Joi.string().min(3).max(30).required(),
        })

        return schema.validate(wager)
    }
}