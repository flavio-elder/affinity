const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../app');
const getDistanceFromLatLonInKm = require('../utils');

chai.use(chaiHttp);

describe('GET /api', () => {
  it('should get this json object { "it" : "works" }', (done) => {
    chai.request(server)
    .get('/api')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.it).to.eql('works');
      done();
    });
  });
});
