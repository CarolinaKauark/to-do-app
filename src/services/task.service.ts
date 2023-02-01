import { StatusCodes } from "http-status-codes";
import ErrorGenerate from "../helpers/errorGenerate";
import Task from "../database/models/Task";
import { ITask, ITaskService } from "../interfaces/task.interface";

class TaskService implements ITaskService {
    constructor(private taskModel = Task){}

    async insertTask(body: ITask): Promise<any> {
        return this.taskModel.create({...body});
    }

    async getTasksByUserId(userId: number): Promise<ITask[] | []> {
        return this.taskModel.findAll({ 
            where: { userId },
            order: [
                ['isHighPriority', 'DESC']
            ] 
        });
    }

    async updateTask(task: ITask, id: number, userId: number): Promise<void> {
        const oldTask = await this.taskModel.findByPk(id);
        if(!oldTask) throw new ErrorGenerate('There is no task with such id!', StatusCodes.NOT_FOUND);
        console.log(oldTask.userId, userId);
        
        if(oldTask?.userId !== userId) {
            throw new ErrorGenerate('This task does not belong to this user', StatusCodes.CONFLICT);
        }

        await this.taskModel.update(task, { where: { id } });
    }

    async deleteCompletedTask(userId: number): Promise<void> {
        await this.taskModel.destroy({ where: { userId, inProgress: false } })
    }
}

export default TaskService;