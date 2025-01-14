// validationMiddleware.js
const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.errors});
  }
  
  next();
};

module.exports = validationMiddleware;
