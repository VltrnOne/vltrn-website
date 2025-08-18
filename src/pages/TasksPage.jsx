import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock, Loader, Plus, RefreshCw, X } from 'lucide-react';
import { getTasks, getProjects, createTask } from '../lib/nocodeApi';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    status: 'pending',
    priority: 'medium',
    due_date: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Group tasks by project
  const groupedTasks = tasks.reduce((acc, task) => {
    const projectId = task.project_id || 'uncategorized';
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(task);
    return acc;
  }, {});

  // Fetch tasks and projects
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch tasks and projects in parallel
      const [tasksData, projectsData] = await Promise.all([
        getTasks(),
        getProjects()
      ]);
      
      setTasks(tasksData || []);
      setProjects(projectsData || []);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Task title is required';
    }
    
    if (!formData.project_id) {
      errors.project_id = 'Project is required';
    }
    
    if (!formData.status) {
      errors.status = 'Status is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    try {
      await createTask(formData);
      setShowSuccessMessage(true);
      setFormData({
        title: '',
        description: '',
        project_id: '',
        status: 'pending',
        priority: 'medium',
        due_date: ''
      });
      fetchData();
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'low':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Get project name by ID
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Uncategorized';
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-['Exo_2'] font-bold text-white [text-shadow:0_0_15px_#FE02A1]">
            Task Management
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => fetchData()}
              className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.1)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'New Task'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)} 
              className="ml-auto text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Task created successfully!</span>
          </div>
        )}

        {/* New Task Form */}
        {showForm && (
          <div className="mb-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-white mb-1">
                  Task Title <span className="text-[#FE02A1]">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                    formErrors.title 
                      ? 'border-red-500' 
                      : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  placeholder="Enter task title"
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-white mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project_id" className="block text-white mb-1">
                    Project <span className="text-[#FE02A1]">*</span>
                  </label>
                  <select
                    id="project_id"
                    name="project_id"
                    value={formData.project_id}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.project_id 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                  {formErrors.project_id && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.project_id}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="due_date" className="block text-white mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-white mb-1">
                    Status <span className="text-[#FE02A1]">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.status 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {formErrors.status && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.status}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="priority" className="block text-white mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-[#FE02A1] rounded-lg text-white hover:shadow-[0_0_20px_#FE02A1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Create Task'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List Grouped by Project */}
        <div className="space-y-8">
          {loading ? (
            <div className="flex justify-center items-center py-12 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl">
              <Loader className="w-8 h-8 text-[#FE02A1] animate-spin" />
              <span className="ml-3 text-white">Loading tasks...</span>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 text-white/60 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl">
              <p>No tasks found. Create your first one!</p>
            </div>
          ) : (
            Object.keys(groupedTasks).map((projectId) => (
              <div 
                key={projectId}
                className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6"
              >
                <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-6">
                  {projectId === 'uncategorized' ? 'Uncategorized Tasks' : getProjectName(projectId)}
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.1)]">
                        <th className="text-left py-3 px-4 text-white/60 font-normal">Task</th>
                        <th className="text-left py-3 px-4 text-white/60 font-normal">Status</th>
                        <th className="text-left py-3 px-4 text-white/60 font-normal">Priority</th>
                        <th className="text-left py-3 px-4 text-white/60 font-normal">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedTasks[projectId].map((task) => (
                        <tr 
                          key={task.id} 
                          className="border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
                        >
                          <td className="py-4 px-4 text-white">
                            <div className="font-medium">{task.title}</div>
                            {task.description && (
                              <div className="text-white/60 text-sm mt-1 line-clamp-1">{task.description}</div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {task.due_date ? (
                              <div className="flex items-center gap-1 text-white/80">
                                <Clock className="w-4 h-4" />
                                <span>{format(new Date(task.due_date), 'MMM d, yyyy')}</span>
                              </div>
                            ) : (
                              <span className="text-white/40">No due date</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;