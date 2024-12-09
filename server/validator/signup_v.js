const { body } = require('express-validator');

const registrationValidationRules = [
  body('firstname')
    .isAlpha().withMessage('First name should contain only letters')
    .isLength({ min: 1 }).withMessage('First name is required'),
  body('lastname')
    .isAlpha().withMessage('Last name should contain only letters')
    .isLength({ min: 1 }).withMessage('Last name is required'),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
  body('repassword')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
  body('phone')
    .isMobilePhone().withMessage('Invalid phone number') // Using isMobilePhone for validation
    .notEmpty().withMessage('Phone number is required')
];

module.exports = registrationValidationRules;
