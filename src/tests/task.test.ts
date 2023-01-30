import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Response } from 'superagent';
import Task from '../database/models/Task';
import { tasks } from './mocks/task.mock';
import { ITask } from '../interfaces/task.interface';
import { tokenMock, userMock } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();


describe('Testing the task route', () => {

  describe('Test "/tasks" route', () => {

    let chaiHttpResponse: Response;
  
    afterEach(()=>{
      (Task.findAll as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })
  
    it('tests if all tasks in the get /tasks route are returned', async () => {
      sinon
          .stub(Task, "findAll")
          .resolves(tasks as ITask[] | any);
      sinon.stub(jwt, 'verify').resolves(userMock);

      const chaiHttpResponse = await chai
         .request(app)
         .get('/task')
         .set('Authorization', tokenMock);
         
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(tasks);
    });
  //   it('testa se os matches apenas os true na rota get /matches é retornado', async () => {
  //     sinon
  //         .stub(Match, "findAll")
  //         .resolves(matchTrue as IMatch[] | any);
  //     const chaiHttpResponse = await chai
  //        .request(app)
  //        .get('/matches?inProgress=true')
  
  //     expect(chaiHttpResponse.status).to.equal(200);
  //     expect(chaiHttpResponse.body).to.deep.equal(matchTrue);
  //   });
  
  //   it('testa se os matches apenas os false na rota get /matches é retornado', async () => {
  //     sinon
  //         .stub(Match, "findAll")
  //         .resolves(matchFalse as IMatch[] | any);
  //     const chaiHttpResponse = await chai
  //        .request(app)
  //        .get('/matches?inProgress=false')
  
  //     expect(chaiHttpResponse.status).to.equal(200);
  //     expect(chaiHttpResponse.body).to.deep.equal(matchFalse);
  //   });
  
  // });

  // describe('Testa a rota post /matches', () => {

  //   afterEach(()=>{
  //     (Match.create as sinon.SinonStub).restore();
  //     (jwt.verify as sinon.SinonStub).restore();
  //   })

  //   it('testa se é possível adicionar matches na rota post /matches', async () => {
  //     sinon
  //         .stub(Match, "create")
  //         .resolves(insertMatch as IMatch[] | any);
  //     sinon
  //         .stub(jwt, 'verify').resolves({ id: 1 });
  //     const chaiHttpResponse = await chai
  //        .request(app)
  //        .post('/matches')
  //        .set('Authorization', tokenMock)
  //        .send({
  //         homeTeam: 16,
  //         awayTeam: 8, 
  //         homeTeamGoals: 2,
  //         awayTeamGoals: 2,
  //       })
    
  //     expect(chaiHttpResponse.status).to.equal(201);
  //     expect(chaiHttpResponse.body).to.deep.equal(insertMatch);
  //   });

  //   it('testa se é não possível adicionar matches com os dois times tendo o mesmo id', async () => {
  //     sinon
  //         .stub(Match, "create")
  //         .resolves(insertMatch as IMatch[] | any);
  //     sinon
  //         .stub(jwt, 'verify').resolves({ id: 1 });
  //     const chaiHttpResponse = await chai
  //       .request(app)
  //       .post('/matches')
  //       .set('Authorization', tokenMock)
  //       .send({
  //         homeTeam: 8,
  //         awayTeam: 8, 
  //         homeTeamGoals: 2,
  //         awayTeamGoals: 2,
  //       })
    
  //     expect(chaiHttpResponse.status).to.equal(422);
  //     expect(chaiHttpResponse.body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'});
  //   });

  //   it('testa ao acontecer um erro o throw new error do auth middleware é chamado', async () => {
  //     sinon
  //         .stub(Match, "create")
  //         .resolves(insertMatch as IMatch[] | any);
  //     sinon
  //         .stub(jwt, 'verify').throws();
  //     const chaiHttpResponse = await chai
  //       .request(app)
  //       .post('/matches')
  //       .set('Authorization', tokenMock)
  //       .send({
  //         homeTeam: 8,
  //         awayTeam: 10, 
  //         homeTeamGoals: 2,
  //         awayTeamGoals: 2,
  //       })
    
  //     expect(chaiHttpResponse.status).to.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({message: 'Token must be a valid token'});
  //   });

  //   it('testa se o errorGenerator é chamado sem o token', async () => {
  //     sinon
  //         .stub(Match, "create")
  //         .resolves(insertMatch as IMatch[] | any);
  //     sinon
  //         .stub(jwt, 'verify').throws();
  //     const chaiHttpResponse = await chai
  //       .request(app)
  //       .post('/matches')
  //       .set('Authorization', '')
  //       .send({
  //         homeTeam: 8,
  //         awayTeam: 10, 
  //         homeTeamGoals: 2,
  //         awayTeamGoals: 2,
  //       })
    
  //     expect(chaiHttpResponse.status).to.equal(401);
  //     expect(chaiHttpResponse.body).to.deep.equal({message: 'Token not found'});
  //   });
  // });

  // describe('testa a rota patch /matches', () => {

  //   afterEach(() => {
  //     (Match.update as sinon.SinonStub).restore();
  //   })
  //   it('testa se o update na rota patch /matches/1/finish é feito', async () => {
  //     sinon
  //         .stub(Match, "update")
  //         .resolves([1] as any);
  //     const chaiHttpResponse = await chai
  //        .request(app)
  //        .patch('/matches/1/finish')
  //        .set('Authorization', tokenMock)
  
  //     expect(chaiHttpResponse.status).to.equal(200);
  //     expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  //   });

  //   it('testa se o update na rota patch /matches/1 é feito', async () => {
  //     sinon
  //         .stub(Match, "update")
  //         .resolves([1] as any);
  //     const chaiHttpResponse = await chai
  //        .request(app)
  //        .patch('/matches/1')
  //        .set('Authorization', tokenMock)
  //        .send({
  //         homeTeamGoals: 3,
  //         awayTeamGoals: 1
  //        })
  
  //     expect(chaiHttpResponse.status).to.equal(200);
  //     expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match is updated' });
  //   });    
  });
});
