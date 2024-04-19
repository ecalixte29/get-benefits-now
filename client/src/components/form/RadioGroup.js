import React, {useState} from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

const RadioGroup = ({ data, onChange, id, error, label, value, required, conditionalComponent }) => {
    const [showConditionalComponent, setShowConditionalComponent] = useState(false);

    return (
        <div key={id} className={`${label ? 'relative mb-5 rounded-md shadow-sm' : ''} `}>
            {label && (
                <label
                    htmlFor={label}
                    className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'text-error animate-fadein' : 'text-dark'} capitalize`}
                >
                    {error ? `Please select a valid ${label.toLowerCase()}` : `${label.toLowerCase()} ${required ? '*' : ''}`}
                </label>
            )}
            <ul className={`w-full mb-5 text-sm font-medium text-gray-600 bg-white border ${error ? 'ring-2 ring-error' : 'border-light'} rounded-lg`}>
                {data.map((item, index) => (
                    <RadioButton key={id  + index} id={id + index} label={item} value={value} setShowConditionalComponent={setShowConditionalComponent} onChange={onChange} isFirst={index === 0} />
                ))}
            </ul>
            { (showConditionalComponent && conditionalComponent) && (
                <div>
                    {conditionalComponent}
                </div>
            )}
        </div>
       
    );
};

RadioGroup.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onChange: PropTypes.func.isRequired
};

export default RadioGroup