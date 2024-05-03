import React from 'react';
import ActivityIndicator from '../shared/ActivityIndicator';

const SecondaryButton = ({ text, invert, type, classNames = '', onClick, loading, style, disabled }) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{...style}}
            className={`${(disabled || loading) ? 'cursor-not-allowed' : ''} flex items-center justify-center px-3 md:px-8 py-2 capitalize text-lg border ${invert ? 'text-secondary border-secondary' : 'text-white border-secondary bg-secondary'} ${classNames}`}
            onClick={onClick ? onClick : undefined}
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

export default SecondaryButton;
