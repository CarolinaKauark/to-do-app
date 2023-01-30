import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import User from '../database/models/User'
import { registerMock, tokenMock, userMock } from './mocks/user.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();


describe('Testing the user route', () => {
  describe('Test "/login" route', () => {

    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(userMock as unknown as User);
      sinon.stub(jwt, 'sign').resolves(tokenMock);
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })
  
    it('test if the login is successful', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/login')
         .send({
          email: 'user@user.com',
          password: "secret_user",
        })
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        token: tokenMock,
      });
    });
  
    it('tests if login is not allowed without email', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/login')
         .send({
          password: "secret_user",
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('tests if login is not allowed without password', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/login')
         .send({
          email: 'user@user.com',
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('tests if login is not allowed with invalid password', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/login')
         .send({
          email: 'user@user.com',
          password: "secret_mock",
        })
  
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });

  describe('Test "/register" route', () => {

    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon
        .stub(User, "create")
        .resolves(userMock.id as unknown as User);
      sinon
        .stub(User, "findOne")
        .resolves(userMock as unknown as User);
      sinon.stub(jwt, 'sign').resolves(tokenMock);
    });
  
    afterEach(()=>{
      (User.create as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })
  
    it('test if the registration is successful', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/register')
         .send({ ...registerMock })
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        token: tokenMock,
      });
    });
  
    it('tests if the registration is not allowed without email', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/register')
         .send({
          firstName: 'User',
          lastName: 'Mock',
          password: 'secret_user',
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('tests if the registration is not allowed without password', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/register')
         .send({
          firstName: 'User',
          lastName: 'Mock',
          email: 'user@user.com',
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('tests if the registration is not allowed with an existing email address', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .post('/user/register')
         .send({
          email: 'user@user.com',
          password: "secret_mock",
        })
  
      expect(chaiHttpResponse.status).to.equal(409);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'This user are already registered',
      });
    });
  });

});
