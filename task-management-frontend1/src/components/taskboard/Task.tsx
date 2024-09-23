import React, { useState } from 'react';
import styles from '@/styles/TaskBoard.module.css';
import Modal from '@/components/taskboard/Modal'; 
import { Task as TaskType } from '@/interfaces/task'; // I Use Task interface
import { FaBars } from 'react-icons/fa'; // Import the menu icon


interface TaskProps {
  task:TaskType;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onUpdateTask: (updatedTask: TaskType) => void; // Expect TaskType for updating
  onDeleteTask: (taskId: string) => void;

}

const Task: React.FC<TaskProps> = ({ task, onDragStart , onUpdateTask, onDeleteTask}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (updatedTask: TaskType) => {
      onUpdateTask(updatedTask); 
      setIsModalOpen(false); // Close modal after saving
    };
  
    
  
    const handleDelete = () => {
      if (task._id) {
        onDeleteTask(task._id);
      }
    };
  
  
    return (
        <>
    <div
      className={styles.taskCard}
      draggable="true" 
      onDragStart={(e) => task._id && onDragStart(e, task._id)}
      onClick={() => setIsModalOpen(true)} 
    >
      <h4 className={styles.taskTitle}>{task.title}</h4>
      <FaBars className={styles.icon} /> {/* Add the icon to the right */}

     { /* <p>{task.description}</p> */}   
     </div>
           {isModalOpen && (
            <Modal
              task={task} // Pass the entire task object here
              onClose={() => setIsModalOpen(false)}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          )}
    </>
  );
};

export default Task;
