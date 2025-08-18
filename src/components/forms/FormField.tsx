import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
  options = [],
  placeholder = '',
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200"
            required={required}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200 min-h-[100px]"
            required={required}
            placeholder={placeholder}
          />
        );
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:border-[#FE02A1] transition-colors duration-200"
            required={required}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-white font-montserrat mb-2">
        {label}
        {required && <span className="text-[#FE02A1] ml-1">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;