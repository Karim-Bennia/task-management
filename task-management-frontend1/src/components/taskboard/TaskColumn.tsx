import React, { useState } from 'react';
import Task from './Task';
import styles from '@/styles/TaskBoard.module.css';
import { Task as TaskType } from '@/interfaces/task'; 
import { FaPlusCircle } from 'react-icons/fa'; 
import ModalAddTask from '@/components/taskboard/ModalAddTask'; 

interface TaskColumnProps {
  title: 'Pending' | 'In Progress' | 'Completed'; 
  tasks: TaskType[]; 
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDrop: (e: React.DragEvent, newStatus: 'Pending' | 'In Progress' | 'Completed') => void; 
  onDragOver: (e: React.DragEvent) => void;
  onUpdateTask: (updatedTask: TaskType) => void; 
  onDeleteTask: (taskId: string) => void;
  onAddTask: (newTask: Omit<TaskType, '_id'>) => void;

}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onDragStart, onDrop, onDragOver ,onUpdateTask,
    onDeleteTask,onAddTask }) => {
      const [isModalOpen, setIsModalOpen] = useState(false); 

    const getStatusDotClass = (title: string) => {
        switch (title) {
          case 'Pending':
            return styles.pendingDot;
          case 'In Progress':
            return styles.inProgressDot;
          case 'Completed':
            return styles.completedDot;
          default:
            return '';
        }
      };

      const handleAddTask = (newTask: Omit<TaskType, '_id'>) => {
        onAddTask(newTask);
        setIsModalOpen(false); 
      };
        
  return (
    <div
      className={styles.column}
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle}>
          <span className={`${styles.statusDot} ${getStatusDotClass(title)}`} />
          {title}
        </h3>
        <FaPlusCircle className={styles.addTaskIcon} onClick={() => setIsModalOpen(true)} />
      </div>

      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <Task key={task._id} task={task} onDragStart={onDragStart}             
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          
           />
        ))}
      </div>
      {isModalOpen && <ModalAddTask status={title} onClose={() => setIsModalOpen(false)} onSave={handleAddTask} />}


    </div>
  );
};

export default TaskColumn;
