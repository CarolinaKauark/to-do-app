import Task from "../database/models/Task";
import { ITask, ITaskService } from "../interfaces/task.interface";

class TaskService implements ITaskService {
    constructor(private taskModel = Task){}

    async insertTask(body: ITask): Promise<any> {
        return this.taskModel.create({...body});
    }

    async getTasksByUserId(userId: number): Promise<ITask[] | []> {
        return this.taskModel.findAll({ where: { userId } });
    }

    async updateMatch(task: ITask, id: number): Promise<void> {
        await this.taskModel.update(task, { where: { id } });
    }
}

export default TaskService;