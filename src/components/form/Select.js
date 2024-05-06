import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ label, options, id, onChange, value, error, required, additional_options }) => {
    return (
        <div kev={id} className='relative mb-5'>
            <label
                htmlFor={label}
                className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'text-error animate-fadein' : 'text-dark'} capitalize`}
            >
                {error ? `Please select a valid ${label.toLowerCase()}` : `${label.toLowerCase()} ${required ? '*' : ''}`}
            </label>
            <select
                id={label}
                name={id}
                onChange={(e) => onChange(e.target.value)}
                defaultValue={value}
                {...additional_options}
                className={`block w-full ${error ? 'outline-error' : 'outline-gray-300'} border-0 p-4 text-gray-900 shadow-sm outline outline-1 border-r-8 border-r-transparent placeholder:text-gray-400 focus:border-0 focus:ring-0 focus:z-10 focus:outline-2 focus-visible:outline-secondary focus:outline-secondary sm:text-sm sm:leading-6`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Select;
