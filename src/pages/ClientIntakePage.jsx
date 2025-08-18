import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Loader, Plus, RefreshCw, X } from 'lucide-react';
import { getClientIntakes, createClientIntake } from '../lib/nocodeApi';

const ClientIntakePage = () => {
  const [clientIntakes, setClientIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    status: 'pending',
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch client intakes
  const fetchClientIntakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClientIntakes();
      setClientIntakes(data || []);
    } catch (err) {
      setError('Failed to load client intakes. Please try again.');
      console.error('Error fetching client intakes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchClientIntakes();
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
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.status.trim()) {
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
      await createClientIntake(formData);
      setShowSuccessMessage(true);
      setFormData({
        full_name: '',
        email: '',
        status: 'pending',
      });
      fetchClientIntakes();
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError('Failed to create client intake. Please try again.');
      console.error('Error creating client intake:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-['Exo_2'] font-bold text-white [text-shadow:0_0_15px_#FE02A1]">
            Client Intake Management
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => fetchClientIntakes()}
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
              {showForm ? 'Cancel' : 'New Intake'}
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
            <span>Client intake created successfully!</span>
          </div>
        )}

        {/* New Client Intake Form */}
        {showForm && (
          <div className="mb-8 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
            <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4">New Client Intake</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-white mb-1">
                  Full Name <span className="text-[#FE02A1]">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                    formErrors.full_name 
                      ? 'border-red-500' 
                      : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  placeholder="Enter full name"
                />
                {formErrors.full_name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.full_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-1">
                  Email <span className="text-[#FE02A1]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border ${
                    formErrors.email 
                      ? 'border-red-500' 
                      : 'border-[rgba(255,255,255,0.1)]'
                  } rounded-lg text-white focus:border-[#FE02A1] transition-colors duration-300`}
                  placeholder="Enter email address"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

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
                  <option value="rejected">Rejected</option>
                </select>
                {formErrors.status && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.status}</p>
                )}
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
                    'Create Client Intake'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Client Intakes List */}
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6">
          <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-6">Client Intakes</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 text-[#FE02A1] animate-spin" />
              <span className="ml-3 text-white">Loading client intakes...</span>
            </div>
          ) : clientIntakes.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <p>No client intakes found. Create your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Full Name</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Email</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Status</th>
                    <th className="text-left py-3 px-4 text-white/60 font-normal">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {clientIntakes.map((intake) => (
                    <tr 
                      key={intake.id} 
                      className="border-b border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-white">{intake.full_name}</td>
                      <td className="py-4 px-4 text-white">{intake.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          intake.status === 'pending' 
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : intake.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-300'
                            : intake.status === 'completed'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {intake.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {intake.created_at 
                          ? format(new Date(intake.created_at), 'MMM d, yyyy h:mm a')
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

export default ClientIntakePage;