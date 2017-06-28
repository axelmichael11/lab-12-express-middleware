'use strict';

const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: {type:String, required: true, unique:true},
  bestSpot: {type:String, required: true},
  bestPark: {type:String, required: true},
  bestActivity: {type:String, required: true},
});


module.exports = mongoose.model('city',citySchema);
