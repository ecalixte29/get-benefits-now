import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Assuming you're using Font Awesome icons

const StepButton = ({ text, invert, classNames, onClick, loading, style, disabled }) => {
    return (
        <button
            style={{
                // width: fullWidth ? '100%' : 'auto',
                ...style,
            }}
            className={`px-3 py-3 rounded-full capitalize text-lg border flex justify-center align-middle  ${invert ? 'text-secondary border-secondary' : 'text-white border-secondary bg-secondary'} ${classNames}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            {!loading && (
                <>
                    {invert ? (<FaArrowLeft />):(<FaArrowRight />) }
                    
                </>
            )}
            {loading && (
                <div>Loading...</div>
            )}
        </button>
    );
};

export default StepButton;
