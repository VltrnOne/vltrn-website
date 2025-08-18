import React from 'react';
import FormField from '../FormField';

interface BrandingMarketingProps {
  formData: any;
  onChange: (field: string, value: string | string[]) => void;
}

const marketingChannels = [
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'ppc', label: 'Paid Advertising' },
  { value: 'seo', label: 'Search Engine Optimization' },
  { value: 'content', label: 'Content Marketing' },
  { value: 'events', label: 'Events & Webinars' },
];

const BrandingMarketing: React.FC<BrandingMarketingProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Target Audience"
        type="textarea"
        value={formData.targetAudience}
        onChange={(value) => onChange('targetAudience', value)}
        placeholder="Describe your ideal customer profile..."
        required
      />
      <FormField
        label="Competitor Information"
        type="textarea"
        value={formData.competitors}
        onChange={(value) => onChange('competitors', value)}
        placeholder="List your main competitors and what sets you apart..."
        required
      />
      <FormField
        label="Marketing Channels"
        type="select"
        value={formData.marketingChannels}
        onChange={(value) => onChange('marketingChannels', value)}
        options={marketingChannels}
        required
      />
    </div>
  );
};

export default BrandingMarketing;