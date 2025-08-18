import React from 'react';
import FormField from '../FormField';

interface FinancialInfoProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const budgetRanges = [
  { value: '0-1M', label: '$0 - $1M' },
  { value: '1M-10M', label: '$1M - $10M' },
  { value: '10M-50M', label: '$10M - $50M' },
  { value: '50M+', label: '$50M+' },
];

const fundingStages = [
  { value: 'seed', label: 'Seed' },
  { value: 'seriesA', label: 'Series A' },
  { value: 'seriesB', label: 'Series B' },
  { value: 'seriesC', label: 'Series C' },
  { value: 'public', label: 'Public' },
];

const FinancialInfo: React.FC<FinancialInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Budget Range"
        type="select"
        value={formData.budget}
        onChange={(value) => onChange('budget', value)}
        options={budgetRanges}
        required
      />
      <FormField
        label="Current Funding Stage"
        type="select"
        value={formData.fundingStage}
        onChange={(value) => onChange('fundingStage', value)}
        options={fundingStages}
        required
      />
      <FormField
        label="Financial Goals"
        type="textarea"
        value={formData.financialGoals}
        onChange={(value) => onChange('financialGoals', value)}
        placeholder="Describe your financial goals and objectives..."
        required
      />
    </div>
  );
};

export default FinancialInfo;