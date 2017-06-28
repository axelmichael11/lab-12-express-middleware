'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const City = require('../model/city.js');

let cityRouter = module.exports = new Router();

cityRouter.post('/api/cities', jsonParser, (req, res, next) => {
  // console.log('req.body^^^^^^',req.body);
  // console.log(req.body.type);
  // console.log('this is req.body!!!!',req.body);
  new City(req.body)
  .save()
  .then(City => res.json(City))
  .catch(next);
});

cityRouter.get('/api/cities/:id', (req, res, next) => {
  // console.log('hit get /api/cities/:id');
  // console.log(req.params.id);
  // console.log('req.status',req.status);
  City.findById(req.params.id)
  .then(city => {
    res.json(city);
    // console.log('this is the city data',city);
  })
  .catch(next);
});

cityRouter.put('/api/cities/:id', jsonParser, (req, res, next) => {
  console.log('hit put /api/cities/:id');
  console.log('req.params in the put request',req.params);
  let options = {
    runValidators: true,
    new: true,
  };
//I noticed in class we used a cool runValidators key for the findByIdAndUpdate method... not sure if it needs to be included...
  City.findByIdAndUpdate(req.params.id, req.body, options)
  .then(city => res.json(city))
  .catch(next);
});


cityRouter.delete('/api/cities/:id', (req, res, next) => {

  City.findByIdAndRemove(req.params.id)
  .then(()=> res.sendStatus(204))
  .catch(next);


});
