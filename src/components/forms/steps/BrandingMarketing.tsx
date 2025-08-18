import React from 'react';
import FormField from '../FormField';

interface BrandingMarketingProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const BrandingMarketing: React.FC<BrandingMarketingProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Branding & Marketing</h3>
        <p className="text-white/60">Help us understand your brand vision and marketing strategy</p>
      </div>

      <FormField
        label="Brand Guidelines"
        type="textarea"
        value={formData.brandGuidelines || ''}
        onChange={(value) => onChange('brandGuidelines', value)}
        placeholder="Describe your brand guidelines, color schemes, typography, and visual identity..."
      />

      <FormField
        label="Marketing Strategy"
        type="textarea"
        value={formData.marketingStrategy || ''}
        onChange={(value) => onChange('marketingStrategy', value)}
        placeholder="What's your current marketing strategy? How do you plan to promote this project?"
      />

      <FormField
        label="Target Market"
        type="textarea"
        value={formData.targetMarket || ''}
        onChange={(value) => onChange('targetMarket', value)}
        placeholder="Describe your target market, customer personas, and market positioning..."
      />

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">🎨 Brand Consistency</h4>
        <p className="text-white/80 text-sm">
          Understanding your brand guidelines helps us maintain consistency across all touchpoints and create a cohesive user experience.
        </p>
      </div>

      <div className="bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-lg p-4">
        <h4 className="text-cyan-400 font-semibold mb-2">📈 Marketing Integration</h4>
        <p className="text-white/80 text-sm">
          We can integrate marketing tools and analytics to help you track performance and optimize your campaigns.
        </p>
      </div>

      <div className="bg-[rgba(255,193,7,0.1)] border border-[rgba(255,193,7,0.3)] rounded-lg p-4">
        <h4 className="text-yellow-400 font-semibold mb-2">💡 Optional Section</h4>
        <p className="text-white/80 text-sm">
          This section is optional but helps us create a more tailored solution that aligns with your brand and marketing goals.
        </p>
      </div>
    </div>
  );
};

export default BrandingMarketing;