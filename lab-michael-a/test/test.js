'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempCity;

describe('testing food routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/cities',() => {
    it('should respond with a city', () => {
      return superagent.post(`${API_URL}/api/cities`)
      .send({name:'Seattle', bestSpot:'loredos', bestPark:'gasworks', bestActivity:'camping'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Seattle');
        expect(res.body.bestSpot).toEqual('Loredos');
        expect(res.body.bestPark).toExist();
        tempCity = res.body;
      });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/foods`)
      .catch(res => {
        // console.log('res status^^^^^^^^^^',res.status);
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/foods', () => {
    it('should respond with a food', () => {
      return superagent.get(`${API_URL}/api/foods/${tempCity._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCity._id);
        expect(res.body.description).toEqual('breads are so good');
        expect(res.body.timeStamp).toEqual(tempCity.timeStamp);
      });
    });

    it('should respond with a 400 bad request', () => {
      return superagent.get(`${API_URL}/api/foods/${tempCity._id}`)
      .send({})
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
    });
  });
  describe('testing PUT /api/food', () => {
    it('should respond with updating food information...', () => {
      return superagent.put(`${API_URL}/api/foods/${tempCity._id}`)
      .send({description: 'celery is pretty healthy', type: 'celery'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCity._id);
        expect(res.body.description).toEqual('celery is pretty healthy');
      });
    });

    it('should respond with a 400 bad request', () => {
      return superagent.put(`${API_URL}/api/foods/${tempCity._id}`)
      .send({})
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
    });
  });
  describe('test DELETE /api/food', () => {
    it('should delete our tempCity...', () => {
      return superagent.delete(`${API_URL}/api/foods/${tempCity._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
        // expect(res.body).toEqual({});
        console.log('im in the delete test');
      });
    });
  });
});
