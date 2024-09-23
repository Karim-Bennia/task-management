import React, { useState } from 'react';
import moment from 'moment';
import { Task as TaskType } from '@/interfaces/task'; 

interface ModalAddTaskProps {
    status: 'Pending' | 'In Progress' | 'Completed';  onClose: () => void;
  onSave: (newTask: Omit<TaskType, '_id'>) => void; 
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ status, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    const formattedDueDate = dueDate ? moment(dueDate).format('YYYY-MM-DD') : '';
  
    const newTask = { 
      title, 
      description, 
      dueDate: formattedDueDate, 
      status 
    };

    onSave(newTask); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
        <div className="mb-5">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTask;
