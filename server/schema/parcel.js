const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'register'
  },
  parcelDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;
