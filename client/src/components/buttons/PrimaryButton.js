import React from 'react';

const PrimaryButton = ({ text, invert, type, className, onClick, fullWidth, loading, style, disabled }) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{
                width: fullWidth ? '100%' : 'auto',
                ...style,
            }}
            className={`px-8 py-3 rounded-md capitalize text-lg ${invert ? 'text-primary border-primary' : 'text-white border-primary bg-primary'} ${className}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            {!loading && text}
            {loading && (
                <div>Loading...</div>
            )}
        </button>
    );
};

export default PrimaryButton;
