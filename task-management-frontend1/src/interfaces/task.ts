export interface Task {
    _id?: string; 
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed'; 
    dueDate: string; 
}

export interface TaskResponse {
    tasks: Task[];
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    status?: 'Pending' | 'In Progress' | 'Completed';
}

export interface TaskSummary {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    inprogressTasks: number;
  }
  
