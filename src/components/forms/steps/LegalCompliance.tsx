import React from 'react';
import FormField from '../FormField';

interface LegalComplianceProps {
  formData: any;
  onChange: (field: string, value: string | boolean) => void;
}

const entityTypes = [
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'soleProprietorship', label: 'Sole Proprietorship' },
  { value: 'other', label: 'Other' },
];

const LegalCompliance: React.FC<LegalComplianceProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Business Entity Type"
        type="select"
        value={formData.businessEntityType}
        onChange={(value) => onChange('businessEntityType', value)}
        options={entityTypes}
        required
      />
      <FormField
        label="General Counsel Contact Information"
        type="textarea"
        value={formData.generalCounsel}
        onChange={(value) => onChange('generalCounsel', value)}
        placeholder="Name, email, and phone number of your legal representative..."
      />
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="ndaConsent"
          checked={formData.ndaConsent}
          onChange={(e) => onChange('ndaConsent', e.target.checked)}
          className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
        />
        <label htmlFor="ndaConsent" className="text-white">
          I agree to sign a Non-Disclosure Agreement if required
        </label>
      </div>
    </div>
  );
};

export default LegalCompliance;