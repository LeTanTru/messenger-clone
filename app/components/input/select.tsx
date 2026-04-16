'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ReactSelect from 'react-select';

type SelectProps = {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: { value: string; label: string }[];
  id: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
};

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  errors,
  id,
  register,
  required,
}: SelectProps) {
  return (
    <div className='z-100'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            input: (base) => ({
              ...base,
              cursor: 'pointer',
            }),
            dropdownIndicator: (base) => ({
              ...base,
              cursor: 'pointer',
            }),
            control: (base, state) => ({
              ...base,
              outline: 'none',
              boxShadow: 'none',
              borderColor: state.isFocused ? '#e5e7eb' : base.borderColor,
            }),
          }}
          classNames={{
            control: () => 'text-sm font-inter',
            input: () => '[&>input]:min-w-0! [&>input]:[grid-area:unset]!',
          }}
        />
      </div>
    </div>
  );
}
