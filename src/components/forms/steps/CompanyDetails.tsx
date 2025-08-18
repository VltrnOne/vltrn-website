import React from 'react';
import FormField from '../FormField';

interface CompanyDetailsProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ formData, onChange }) => {
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'non-profit', label: 'Non-Profit' },
    { value: 'other', label: 'Other' },
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Company Information</h3>
        <p className="text-white/60">Tell us about your organization</p>
      </div>

      <FormField
        label="Company Name"
        type="text"
        value={formData.companyName || ''}
        onChange={(value) => onChange('companyName', value)}
        placeholder="Enter your company name"
        required
      />

      <FormField
        label="Industry"
        type="select"
        value={formData.industry || ''}
        onChange={(value) => onChange('industry', value)}
        options={industryOptions}
        required
      />

      <FormField
        label="Company Size"
        type="select"
        value={formData.companySize || ''}
        onChange={(value) => onChange('companySize', value)}
        options={companySizeOptions}
        required
      />

      <FormField
        label="Website"
        type="text"
        value={formData.website || ''}
        onChange={(value) => onChange('website', value)}
        placeholder="https://yourcompany.com"
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">💡 Pro Tip</h4>
        <p className="text-white/80 text-sm">
          Providing accurate company information helps us tailor our services to your specific industry needs and company size.
        </p>
      </div>
    </div>
  );
};

export default CompanyDetails;