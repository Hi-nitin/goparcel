
const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    userId:String,
    latitude: Number,
    longitude: Number,
});

const Location = mongoose.model('Location', locationSchema);
module.exports=Location;