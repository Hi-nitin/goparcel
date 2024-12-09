// models/Delivery.js
const mongoose = require('mongoose');

const receiver_location_detail_schema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register', // Reference to Customer model
    required: true,
    unique: true
  },

  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'register'
  },

  receiverName: {
    type: String
  },
  receiverContact: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  parcelDescription: {
    type: String
  },
  status: {
    type: String,
    default: 'pending' // Set default value to 'pending'
  }
});

const ReceiverLocationDetail = mongoose.model('ReceiverDetail', receiver_location_detail_schema);

module.exports = ReceiverLocationDetail;
