import React from 'react';

const FormSelect = ({
  id,
  label,
  options = [],
  value,
  onChange,
  required = false,
  error = '',
  className = '',
  disabled = false,
  placeholder = 'Select an option',
  labelClassName = '',
  selectClassName = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-gray-700 text-sm font-medium mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'} ${selectClassName}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;