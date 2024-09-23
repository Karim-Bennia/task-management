// src/services/taskService.ts
import axios from 'axios';
import { Task, TaskUpdate } from '@/interfaces/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/tasks';

const getToken = () => {
    return localStorage.getItem('token');
  };
  
export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const token = getToken(); // Get the token
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch tasks');
    }
};

export const createTask = async (task: Task): Promise<Task> => {
    try {
        const token = getToken(); 
        const response = await axios.post(API_URL, task, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create task');
    }
};

export const updateTask = async (taskId: string, updatedTask: TaskUpdate): Promise<Task> => {
    try {
        const token = getToken(); // Get the token
        const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
    } catch (error) {
        const err = error as any;
        console.error('Error updating task:', err.response?.data || err.message);
        throw new Error('Failed to update task');
    }
};

export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const token = getToken(); // Get the token
        const response = await axios.delete(`${API_URL}/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete task');
    }
};
