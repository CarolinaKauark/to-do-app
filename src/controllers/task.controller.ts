import { RequestHandler } from "express";
import { ITaskService } from "src/interfaces/task.interface";

class TaskController {
  constructor(private taskService: ITaskService) {}

  insertTask: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req;
      const { userId } = req.headers;
      const newTask = await this.taskService.insertTask({ ...body, userId });

      return res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  getTasksByUserId: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers;
      const tasks = await this.taskService.getTasksByUserId(Number(userId));

      return res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;