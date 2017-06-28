City'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Food = require('../model/city.js');

let cityRouter = module.exports = new Router();

cityRouter.post('/api/cities', jsonParser, (req, res, next) => {
  // console.log('req.body^^^^^^',req.body);
  // console.log(req.body.type);
  if (req.body.type===undefined){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    // res.end();
    return;
  }


  req.body.timeStamp = new Date();
  // console.log('this is req.body!!!!',req.body);
  new City(req.body)
  .save()
  .then(food => {
    res.json(City);
    // console.log('this is the City.type ...',City.type);
  })
  .catch(next);
});

cityRouter.get('/api/cities/:id', (req, res, next) => {
  // console.log('hit get /api/cities/:id');
  // console.log(req.params.id);
  if(!req.params.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    // res.end();
    return;
  }
  // console.log('req.params...',req.params);
  Food.findById(req.params.id)
  .then(food => {
    res.json(food);
    // console.log(food);
  })
  .catch(next);
  // console.log(next);
});

cityRouter.put('/api/cities/:id', jsonParser, (req, res, next) => {
  // console.log('hit put /api/cities/:id');
  // console.log('req.params in the put request',req.params);
  if(!req.params.id) {
    res.writeHead(400,{
      'Content-Type':'plain/text',
    });
    res.write('body not found');
    return;
  }

  Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(food => res.json(food))
  .catch(next);
});


cityRouter.delete('/api/cities/:id', (req, res, next) => {
  if(!req.params.id) {
    res.writeHead(400,{
      'Content-Type':'plain/text',
    });
    res.write('body not found');
    return;
  }
  Food.findByIdAndRemove(req.params.id)
  .then(()=> res.sendStatus(204))
  .catch(next);


});
