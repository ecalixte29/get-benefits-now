import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ label, error, onChange, id, required, width, wrapperClasses = '', innerClasses = '', ...additional_options }) => {
    return (
        <div key={id} className={`relative mb-5 ${wrapperClasses}`}>
            <label
                htmlFor={id}
                className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'text-error animate-fadein' : 'text-dark'} capitalize`}
            >
                {error ? `Please enter a valid ${label.toLowerCase()}` : `${label} ${required ? '*' : ''}`}
            </label>
            <input
                key={id}
                id={id}
                name={id}
                onChange={(e) => onChange(e.target.value)}
                min={0}
                {...additional_options}
                className={`block ${width ? width : 'w-full'} border border-light py-3 text-gray-900 shadow-sm outline-0 ring-0 ${error ? 'border-error' : 'border-light'} placeholder:text-gray-400 ${error ? 'focus:border-error' : 'focus:border-primary'} sm:text-sm sm:leading-6 ${innerClasses}`}
            />
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    autoComplete: PropTypes.bool,
    error: PropTypes.bool.isRequired
};

export default TextInput;