import React from 'react';
import FormField from '../FormField';

interface RolePreferencesProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const RolePreferences: React.FC<RolePreferencesProps> = ({ formData, onChange }) => {
  const roleOptions = [
    { value: 'founder', label: 'Founder/CEO' },
    { value: 'executive', label: 'Executive/C-Level' },
    { value: 'director', label: 'Director/Manager' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'developer', label: 'Developer/Engineer' },
    { value: 'designer', label: 'Designer' },
    { value: 'marketing', label: 'Marketing Specialist' },
    { value: 'sales', label: 'Sales Representative' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'other', label: 'Other' },
  ];

  const experienceOptions = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '15+', label: '15+ years' },
  ];

  const preferredContactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'video-call', label: 'Video Call' },
    { value: 'in-person', label: 'In-Person Meeting' },
  ];

  const timezoneOptions = [
    { value: 'EST', label: 'Eastern Time (EST/EDT)' },
    { value: 'CST', label: 'Central Time (CST/CDT)' },
    { value: 'MST', label: 'Mountain Time (MST/MDT)' },
    { value: 'PST', label: 'Pacific Time (PST/PDT)' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
    { value: 'CET', label: 'Central European Time (CET)' },
    { value: 'JST', label: 'Japan Standard Time (JST)' },
    { value: 'AEST', label: 'Australian Eastern Time (AEST)' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Role & Preferences</h3>
        <p className="text-white/60">Help us understand your position and communication preferences</p>
      </div>

      <FormField
        label="Your Role"
        type="select"
        value={formData.role || ''}
        onChange={(value) => onChange('role', value)}
        options={roleOptions}
        required
      />

      <FormField
        label="Years of Experience"
        type="select"
        value={formData.experience || ''}
        onChange={(value) => onChange('experience', value)}
        options={experienceOptions}
        required
      />

      <FormField
        label="Preferred Contact Method"
        type="select"
        value={formData.preferredContact || ''}
        onChange={(value) => onChange('preferredContact', value)}
        options={preferredContactOptions}
        required
      />

      <FormField
        label="Timezone"
        type="select"
        value={formData.timezone || ''}
        onChange={(value) => onChange('timezone', value)}
        options={timezoneOptions}
        required
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">🌍 Timezone Note</h4>
        <p className="text-white/80 text-sm">
          Knowing your timezone helps us schedule meetings and calls at convenient times for you.
        </p>
      </div>
    </div>
  );
};

export default RolePreferences;