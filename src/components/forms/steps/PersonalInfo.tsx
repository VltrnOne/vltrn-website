import React from 'react';
import FormField from '../FormField';

interface PersonalInfoProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Full Name"
        type="text"
        value={formData.fullName}
        onChange={(value) => onChange('fullName', value)}
        required
      />
      <FormField
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => onChange('email', value)}
        required
      />
      <FormField
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(value) => onChange('phone', value)}
        required
      />
      <FormField
        label="Date of Birth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(value) => onChange('dateOfBirth', value)}
        required
      />
    </div>
  );
};

export default PersonalInfo;