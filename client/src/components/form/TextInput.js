import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ label, error, onChange, id, required, width, ...additional_options }) => {
    return (
        <div key={id} className='relative mb-5'>
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
                className={`block ${width ? width : 'w-full'} rounded-md py-3 text-gray-900 shadow-sm outline-0 border-0 ${error ? 'ring-2 ring-error' : 'ring-1 ring-gray-300'} placeholder:text-gray-400 ${error ? 'focus:ring-2 focus:ring-error' : 'focus:ring-2 focus:ring-inset focus:ring-primary'} sm:text-sm sm:leading-6`}
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