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

  describe('Test get "/task" route', () => {

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
  });

  describe('Test post "/task" route', () => {

    afterEach(()=>{
      (Task.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })

    it('tests if it is possible to add tasks in the post /task route', async () => {
      sinon
          .stub(Task, "create")
          .resolves(tasks[0] as ITask | any);
      sinon
          .stub(jwt, 'verify').resolves({ id: 2 });
      const chaiHttpResponse = await chai
         .request(app)
         .post('/task')
         .set('Authorization', tokenMock)
         .send({
          description: "new task",
          startTime: "2015-05-28T16:00:00.000Z",
          endTime: "2015-05-29T00:00:00.000Z",
          isHighPriority: true,
          inProgress: true
        })
    
      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(tasks[0]);
    });

    it('tests whether it is not possible to add tasks in the post /task route without the startTime', async () => {
      sinon
          .stub(Task, "create")
          .resolves(tasks[0] as ITask | any);
      sinon
          .stub(jwt, 'verify').resolves({ id: 2 });
      const chaiHttpResponse = await chai
         .request(app)
         .post('/task')
         .set('Authorization', tokenMock)
         .send({
          description: "new task",
          endTime: "2015-05-29T00:00:00.000Z",
          isHighPriority: true,
          inProgress: true
        })
    
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });

    it('test if the error generator is called without the token', async () => {
      sinon
          .stub(Task, "create")
          .resolves(tasks[0] as ITask | any);
      sinon
          .stub(jwt, 'verify').resolves({ id: 2 });
      const chaiHttpResponse = await chai
         .request(app)
         .post('/task')
         .set('Authorization', '')
         .send({
          description: "new task",
          startTime: "2015-05-28T16:00:00.000Z",
          endTime: "2015-05-29T00:00:00.000Z",
          isHighPriority: true,
          inProgress: true
        })
    
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({message: 'Token not found'});
    });
  });

  describe('Test patch "/task" route', () => {

    beforeEach(() => {
      sinon.stub(jwt, 'verify').callsFake(() => {
        return userMock;
      });
    })

    afterEach(() => {
      (Task.update as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
      (Task.findByPk as sinon.SinonStub).restore();
    });

    it('testa se o update na rota patch /task/1 é feito', async () => {
      sinon
        .stub(Task, "update")
        .resolves([1] as any);
      sinon
        .stub(Task, "findByPk")
        .resolves(tasks[0] as ITask | any);

      const chaiHttpResponse = await chai
         .request(app)
         .patch('/task/1')
         .set('Authorization', tokenMock)
         .send({
          description: "my other new task",
          startTime: "2015-05-28T16:00:00.000Z",
          endTime: "2015-05-29T00:00:00.000Z",
          isHighPriority: true,
          inProgress: true
         })
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match is updated' });
    });    
  });
});
