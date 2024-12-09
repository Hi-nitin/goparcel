const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const signupSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    trim: true,
    lowercase: true, // Converts email to lowercase
    validate: {
      validator: function(v) {
        // Simple regex for validating email format
        return /^([\w-]+(?:\.[\w-]+)*)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  guy: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate phone numbers
    validate: {
      validator: function(v) {
        // Simple regex for validating phone number format
        // This is a basic example, you may need to adjust the regex to fit your needs
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
});

// Create the user model
const Signup = mongoose.model('register', signupSchema);

module.exports = Signup;
