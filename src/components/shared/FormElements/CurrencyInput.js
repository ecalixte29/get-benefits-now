import React from 'react';
import PropTypes from 'prop-types';

const CurrencyInput = ({ label, error, id, required, onChange, value }) => {
    return (
        <div key={id} className="relative mb-5 shadow-sm">
            <label
                htmlFor={label}
                className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'text-error' : 'text-dark'} capitalize ${error ? 'animate-fadein' : ''}`}
            >
                {error ? `Please enter a valid ${label.toLowerCase()}` : `${label.toLowerCase()} ${required ? '*' : ''}`}
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                type="number"
                name={id}
                onChange={(e) => onChange(e.target.value)}
                className={`block w-full border-0 py-4 pl-7 pr-20 text-gray-900 ${error ? 'ring-2 ring-error' : 'ring-1 ring-gray-300'} placeholder:text-gray-400 ${error ? 'focus:ring-2 focus:ring-error' : 'focus:ring-2 focus:ring-inset focus:ring-primary'} sm:text-sm sm:leading-6`}
                placeholder="0.00"
                value={value}
            />
            <div className="absolute font-semibold inset-y-0 right-0 flex items-center h-full border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm">
                USD
            </div>
        </div>
    );
};

CurrencyInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired
};

export default CurrencyInput;
