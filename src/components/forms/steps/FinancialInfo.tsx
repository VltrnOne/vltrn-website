import React from 'react';
import FormField from '../FormField';

interface FinancialInfoProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const FinancialInfo: React.FC<FinancialInfoProps> = ({ formData, onChange }) => {
  const budgetOptions = [
    { value: '<10k', label: 'Less than $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: '250k-500k', label: '$250,000 - $500,000' },
    { value: '500k+', label: '$500,000+' },
  ];

  const timelineOptions = [
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6-12months', label: '6-12 months' },
    { value: '1-2years', label: '1-2 years' },
    { value: '2+years', label: '2+ years' },
  ];

  const fundingSourceOptions = [
    { value: 'self-funded', label: 'Self-funded' },
    { value: 'investor', label: 'Investor funding' },
    { value: 'loan', label: 'Bank loan' },
    { value: 'grant', label: 'Grant' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Financial Information</h3>
        <p className="text-white/60">Help us understand your budget and timeline constraints</p>
      </div>

      <FormField
        label="Project Budget"
        type="select"
        value={formData.budget || ''}
        onChange={(value) => onChange('budget', value)}
        options={budgetOptions}
        required
      />

      <FormField
        label="Project Timeline"
        type="select"
        value={formData.timeline || ''}
        onChange={(value) => onChange('timeline', value)}
        options={timelineOptions}
        required
      />

      <FormField
        label="Funding Source"
        type="select"
        value={formData.fundingSource || ''}
        onChange={(value) => onChange('fundingSource', value)}
        options={fundingSourceOptions}
        required
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">💰 Budget Guidance</h4>
        <p className="text-white/80 text-sm">
          Understanding your budget helps us recommend the most cost-effective solutions while ensuring quality delivery.
        </p>
      </div>

      <div className="bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-lg p-4">
        <h4 className="text-cyan-400 font-semibold mb-2">⏰ Timeline Note</h4>
        <p className="text-white/80 text-sm">
          Realistic timelines help us plan resources and set proper expectations for project delivery.
        </p>
      </div>
    </div>
  );
};

export default FinancialInfo;