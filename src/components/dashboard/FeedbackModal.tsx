import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Feedback submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 w-full max-w-lg animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#FE02A1] transition-colors duration-200"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-['Exo_2'] font-bold text-white mb-6">Submit Feedback</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[#E0E0E0] font-montserrat mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-[#E0E0E0] font-montserrat mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="comments" className="block text-[#E0E0E0] font-montserrat mb-2">
              Comments
            </label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200 min-h-[120px]"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#FE02A1] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;