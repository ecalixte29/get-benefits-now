import React from 'react';
import ActivityIndicator from '../shared/ActivityIndicator';

const SecondaryButton = ({ text, invert, type, classNames = '', onClick, fullWidth, loading, style, disabled }) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{
                width: fullWidth ? '100%' : 'auto',
                ...style,
            }}
            className={`${(disabled || loading) ? 'cursor-not-allowed' : ''} capitalize text-lg border ${invert ? 'text-secondary border-secondary' : 'text-white border-secondary bg-secondary'} ${classNames}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            <div className={`w-full flex flex-row items-center justify-center px-7 py-2 ${classNames}`}>
                {loading && (
                    <ActivityIndicator
                        height={20}
                        width={20}
                        spinnerClass={'text-secondary'}
                        backgroundClass={'animate-spin mr-2'}
                    />
                )}
                <p>{text}</p>
            </div>
        </button>
    );
};

export default SecondaryButton;
