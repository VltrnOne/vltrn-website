import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  AlertCircle, 
  CheckCircle, 
  Download, 
  File, 
  FileText, 
  Filter, 
  Image, 
  Loader, 
  Music, 
  Plus, 
  RefreshCw, 
  Video, 
  X 
} from 'lucide-react';
import { getResources, createResource } from '../lib/nocodeApi';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: '',
    category: '',
    type: 'document',
    author_name: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch resources
  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getResources();
      setResources(data || []);
    } catch (err) {
      setError('Failed to load resources. Please try again.');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchResources();
  }, []);

  // Extract unique categories and types for filters
  const categories = ['all', ...new Set(resources.map(r => r.category).filter(Boolean))];
  const types = ['all', ...new Set(resources.map(r => r.type).filter(Boolean))];

  // Apply filters
  const filteredResources = resources.filter(resource => {
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    return matchesCategory && matchesType;
  });

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
      errors.title = 'Title is required';
    }
    
    if (!formData.file_url.trim()) {
      errors.file_url = 'File URL is required';
    } else if (!isValidUrl(formData.file_url)) {
      errors.file_url = 'Please enter a valid URL';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    
    if (!formData.type.trim()) {
      errors.type = 'Type is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    try {
      await createResource(formData);
      setShowSuccessMessage(true);
      setFormData({
        title: '',
        description: '',
        file_url: '',
        category: '',
        type: 'document',
        author_name: ''
      });
      fetchResources();
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to create resource. Please try again.');
      console.error('Error creating resource:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Get icon for file type
  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-red-400" />;
      case 'audio':
        return <Music className="w-6 h-6 text-yellow-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  // Handle download
  const handleDownload = (url, title) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-['Exo_2'] font-bold text-white [text-shadow:0_0_15px_#FE02A1]">
            Resource Library
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => fetchResources()}
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
              {showForm ? 'Cancel' : 'New Resource'}
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
            <span>Resource created successfully!</span>
          </div>
        )}

        {/* New Resource Form */}
        {showForm && (
          <div className="mb-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4">New Resource</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-white mb-1">
                  Title <span className="text-[#FE02A1]">*</span>
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
                  placeholder="Enter resource title"
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
                  placeholder="Enter resource description"
                />
              </div>

              <div>
                <label htmlFor="file_url" className="block text-white mb-1">
                  File URL <span className="text-[#FE02A1]">*</span>
                </label>
                <input
                  type="text"
                  id="file_url"
                  name="file_url"
                  value={formData.file_url}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                    formErrors.file_url 
                      ? 'border-red-500' 
                      : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  placeholder="https://example.com/file.pdf"
                />
                {formErrors.file_url && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.file_url}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="block text-white mb-1">
                    Category <span className="text-[#FE02A1]">*</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.category 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                    placeholder="E.g., Marketing, Legal, etc."
                  />
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-white mb-1">
                    File Type <span className="text-[#FE02A1]">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                      formErrors.type 
                        ? 'border-red-500' 
                        : 'border-[rgba(255,255,255,0.1)]'
                    } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  >
                    <option value="document">Document</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.type && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.type}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="author_name" className="block text-white mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="author_name"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300"
                    placeholder="Enter author name"
                  />
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
                    'Upload Resource'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/60" />
            <span className="text-white/60">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white text-sm focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white text-sm focus:border-[#FE02A1] transition-colors duration-300"
            >
              <option value="all">All Types</option>
              {types.filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-8">
          {loading ? (
            <div className="flex justify-center items-center py-12 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl">
              <Loader className="w-8 h-8 text-[#FE02A1] animate-spin" />
              <span className="ml-3 text-white">Loading resources...</span>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 text-white/60 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl">
              <p>No resources found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 hover:border-[#FE02A1] transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.1)]">
                      {getFileIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white line-clamp-1">{resource.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {resource.category && (
                          <span className="text-xs bg-[rgba(255,255,255,0.1)] text-white/80 px-2 py-0.5 rounded-full">
                            {resource.category}
                          </span>
                        )}
                        {resource.type && (
                          <span className="text-xs bg-[rgba(255,255,255,0.1)] text-white/80 px-2 py-0.5 rounded-full">
                            {resource.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {resource.description && (
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{resource.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">
                      {resource.created_at && format(new Date(resource.created_at), 'MMM d, yyyy')}
                      {resource.author_name && <span className="ml-1">by {resource.author_name}</span>}
                    </div>
                    <button
                      onClick={() => handleDownload(resource.file_url, resource.title)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(254,2,161,0.1)] hover:bg-[#FE02A1] border border-[rgba(254,2,161,0.3)] rounded-lg text-white text-sm hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;