import React from 'react';
import FormField from '../FormField';

interface ProjectGoalsProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const ProjectGoals: React.FC<ProjectGoalsProps> = ({ formData, onChange }) => {
  const projectTypeOptions = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'website', label: 'Website Development' },
    { value: 'api', label: 'API Development' },
    { value: 'ai-ml', label: 'AI/ML Integration' },
    { value: 'blockchain', label: 'Blockchain Solution' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'other', label: 'Other' },
  ];

  const targetAudienceOptions = [
    { value: 'b2b', label: 'Business to Business (B2B)' },
    { value: 'b2c', label: 'Business to Consumer (B2C)' },
    { value: 'b2b2c', label: 'Business to Business to Consumer (B2B2C)' },
    { value: 'internal', label: 'Internal Company Tool' },
    { value: 'government', label: 'Government/Public Sector' },
    { value: 'non-profit', label: 'Non-Profit Organization' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Project Goals</h3>
        <p className="text-white/60">Tell us about your project vision and objectives</p>
      </div>

      <FormField
        label="Project Type"
        type="select"
        value={formData.projectType || ''}
        onChange={(value) => onChange('projectType', value)}
        options={projectTypeOptions}
        required
      />

      <FormField
        label="Project Objectives"
        type="textarea"
        value={formData.objectives || ''}
        onChange={(value) => onChange('objectives', value)}
        placeholder="Describe your main project objectives and what you want to achieve..."
        required
      />

      <FormField
        label="Target Audience"
        type="select"
        value={formData.targetAudience || ''}
        onChange={(value) => onChange('targetAudience', value)}
        options={targetAudienceOptions}
        required
      />

      <FormField
        label="Success Metrics"
        type="textarea"
        value={formData.successMetrics || ''}
        onChange={(value) => onChange('successMetrics', value)}
        placeholder="How will you measure the success of this project? (e.g., user engagement, revenue increase, efficiency gains)..."
        required
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">🎯 Goal Setting Tips</h4>
        <p className="text-white/80 text-sm">
          Clear, measurable objectives help us design solutions that align with your business goals and deliver measurable results.
        </p>
      </div>

      <div className="bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-lg p-4">
        <h4 className="text-cyan-400 font-semibold mb-2">📊 Success Metrics</h4>
        <p className="text-white/80 text-sm">
          Defining success metrics upfront ensures we build features that directly contribute to your business objectives.
        </p>
      </div>
    </div>
  );
};

export default ProjectGoals;