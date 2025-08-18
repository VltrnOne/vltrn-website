import React, { useState, useEffect } from 'react';
import { Bot, Lightbulb, CheckCircle, AlertCircle, ChevronRight, Sparkles, Zap } from 'lucide-react';

interface AIFormAssistantProps {
  currentStep: number;
  formData: any;
  onSuggestion: (field: string, value: any) => void;
  onHelp: (message: string) => void;
}

const AIFormAssistant: React.FC<AIFormAssistantProps> = ({ 
  currentStep, 
  formData, 
  onSuggestion, 
  onHelp 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stepTitles = [
    'Personal Information',
    'Company Details', 
    'Role & Preferences',
    'Financial Information',
    'Project Goals',
    'Legal & Compliance',
    'Branding & Marketing',
    'Additional Preferences'
  ];

  // AI Analysis of current form data
  useEffect(() => {
    analyzeFormData();
  }, [currentStep, formData]);

  const analyzeFormData = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const insights: string[] = [];
    const newSuggestions: any[] = [];
    
    // Step-specific AI insights
    switch (currentStep) {
      case 1: // Personal Information
        if (formData.fullName && formData.fullName.length < 3) {
          insights.push("Your name seems quite short. Make sure to include your full legal name.");
        }
        if (formData.email && !formData.email.includes('@')) {
          insights.push("Please ensure your email address is valid and complete.");
        }
        if (formData.phone && formData.phone.length < 10) {
          insights.push("Your phone number should include area code and be at least 10 digits.");
        }
        
        // Smart suggestions
        if (!formData.dateOfBirth) {
          newSuggestions.push({
            field: 'dateOfBirth',
            value: '1990-01-01',
            reason: 'Default date for quick completion'
          });
        }
        break;
        
      case 2: // Company Details
        if (formData.companyName && formData.companyName.length < 2) {
          insights.push("Company name should be at least 2 characters long.");
        }
        if (!formData.industry) {
          insights.push("Selecting an industry helps us tailor our services to your needs.");
        }
        
        // Industry suggestions based on company name
        if (formData.companyName) {
          const lowerName = formData.companyName.toLowerCase();
          if (lowerName.includes('tech') || lowerName.includes('software')) {
            newSuggestions.push({
              field: 'industry',
              value: 'technology',
              reason: 'Based on company name, likely technology industry'
            });
          } else if (lowerName.includes('health') || lowerName.includes('medical')) {
            newSuggestions.push({
              field: 'industry',
              value: 'healthcare',
              reason: 'Based on company name, likely healthcare industry'
            });
          }
        }
        break;
        
      case 3: // Role & Preferences
        if (!formData.role) {
          insights.push("Your role helps us understand your decision-making authority and needs.");
        }
        if (!formData.experience) {
          insights.push("Experience level helps us provide appropriate technical depth.");
        }
        
        // Role-based suggestions
        if (formData.role === 'founder' || formData.role === 'executive') {
          newSuggestions.push({
            field: 'preferredContact',
            value: 'video-call',
            reason: 'Executives often prefer video calls for important discussions'
          });
        }
        break;
        
      case 4: // Financial Information
        if (!formData.budget) {
          insights.push("Budget information helps us recommend the most cost-effective solutions.");
        }
        if (!formData.timeline) {
          insights.push("Timeline helps us plan resources and set realistic expectations.");
        }
        
        // Budget-based suggestions
        if (formData.budget === '<10k') {
          insights.push("For smaller budgets, consider starting with an MVP (Minimum Viable Product) approach.");
        } else if (formData.budget === '500k+') {
          insights.push("With this budget, you can consider enterprise-grade solutions and advanced features.");
        }
        break;
        
      case 5: // Project Goals
        if (!formData.objectives || formData.objectives.length < 20) {
          insights.push("Detailed objectives help us understand your vision and create better solutions.");
        }
        if (!formData.targetAudience) {
          insights.push("Knowing your target audience is crucial for user experience design.");
        }
        
        // Project type suggestions
        if (formData.projectType === 'ecommerce') {
          newSuggestions.push({
            field: 'successMetrics',
            value: 'Revenue increase, conversion rate improvement, user engagement',
            reason: 'Common e-commerce success metrics'
          });
        }
        break;
        
      case 6: // Legal & Compliance
        if (formData.legalRequirements && formData.legalRequirements.length === 0) {
          insights.push("Consider if you need GDPR, CCPA, or industry-specific compliance.");
        }
        
        // Compliance suggestions based on industry
        if (formData.industry === 'healthcare') {
          newSuggestions.push({
            field: 'legalRequirements',
            value: ['hipaa'],
            reason: 'Healthcare industry typically requires HIPAA compliance'
          });
        } else if (formData.industry === 'finance') {
          newSuggestions.push({
            field: 'legalRequirements',
            value: ['sox', 'pci-dss'],
            reason: 'Financial industry often requires SOX and PCI DSS compliance'
          });
        }
        break;
        
      case 7: // Branding & Marketing
        if (!formData.brandGuidelines) {
          insights.push("Brand guidelines help maintain consistency across all touchpoints.");
        }
        
        // Marketing suggestions
        if (formData.targetAudience === 'b2b') {
          newSuggestions.push({
            field: 'marketingStrategy',
            value: 'LinkedIn advertising, content marketing, trade shows, account-based marketing',
            reason: 'Effective B2B marketing strategies'
          });
        }
        break;
        
      case 8: // Additional Preferences
        if (!formData.preferredTechnologies || formData.preferredTechnologies.length === 0) {
          insights.push("Technology preferences help us align with your team's expertise.");
        }
        
        // Technology suggestions based on project type
        if (formData.projectType === 'web-app') {
          newSuggestions.push({
            field: 'preferredTechnologies',
            value: ['react', 'node', 'aws'],
            reason: 'Popular stack for modern web applications'
          });
        }
        break;
    }
    
    // General insights
    const completedFields = Object.values(formData).filter(value => 
      value && (typeof value === 'string' ? value.length > 0 : Array.isArray(value) ? value.length > 0 : true)
    ).length;
    
    const totalFields = Object.keys(formData).length;
    const completionRate = (completedFields / totalFields) * 100;
    
    if (completionRate < 50) {
      insights.push("You're making great progress! Consider completing more fields for better project planning.");
    } else if (completionRate > 80) {
      insights.push("Excellent! You've provided comprehensive information. We're ready to create your project plan.");
    }
    
    setAiInsights(insights);
    setSuggestions(newSuggestions);
    setIsAnalyzing(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    onSuggestion(suggestion.field, suggestion.value);
  };

  const handleHelpRequest = (topic: string) => {
    const helpMessages = {
      'personal': "Personal information helps us create a personalized experience and contact you appropriately.",
      'company': "Company details help us understand your business context and industry-specific needs.",
      'role': "Your role helps us tailor our communication and understand your decision-making authority.",
      'financial': "Budget and timeline information helps us recommend the most suitable solutions.",
      'goals': "Clear project goals ensure we build exactly what you need to achieve your objectives.",
      'legal': "Legal requirements ensure your solution meets all necessary compliance standards.",
      'branding': "Brand guidelines help maintain consistency and create a cohesive user experience.",
      'preferences': "Technology preferences help us align with your team's expertise and existing infrastructure."
    };
    
    onHelp(helpMessages[topic as keyof typeof helpMessages] || "I'm here to help! What specific question do you have?");
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <Bot size={20} />
          <span className="text-sm font-semibold">AI Help</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 w-80 bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-2xl shadow-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-[#FE02A1] rounded-full flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <h3 className="text-white font-semibold text-sm">AI Form Assistant</h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Current Step */}
      <div className="mb-4 p-3 bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles size={14} className="text-[#FE02A1]" />
          <span className="text-[#FE02A1] text-xs font-semibold">Current Step</span>
        </div>
        <p className="text-white text-sm font-medium">{stepTitles[currentStep - 1]}</p>
        <div className="mt-2 w-full bg-[rgba(255,255,255,0.1)] rounded-full h-1">
          <div 
            className="bg-[#FE02A1] h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold">AI Insights</span>
          </div>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-[rgba(255,193,7,0.1)] border border-[rgba(255,193,7,0.3)] rounded-lg">
                <AlertCircle size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-xs">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap size={14} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-semibold">Smart Suggestions</span>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-2 bg-[rgba(0,255,255,0.1)] hover:bg-[rgba(0,255,255,0.2)] border border-[rgba(0,255,255,0.3)] rounded-lg text-xs text-cyan-400 hover:text-white transition-all duration-200"
              >
                <div className="font-medium">{suggestion.reason}</div>
                <div className="text-white/60 mt-1">Click to apply</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Help */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-green-400 text-xs font-semibold">Quick Help</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['personal', 'company', 'role', 'financial', 'goals', 'legal', 'branding', 'preferences'].map((topic) => (
            <button
              key={topic}
              onClick={() => handleHelpRequest(topic)}
              className="p-2 bg-[rgba(76,175,80,0.1)] hover:bg-[rgba(76,175,80,0.2)] border border-[rgba(76,175,80,0.3)] rounded-lg text-xs text-green-400 hover:text-white transition-all duration-200 capitalize"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        {isAnalyzing ? (
          <div className="flex items-center justify-center space-x-2 text-[#FE02A1] text-xs">
            <div className="w-2 h-2 bg-[#FE02A1] rounded-full animate-bounce"></div>
            <span>AI analyzing your form...</span>
          </div>
        ) : (
          <div className="text-white/60 text-xs">
            AI Assistant • Powered by VLTRN
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFormAssistant;
