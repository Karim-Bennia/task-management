import React, { useState } from 'react';
import { Task as TaskType } from '@/interfaces/task'; // Import TaskType

interface TaskModalProps {
  task: TaskType; // Use TaskType here
  onClose: () => void;
  onSave: (updatedTask: TaskType) => void; 
  onDelete: (taskId: string) => void;
}

const Modal: React.FC<TaskModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
      onSave({ ...task, title, description, status: task.status   
   }); 
    onClose();
  };

  return (
    // Modal overlay to block the background and keep focus on modal
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"> {/* Updated modal design */}
        
        {/* Centered modal title with improved font size and weight */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Task</h2> {/* Updated title */}

        {/* Task title input field with better padding and focus ring */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Task description textarea with more vertical space and padding */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}  // Improved height for better readability
          />
        </div>

        {/* Button group aligned properly with space between the elements */}
        <div className="flex justify-between items-center space-x-4">
          
          {/* Delete button with bold red color and hover effect */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            onClick={() => task._id && onDelete(task._id)}
          >
            Delete
          </button>

          {/* Save and Cancel buttons in a button group */}
          <div className="flex space-x-4">
            {/* Cancel button with light gray background */}
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
              onClick={onClose}
            >
              Cancel
            </button>

            {/* Save button with strong primary color */}
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;
