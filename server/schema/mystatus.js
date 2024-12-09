// models/MyStatus.js
const mongoose = require('mongoose');

const mystatusSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register', // Reference to Customer model
    required: true,
  },
  
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register', // Reference to Delivery model
    required: true,
  },

  parcelDescription: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String
  },

  status: {
    type: String,
    default: 'pending', // Default value set to 'pending'
  },
});

const MyStatus = mongoose.model('MyStatus', mystatusSchema);

module.exports = MyStatus;
