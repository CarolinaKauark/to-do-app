import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import TaskService from '../services/task.service';
import Task from '../database/models/Task';
import authorizationToken from '../middleware/auth.middleware';
import taskValidate from '../middleware/task.middleware';


const taskRouter = Router();
const taskService = new TaskService(Task)
const taskController = new TaskController(taskService)

taskRouter.post('/', authorizationToken, taskValidate, taskController.insertTask);
taskRouter.get('/', authorizationToken, taskController.getTasksByUserId)

export default taskRouter;