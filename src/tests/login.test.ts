import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import User from '../database/models/User'
import { tokenMock, userMock } from './mocks/user.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando a rota de login', () => {
  describe('Testa a rota "/"', () => {

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
  
    it('testa se o login é feito com sucesso', async () => {
      const chaiHttpResponse = await chai
         .request(App)
         .post('/login')
         .send({
          email: 'user@user.com',
          password: "secret_user",
        })
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        token: tokenMock,
      });
    });
  
    it('testa se não é permitido que o login seja feito sem o email', async () => {
      const chaiHttpResponse = await chai
         .request(App)
         .post('/login')
         .send({
          password: "secret_user",
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('testa se não é permitido que o login seja feito sem o password', async () => {
      const chaiHttpResponse = await chai
         .request(App)
         .post('/login')
         .send({
          email: 'user@user.com',
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('testa se o acesso não é permitido com a senha invalida', async () => {
      const chaiHttpResponse = await chai
         .request(App)
         .post('/login')
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

});
