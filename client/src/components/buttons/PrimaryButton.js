import React from 'react';
import ActivityIndicator from '../shared/ActivityIndicator';

const PrimaryButton = ({
  text,
  invert,
  type = 'button',
  className = '',
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`px-8 py-3 rounded-md capitalize text-lg ${
        invert ? 'text-primary border-primary' : 'text-white border-primary bg-primary'
      } ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && (
        <ActivityIndicator
          height={20}
          width={20}
          spinnerClass={'text-secondary'}
          backgroundClass={'animate-spin mr-2'}
        />
      )}
      <p>{text}</p>
    </button>
  );
};

export default PrimaryButton;
