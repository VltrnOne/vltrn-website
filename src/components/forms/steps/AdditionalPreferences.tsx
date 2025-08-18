import React from 'react';
import FormField from '../FormField';

interface AdditionalPreferencesProps {
  formData: any;
  onChange: (field: string, value: string | boolean) => void;
}

const AdditionalPreferences: React.FC<AdditionalPreferencesProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="How did you hear about VLTRN?"
        type="textarea"
        value={formData.referralSource}
        onChange={(value) => onChange('referralSource', value)}
        placeholder="Please let us know how you discovered our platform..."
        required
      />
      <FormField
        label="Additional Notes or Requirements"
        type="textarea"
        value={formData.notes}
        onChange={(value) => onChange('notes', value)}
        placeholder="Any other information you'd like to share with us..."
      />
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="privacyConsent"
          checked={formData.privacyConsent}
          onChange={(e) => onChange('privacyConsent', e.target.checked)}
          className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
        />
        <label htmlFor="privacyConsent" className="text-white">
          I agree to the privacy policy and terms of service
        </label>
      </div>
    </div>
  );
};

export default AdditionalPreferences;