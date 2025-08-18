import React, { useState } from 'react';
import { X } from 'lucide-react';
import PersonalInfo from './steps/PersonalInfo';
import CompanyDetails from './steps/CompanyDetails';
import RolePreferences from './steps/RolePreferences';
import FinancialInfo from './steps/FinancialInfo';
import ProjectGoals from './steps/ProjectGoals';
import LegalCompliance from './steps/LegalCompliance';
import BrandingMarketing from './steps/BrandingMarketing';
import AdditionalPreferences from './steps/AdditionalPreferences';

interface ClientIntakeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Personal Information' },
  { id: 2, title: 'Company Details' },
  { id: 3, title: 'Role & Preferences' },
  { id: 4, title: 'Financial Information' },
  { id: 5, title: 'Project Goals' },
  { id: 6, title: 'Legal & Compliance' },
  { id: 7, title: 'Branding & Marketing' },
  { id: 8, title: 'Additional Preferences' },
];

const ClientIntakeForm: React.FC<ClientIntakeFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // ... existing form data state
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
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
    console.log('Form submitted:', formData);
    onClose();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-4 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/60 hover:text-[#FE02A1] transition-colors duration-200"
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FE02A1] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-white/60">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Form Title */}
        <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4">
          {steps[currentStep - 1].title}
        </h2>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleBack}
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-[0_0_20px_#FE02A1]'
              } border border-[#FE02A1] text-white`}
              disabled={currentStep === 1}
            >
              Back
            </button>
            {currentStep === steps.length ? (
              <button
                type="submit"
                className="px-4 py-2 bg-[#FE02A1] rounded-lg text-white text-sm hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-[#FE02A1] rounded-lg text-white text-sm hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Next
              </button>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-white/60 text-center">
            By submitting this form, you agree to our{' '}
            <a href="#" className="text-[#FE02A1] hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#FE02A1] hover:underline">
              Terms of Service
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientIntakeForm;