import React from 'react';
import FormField from '../FormField';

interface ProjectGoalsProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const services = [
  { value: 'funding', label: 'Business Funding' },
  { value: 'expansion', label: 'Global Expansion' },
  { value: 'development', label: 'Product Development' },
  { value: 'analytics', label: 'Performance Analytics' },
  { value: 'network', label: 'Partner Network' },
  { value: 'financial', label: 'Financial Management' },
];

const ProjectGoals: React.FC<ProjectGoalsProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Services of Interest"
        type="select"
        value={formData.servicesOfInterest}
        onChange={(value) => onChange('servicesOfInterest', value)}
        options={services}
        required
      />
      <FormField
        label="Current Challenges"
        type="textarea"
        value={formData.challenges}
        onChange={(value) => onChange('challenges', value)}
        placeholder="Describe the challenges you're currently facing..."
        required
      />
      <FormField
        label="Short-Term Goals"
        type="textarea"
        value={formData.shortTermGoals}
        onChange={(value) => onChange('shortTermGoals', value)}
        placeholder="What are your goals for the next 6-12 months?"
        required
      />
      <FormField
        label="Long-Term Goals"
        type="textarea"
        value={formData.longTermGoals}
        onChange={(value) => onChange('longTermGoals', value)}
        placeholder="What are your goals for the next 2-5 years?"
        required
      />
    </div>
  );
};

export default ProjectGoals;