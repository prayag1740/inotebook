const {body, validationResult } = require('express-validator')

const userValidationRules = () => {
    return [
        body('email', 'Please enter a valid email').isEmail(),
        body('password').isLength({min : 5}),
        body('name').isLength({min : 5})
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param] : err.msg}))

    return res.status(400).json({errors: extractedErrors})
}

module.exports = {
    userValidationRules,
    validate
}