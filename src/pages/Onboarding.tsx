import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../lib/authService';

const steps = [
  {
    title: 'Welcome',
    description: 'Get started with VLTRN platform setup',
  },
  {
    title: 'Company Information',
    description: 'Tell us about your business',
  },
  {
    title: 'Team Setup',
    description: 'Add your team members',
  },
  {
    title: 'Preferences',
    description: 'Customize your experience',
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  // Check if user is authenticated on component mount
  useEffect(() => {
    // First, check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to home with login modal trigger
      navigate('/', { state: { showLogin: true, from: '/onboarding' } });
      return;
    }
    
    // Then, check if user is verified
    const currentUser = getCurrentUser();
    if (currentUser && !currentUser.isVerified) {
      // Redirect to home with verification error
      navigate('/', { 
        state: { 
          showLogin: true, 
          verificationError: true,
          from: '/onboarding' 
        } 
      });
    }
  }, [navigate]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? 'bg-[#FE02A1] border-[#FE02A1]'
                      : 'border-white/30 bg-transparent'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white">{index + 1}</span>
                  )}
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs text-white/60">{step.description}</div>
                </div>
              </div>
            ))}
            {/* Progress Bar */}
            <div
              className="absolute top-5 h-[2px] bg-white/30 w-full -z-10"
              style={{
                background: `linear-gradient(to right, #FE02A1 ${
                  (currentStep / (steps.length - 1)) * 100
                }%, rgba(255,255,255,0.3) ${(currentStep / (steps.length - 1)) * 100}%)`,
              }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-8">
          <h2 className="text-3xl font-['Exo_2'] font-bold text-white mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-white/80 mb-8">{steps[currentStep].description}</p>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {/* Add your step-specific content here */}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-[0_0_20px_#FE02A1]'
              } border-2 border-[#FE02A1] text-white`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;