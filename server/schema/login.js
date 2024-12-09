// UserModel.js
const mongoose = require('mongoose');

// Define the schema for login data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
