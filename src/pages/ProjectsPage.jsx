import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Loader, Plus, RefreshCw, X } from 'lucide-react';
import { getProjects, createProject } from '../lib/nocodeApi';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    progress: 0
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      setError('Failed to load projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
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
    if (!formData.name.trim()) {
      errors.name = 'Project name is required';
    }
    
    if (!formData.status.trim()) {
      errors.status = 'Status is required';
    }
    
    if (!formData.priority.trim()) {
      errors.priority = 'Priority is required';
    }
    
    if (formData.progress < 0 || formData.progress > 100) {
      errors.progress = 'Progress must be between 0 and 100';
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
      await createProject(formData);
      setShowSuccessMessage(true);
      setFormData({
        name: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        progress: 0
      });
      fetchProjects();
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error('Error creating project:', err);
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

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-['Exo_2'] font-bold text-white [text-shadow:0_0_15px_#FE02A1]">
            Project Management
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => fetchProjects()}
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
              {showForm ? 'Cancel' : 'New Project'}
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
            <span>Project created successfully!</span>
          </div>
        )}

        {/* New Project Form */}
        {showForm && (
          <div className="mb-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4">New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-1">
                  Project Name <span className="text-[#FE02A1]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                    formErrors.name 
                      ? 'border-red-500' 
                      : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  placeholder="Enter project name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
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
                  rows={3}
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter project description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Priority <span className="text-[#FE02A1]">*</span>
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.priority 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {formErrors.priority && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.priority}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="progress" className="block text-white mb-1">
                    Progress <span className="text-[#FE02A1]">*</span>
                  </label>
                  <input
                    type="number"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.progress 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                    placeholder="Enter progress (0-100)"
                  />
                  {formErrors.progress && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.progress}</p>
                  )}
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
                    'Create Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
          <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-6">Projects</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-[#FE02A1] animate-spin" />
              <span className="ml-3 text-white">Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <p>No projects found. Create your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Project Name</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Status</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Priority</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Progress</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-white">
                        <div className="font-medium">{project.name}</div>
                        {project.description && (
                          <div className="text-white/60 text-sm mt-1 line-clamp-1">{project.description}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-[#FE02A1] h-2.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-white/60 text-xs">{project.progress}%</div>
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {project.created_at 
                          ? format(new Date(project.created_at), 'MMM d, yyyy')
                          : 'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;