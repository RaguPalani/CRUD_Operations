import React from 'react';
import { Edit, Trash2, Calendar, Flag } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleStatusChange = async (newStatus) => {
    await onUpdate({ ...task, status: newStatus });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-600 mb-4">{task.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
          <div className="flex items-center space-x-1">
            <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
            <span className="text-sm text-gray-600 capitalize">{task.priority}</span>
          </div>
        </div>

        {task.dueDate && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}

        <div className="flex space-x-2">
          {task.status !== 'pending' && (
            <button
              onClick={() => handleStatusChange('pending')}
              className="flex-1 bg-gray-100 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              Mark Pending
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="flex-1 bg-yellow-100 text-yellow-700 py-1 px-3 rounded text-sm hover:bg-yellow-200 transition-colors"
            >
              Start Progress
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 bg-green-100 text-green-700 py-1 px-3 rounded text-sm hover:bg-green-200 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;