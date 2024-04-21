import React from 'react';

const DisableButton = ({ text, invert, type, classNames, onClick, fullWidth, loading, style, disabled }) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{
                width: fullWidth ? '100%' : 'auto',
                ...style,
            }}
            className={`px-8 py-2 capitalize text-lg border ${invert ? 'text-gray-600 border-gray-600' : 'text-white border-gray-600 bg-gray-600'} ${classNames}`}
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

export default DisableButton;
