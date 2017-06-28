'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const City = require('../model/city.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempCity;

describe('testing city routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/cities',() => {
    // after(() => City.remove({}));

    let CityData = {
      name: 'Seattle',
      bestSpot: 'loredos',
      bestPark: 'gasworks',
      bestActivity: 'camping',
    };

    it('should respond with a city', () => {
      return superagent.post(`${API_URL}/api/cities`)
      .send(CityData)
      .then(res => {
        // console.log('res.status^^^',res.status);
        // console.log((!res.body._id),'there is an id??');
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        // console.log('res.body.name^^^^',res.body.name);
        expect(res.body.name).toEqual('Seattle');
        expect(res.body.bestSpot).toEqual('loredos');
        tempCity = res.body;
      });
    });


    it('should respond with a 400... because it has no body', () => {
      return superagent.post(`${API_URL}/api/cities`)
      .catch(res => {
        // console.log('res status^^^^^^^^^^',res.status);
        expect(res.status).toEqual(400);
      });
    });


    it('should be a 409 becuase it has the same name property twice..', ()=>{
      return superagent.post(`${API_URL}/api/cities`)
      .send(CityData)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/cities', () => {

    it('should respond with a city', () => {
      return superagent.get(`${API_URL}/api/cities/${tempCity._id}`)
      .then(res => {
        // console.log('res.^^^^',res.body);
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCity._id);
        expect(res.body.name).toEqual(tempCity.name);
        // expect(res.body.bestSpot).toEqual(tempCity.bestSpot);
      });
    });

    it('should respond with a 404', () => {
      return superagent.get(`${API_URL}/api/cities/id:suhhdude`)
      .catch((err) => {

        expect(err.status).toEqual(404);
      });
    });
  });


  describe('testing PUT /api/cities', () => {

    //there are problems with this part, not quite sure how to approach it...
    afterEach(() => City.remove({}));
    beforeEach(() => {
      return new City({
        name: 'Seattle',
        bestSpot: 'loredos',
        bestPark: 'gasworks',
        bestActivity: 'camping',
      })
      .save()
      .then(city => {
        tempCity = city;
        console.log(tempCity);
      });
    });

    it('should respond with updating city content information...', () => {
      return superagent.put(`${API_URL}/api/cities/${tempCity._id}`)
      .send({content:'updated'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCity._id);
        expect(res.body.name).toEqual(tempCity.name);
        expect(res.body.content).toEqual('updated');
      });
    });

    it('should respond with a 400 bad request', () => {
      return superagent.put(`${API_URL}/api/cities/${tempCity._id}`)
      .send({})
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
    });
  });
  describe('test DELETE /api/cities', () => {
    it('should delete our tempCity...', () => {
      return superagent.delete(`${API_URL}/api/cities/${tempCity._id}`)
      .catch(err => {
        expect(err.status).toEqual(204);
        // expect(err.body).toEqual({});
        console.log('im in the delete test');
      });
    });

    it('should be a bad request, 404', () => {
      return superagent.delete(`${API_URL}/api/cities/yeahhhhnooo`)
      .catch(err => {
        expect(err.status).toEqual(404);
        // expect(err.body).toEqual({});
        console.log('im in the delete test');
      });
    });
  });
});
