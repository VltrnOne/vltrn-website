import React from 'react';
import FormField from '../FormField';

interface AdditionalPreferencesProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const AdditionalPreferences: React.FC<AdditionalPreferencesProps> = ({ formData, onChange }) => {
  const technologyOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'react-native', label: 'React Native' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'Google Cloud' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'other', label: 'Other' },
  ];

  const handleMultiSelect = (field: string, value: string, checked: boolean) => {
    const currentValues = formData[field] || [];
    if (checked) {
      onChange(field, [...currentValues, value]);
    } else {
      onChange(field, currentValues.filter((v: string) => v !== value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Additional Preferences</h3>
        <p className="text-white/60">Any other details that will help us serve you better</p>
      </div>

      <FormField
        label="Special Requirements"
        type="textarea"
        value={formData.specialRequirements || ''}
        onChange={(value) => onChange('specialRequirements', value)}
        placeholder="Any special requirements, constraints, or unique needs for your project..."
      />

      <div>
        <label className="block text-white font-montserrat mb-3">
          Preferred Technologies
        </label>
        <div className="grid grid-cols-2 gap-2">
          {technologyOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.preferredTechnologies || []).includes(option.value)}
                onChange={(e) => handleMultiSelect('preferredTechnologies', option.value, e.target.checked)}
                className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
              />
              <span className="text-white/80 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <FormField
        label="Additional Notes"
        type="textarea"
        value={formData.additionalNotes || ''}
        onChange={(value) => onChange('additionalNotes', value)}
        placeholder="Any other information you'd like to share with our team..."
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">💻 Technology Preferences</h4>
        <p className="text-white/80 text-sm">
          While we can work with any technology stack, knowing your preferences helps us align with your team's expertise.
        </p>
      </div>

      <div className="bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-lg p-4">
        <h4 className="text-cyan-400 font-semibold mb-2">🎯 Final Details</h4>
        <p className="text-white/80 text-sm">
          This is your chance to share any additional context that will help us create the perfect solution for your needs.
        </p>
      </div>

      <div className="bg-[rgba(255,193,7,0.1)] border border-[rgba(255,193,7,0.3)] rounded-lg p-4">
        <h4 className="text-yellow-400 font-semibold mb-2">✨ Almost Done!</h4>
        <p className="text-white/80 text-sm">
          You're just one step away from submitting your project requirements. Review your information and click submit when ready.
        </p>
      </div>
    </div>
  );
};

export default AdditionalPreferences;