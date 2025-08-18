import React from 'react';
import FormField from '../FormField';

interface LegalComplianceProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const LegalCompliance: React.FC<LegalComplianceProps> = ({ formData, onChange }) => {
  const legalRequirementsOptions = [
    { value: 'gdpr', label: 'GDPR Compliance' },
    { value: 'ccpa', label: 'CCPA Compliance' },
    { value: 'hipaa', label: 'HIPAA Compliance' },
    { value: 'sox', label: 'SOX Compliance' },
    { value: 'pci-dss', label: 'PCI DSS Compliance' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'none', label: 'No specific requirements' },
    { value: 'other', label: 'Other' },
  ];

  const complianceNeedsOptions = [
    { value: 'data-privacy', label: 'Data Privacy' },
    { value: 'security-audit', label: 'Security Audit' },
    { value: 'legal-review', label: 'Legal Review' },
    { value: 'compliance-reporting', label: 'Compliance Reporting' },
    { value: 'risk-assessment', label: 'Risk Assessment' },
    { value: 'none', label: 'No specific needs' },
    { value: 'other', label: 'Other' },
  ];

  const intellectualPropertyOptions = [
    { value: 'patents', label: 'Patents' },
    { value: 'trademarks', label: 'Trademarks' },
    { value: 'copyrights', label: 'Copyrights' },
    { value: 'trade-secrets', label: 'Trade Secrets' },
    { value: 'licensing', label: 'Licensing Agreements' },
    { value: 'none', label: 'No IP concerns' },
    { value: 'other', label: 'Other' },
  ];

  const handleMultiSelect = (field: string, value: string, checked: boolean) => {
    const currentValues = formData[field] || [];
    if (checked) {
      onChange(field, [...currentValues, value]);
    } else {
      onChange(field, currentValues.filter((v: string) => v !== value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Legal & Compliance</h3>
        <p className="text-white/60">Help us understand your legal and compliance requirements</p>
      </div>

      <div>
        <label className="block text-white font-montserrat mb-3">
          Legal Requirements
          <span className="text-[#FE02A1] ml-1">*</span>
        </label>
        <div className="space-y-2">
          {legalRequirementsOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.legalRequirements || []).includes(option.value)}
                onChange={(e) => handleMultiSelect('legalRequirements', option.value, e.target.checked)}
                className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
              />
              <span className="text-white/80">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-montserrat mb-3">
          Compliance Needs
        </label>
        <div className="space-y-2">
          {complianceNeedsOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.complianceNeeds || []).includes(option.value)}
                onChange={(e) => handleMultiSelect('complianceNeeds', option.value, e.target.checked)}
                className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
              />
              <span className="text-white/80">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-montserrat mb-3">
          Intellectual Property
        </label>
        <div className="space-y-2">
          {intellectualPropertyOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(formData.intellectualProperty || []).includes(option.value)}
                onChange={(e) => handleMultiSelect('intellectualProperty', option.value, e.target.checked)}
                className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#FE02A1] focus:ring-[#FE02A1]"
              />
              <span className="text-white/80">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-[rgba(254,2,161,0.1)] border border-[rgba(254,2,161,0.3)] rounded-lg p-4">
        <h4 className="text-[#FE02A1] font-semibold mb-2">⚖️ Legal Note</h4>
        <p className="text-white/80 text-sm">
          Understanding your legal and compliance requirements helps us ensure the solution meets all necessary standards and regulations.
        </p>
      </div>

      <div className="bg-[rgba(255,193,7,0.1)] border border-[rgba(255,193,7,0.3)] rounded-lg p-4">
        <h4 className="text-yellow-400 font-semibold mb-2">🔒 Security & Privacy</h4>
        <p className="text-white/80 text-sm">
          We prioritize security and privacy in all our solutions. Let us know if you have specific compliance requirements.
        </p>
      </div>
    </div>
  );
};

export default LegalCompliance;