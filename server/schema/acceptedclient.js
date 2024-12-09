// models/Delivery.js
const mongoose = require('mongoose');

const acceptedclientschema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
   ref: 'register', // Reference to Customer model
    required: true,
    unique:true

  },
  parceldescription:{
    type:String
  },
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
unique:true,
    required: true,
   ref:'register'
  }
});

const acceptedclient = mongoose.model('acceptedCustomer', acceptedclientschema);

module.exports = acceptedclient;
