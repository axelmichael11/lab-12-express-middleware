'use strict';

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);


let server;
const app = express();


app.use(require('../route/food-router.js'));

app.use((err, req, res, next) => {
  res.sendStatus(500);
})

const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    server = app.listen(process.env.PORT, () => {
      console.log('server up', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};


serverControl.stop = () => {
  return new Promise((resolve, reject)=> {
    if (server && server.isOn) {
      server.close(() => {
      console.log('server down');
      server.isOn = false;
      resolve();
    })
    return
  }
  reject();
};