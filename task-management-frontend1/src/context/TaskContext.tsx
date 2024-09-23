'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task } from '@/interfaces/task';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/services/taskService';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => Promise<void>;
  editTask: (taskId: string, updatedTask: Task) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();  

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      console.log('fetchedTasks', fetchedTasks);
      setTasks(fetchedTasks);
    } catch (err) {
    
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: Omit<Task, '_id'>) => {
    console.log('Payload being sent:', newTask); 

    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const editTask = async (taskId: string, updatedTask: Task) => {
    try {
      const updated = await updateTask(taskId, updatedTask);
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? updated : task)));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  

  useEffect(() => {
    if (isAuthenticated) {  // Only fetch tasks if the user is authenticated
      loadTasks();
    }
  }, [isAuthenticated]);


  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask, loading, error }}>
      {children}
      
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
