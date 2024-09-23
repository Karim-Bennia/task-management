"use client";

import React from 'react';
import TaskColumn from '@/components/taskboard/TaskColumn';
import styles from '@/styles/TaskBoard.module.css';
import { useTasks } from '@/context/TaskContext';
import { Task as TaskType } from '@/interfaces/task';
import { FaSpinner } from 'react-icons/fa'; 
import ProtectedRoute from '@/components/ProtectedRoute'; 

const TaskBoard: React.FC = () => {
  const { tasks, loading, error,addTask ,editTask, removeTask } = useTasks();

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (e: React.DragEvent, newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    const taskId = e.dataTransfer.getData('taskId');
    const taskToUpdate = tasks.find((task: TaskType) => task._id === taskId);

    if (taskToUpdate) {
      editTask(taskId, { ...taskToUpdate, status: newStatus });
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onUpdateTask = (updatedTask: TaskType) => {
    const taskToUpdate = tasks.find((task: TaskType) => task._id === updatedTask._id);
    if (taskToUpdate) {
      if (updatedTask._id) {
        editTask(updatedTask._id, { ...updatedTask, status: taskToUpdate.status });
      }
    }
  };

  const onDeleteTask = (taskId: string) => {
    removeTask(taskId);
  };

  const onAddTask = async (newTask: TaskType) => {
    try {
      await addTask(newTask);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const pendingTasks = tasks.filter((task) => task.status === 'Pending');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  if (loading) {
    return (
      <div className={styles.center}>
        <FaSpinner className={styles.spinner} />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.center} ${styles.errorContainer}`}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <ProtectedRoute> {/* Protect the TaskBoard */}
      <div className={styles.boardWrapperImage}>
        <div className={styles.board}>
          <TaskColumn
            title="Pending"
            tasks={pendingTasks}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask} 
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask} 
          />
          <TaskColumn
            title="Completed"
            tasks={completedTasks}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask} 
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TaskBoard;
