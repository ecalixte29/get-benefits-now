import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ id , label, onChange, value, isFirst, setShowConditionalComponent }) => {

    return (
        <li className={`w-full border-b border-gray-200 ${isFirst ? 'rounded-t-lg' : ''}`}>
            <div className="flex items-center ps-3">
                <input
                    id={id}
                    type="radio"
                    value={label}
                    name={id}
                    checked={label === value}
                    onChange={() => {onChange(label); setShowConditionalComponent(label)}}
                    className="w-4 h-4 text-secondary bg-light border-light focus:ring-secondary"
                />
                <label htmlFor={id} className="w-full py-4 ms-2 text-sm font-normal capitalize">
                    {label}
                </label>
            </div>
        </li>
    );
};

RadioButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    isFirst: PropTypes.bool.isRequired
};

export default RadioButton