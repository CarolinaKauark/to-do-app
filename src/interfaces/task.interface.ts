export interface ITask {
    id?: number;
    description: string;
    startTime: string;
    endTime: string;
    userId: number;
    isHighPriority: boolean;
    inProgress?: boolean;
}

export interface ITaskService {
    insertTask(body: ITask): Promise<string | void>;
    getTasksByUserId(userId: number): Promise<ITask[] | []>;
    updateMatch(task: ITask, id: number): Promise<void>;
}