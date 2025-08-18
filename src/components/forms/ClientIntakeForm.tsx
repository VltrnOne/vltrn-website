import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import PersonalInfo from './steps/PersonalInfo';
import CompanyDetails from './steps/CompanyDetails';
import RolePreferences from './steps/RolePreferences';
import FinancialInfo from './steps/FinancialInfo';
import ProjectGoals from './steps/ProjectGoals';
import LegalCompliance from './steps/LegalCompliance';
import BrandingMarketing from './steps/BrandingMarketing';
import AdditionalPreferences from './steps/AdditionalPreferences';
import AIFormAssistant from '../AIFormAssistant';

interface ClientIntakeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Company Details
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  
  // Role & Preferences
  role: string;
  experience: string;
  preferredContact: string;
  timezone: string;
  
  // Financial Information
  budget: string;
  timeline: string;
  fundingSource: string;
  
  // Project Goals
  projectType: string;
  objectives: string;
  targetAudience: string;
  successMetrics: string;
  
  // Legal & Compliance
  legalRequirements: string[];
  complianceNeeds: string[];
  intellectualProperty: string;
  
  // Branding & Marketing
  brandGuidelines: string;
  marketingStrategy: string;
  targetMarket: string;
  
  // Additional Preferences
  specialRequirements: string;
  preferredTechnologies: string[];
  additionalNotes: string;
}

const steps = [
  { id: 1, title: 'Personal Information', icon: '👤' },
  { id: 2, title: 'Company Details', icon: '🏢' },
  { id: 3, title: 'Role & Preferences', icon: '⚙️' },
  { id: 4, title: 'Financial Information', icon: '💰' },
  { id: 5, title: 'Project Goals', icon: '🎯' },
  { id: 6, title: 'Legal & Compliance', icon: '⚖️' },
  { id: 7, title: 'Branding & Marketing', icon: '🎨' },
  { id: 8, title: 'Additional Preferences', icon: '📝' },
];

const ClientIntakeForm: React.FC<ClientIntakeFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Company Details
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    
    // Role & Preferences
    role: '',
    experience: '',
    preferredContact: '',
    timezone: '',
    
    // Financial Information
    budget: '',
    timeline: '',
    fundingSource: '',
    
    // Project Goals
    projectType: '',
    objectives: '',
    targetAudience: '',
    successMetrics: '',
    
    // Legal & Compliance
    legalRequirements: [],
    complianceNeeds: [],
    intellectualProperty: '',
    
    // Branding & Marketing
    brandGuidelines: '',
    marketingStrategy: '',
    targetMarket: '',
    
    // Additional Preferences
    specialRequirements: '',
    preferredTechnologies: [],
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [aiHelpMessage, setAiHelpMessage] = useState('');

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.phone);
      case 2:
        return !!(formData.companyName && formData.industry);
      case 3:
        return !!(formData.role && formData.experience);
      case 4:
        return !!(formData.budget && formData.timeline);
      case 5:
        return !!(formData.projectType && formData.objectives);
      case 6:
        return true; // Optional step
      case 7:
        return true; // Optional step
      case 8:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Close form after 3 seconds
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setCurrentStep(1);
        setFormData({
          fullName: '', email: '', phone: '', dateOfBirth: '',
          companyName: '', industry: '', companySize: '', website: '',
          role: '', experience: '', preferredContact: '', timezone: '',
          budget: '', timeline: '', fundingSource: '',
          projectType: '', objectives: '', targetAudience: '', successMetrics: '',
          legalRequirements: [], complianceNeeds: [], intellectualProperty: '',
          brandGuidelines: '', marketingStrategy: '', targetMarket: '',
          specialRequirements: '', preferredTechnologies: [], additionalNotes: '',
        });
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISuggestion = (field: string, value: any) => {
    handleInputChange(field as keyof FormData, value);
    setAiHelpMessage(`AI suggestion applied: ${field} has been updated.`);
    setTimeout(() => setAiHelpMessage(''), 3000);
  };

  const handleAIHelp = (message: string) => {
    setAiHelpMessage(message);
    setTimeout(() => setAiHelpMessage(''), 5000);
  };

  if (!isOpen) return null;

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo formData={formData} onChange={handleInputChange} />;
      case 2:
        return <CompanyDetails formData={formData} onChange={handleInputChange} />;
      case 3:
        return <RolePreferences formData={formData} onChange={handleInputChange} />;
      case 4:
        return <FinancialInfo formData={formData} onChange={handleInputChange} />;
      case 5:
        return <ProjectGoals formData={formData} onChange={handleInputChange} />;
      case 6:
        return <LegalCompliance formData={formData} onChange={handleInputChange} />;
      case 7:
        return <BrandingMarketing formData={formData} onChange={handleInputChange} />;
      case 8:
        return <AdditionalPreferences formData={formData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-2xl p-8 text-center">
          <div className="text-[#FE02A1] text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Submission Successful!</h2>
          <p className="text-white/80 mb-6">Thank you for your submission. Our team will review your information and contact you soon.</p>
          <div className="flex items-center justify-center text-[#FE02A1]">
            <CheckCircle size={24} className="mr-2" />
            <span>Form submitted successfully</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-4xl bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Client Intake Form</h2>
              <p className="text-white/60">Step {currentStep} of {steps.length}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* AI Help Message */}
          {aiHelpMessage && (
            <div className="mb-4 p-3 bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-lg">
              <div className="flex items-center space-x-2 text-cyan-400">
                <span className="text-sm">🤖 AI Assistant:</span>
                <span className="text-white/80 text-sm">{aiHelpMessage}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Progress</span>
              <span className="text-sm text-white/60">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-2">
              <div 
                className="bg-[#FE02A1] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-[80px] ${
                  index < currentStep - 1 ? 'text-[#FE02A1]' : 
                  index === currentStep - 1 ? 'text-white' : 'text-white/40'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 transition-all duration-300 ${
                  index < currentStep - 1 ? 'bg-[#FE02A1] text-black' : 
                  index === currentStep - 1 ? 'bg-[#FE02A1] text-white' : 'bg-[rgba(255,255,255,0.1)]'
                }`}>
                  {index < currentStep - 1 ? '✓' : step.icon}
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="mb-6">
            {renderStep()}
          </form>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-[rgba(255,255,255,0.1)]">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !validateStep(currentStep)}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Form</span>
                      <CheckCircle size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Form Assistant */}
      <AIFormAssistant
        currentStep={currentStep}
        formData={formData}
        onSuggestion={handleAISuggestion}
        onHelp={handleAIHelp}
      />
    </>
  );
};

export default ClientIntakeForm;