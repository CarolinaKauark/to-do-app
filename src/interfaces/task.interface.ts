export interface ITask {
    id?: number;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    userId: number;
    isHighPriority: boolean;
    inProgress?: boolean;
}

export interface ITaskService {
    insertTask(body: ITask): Promise<string | void>;
    getTasksByUserId(userId: number): Promise<ITask[] | []>;
    updateTask(task: ITask, id: number, userId: number): Promise<void>;
    deleteCompletedTask(userId: number): Promise<void> ;
}