import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-3 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] ${
        task.status === 'done' ? 'bg-green-100 line-through text-gray-500' : 'bg-white'
      }`}
    >
      <span className="font-medium">{task.title}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className="px-3 py-1 text-sm border-2 border-black bg-blue-400 text-white rounded shadow-[2px_2px_0px_0px_#000] hover:bg-blue-500"
        >
          Toggle
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-sm border-2 border-black bg-red-400 text-white rounded shadow-[2px_2px_0px_0px_#000] hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
