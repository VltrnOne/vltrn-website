import React from 'react';
import FormField from '../FormField';

interface RolePreferencesProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const communicationChannels = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'slack', label: 'Slack' },
  { value: 'teams', label: 'Microsoft Teams' },
];

const timeZones = [
  { value: 'UTC-8', label: 'Pacific Time (PT)' },
  { value: 'UTC-5', label: 'Eastern Time (ET)' },
  { value: 'UTC+0', label: 'Greenwich Mean Time (GMT)' },
  { value: 'UTC+1', label: 'Central European Time (CET)' },
  { value: 'UTC+8', label: 'China Standard Time (CST)' },
];

const RolePreferences: React.FC<RolePreferencesProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Job Title"
        type="text"
        value={formData.jobTitle}
        onChange={(value) => onChange('jobTitle', value)}
        required
      />
      <FormField
        label="Department"
        type="text"
        value={formData.department}
        onChange={(value) => onChange('department', value)}
        required
      />
      <FormField
        label="Preferred Communication Channel"
        type="select"
        value={formData.communicationChannel}
        onChange={(value) => onChange('communicationChannel', value)}
        options={communicationChannels}
        required
      />
      <FormField
        label="Time Zone"
        type="select"
        value={formData.timeZone}
        onChange={(value) => onChange('timeZone', value)}
        options={timeZones}
        required
      />
    </div>
  );
};

export default RolePreferences;