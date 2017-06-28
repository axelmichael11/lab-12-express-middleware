'use strict';

const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: {type:String, required: true, unique:true},
  population: {type:String, required: true},
  isItCool: {type:String, required: true},
});


module.exports = mongoose.model('city',citySchema);
