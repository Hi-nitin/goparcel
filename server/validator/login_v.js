// validators.js
const { body } = require('express-validator');

// Validation rules for login
const loginValidationRules = 
   [
    body('email')
      .isEmail().withMessage('Must be a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .trim()
  ];

module.exports =  loginValidationRules;

