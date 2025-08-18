import React from 'react';
import FormField from '../FormField';

interface CompanyDetailsProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

const revenueRanges = [
  { value: '<1M', label: 'Less than $1M' },
  { value: '1M-10M', label: '$1M - $10M' },
  { value: '10M-50M', label: '$10M - $50M' },
  { value: '50M+', label: 'More than $50M' },
];

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Company Name"
        type="text"
        value={formData.companyName}
        onChange={(value) => onChange('companyName', value)}
        required
      />
      <FormField
        label="Industry"
        type="select"
        value={formData.industry}
        onChange={(value) => onChange('industry', value)}
        options={industries}
        required
      />
      <FormField
        label="Company Size (Number of Employees)"
        type="number"
        value={formData.companySize}
        onChange={(value) => onChange('companySize', value)}
        required
      />
      <FormField
        label="Revenue Range"
        type="select"
        value={formData.revenueRange}
        onChange={(value) => onChange('revenueRange', value)}
        options={revenueRanges}
        required
      />
      <FormField
        label="Website URL"
        type="url"
        value={formData.website}
        onChange={(value) => onChange('website', value)}
      />
      <FormField
        label="Headquarters Location"
        type="text"
        value={formData.location}
        onChange={(value) => onChange('location', value)}
        required
      />
      <FormField
        label="Business Registration Number"
        type="text"
        value={formData.registrationNumber}
        onChange={(value) => onChange('registrationNumber', value)}
      />
      <FormField
        label="Tax ID"
        type="text"
        value={formData.taxId}
        onChange={(value) => onChange('taxId', value)}
      />
    </div>
  );
};

export default CompanyDetails;