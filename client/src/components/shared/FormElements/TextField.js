import PropTypes from 'prop-types'
import React from 'react'

const TextField = ({
    label,
    id,
    type,
    placeholder,
    pattern,
    value,
    error,
    wrapperClasses,
    innerClasses,
    onChange,
}) => {
    return (
        <div key={label} className={`mb-8 flex-1 ${wrapperClasses}`}>
            <label className="block text-base font-bold text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                pattern={pattern}
                onChange={onChange}
                className={`appearance-none shadow ${error ? 'border-red-600' : 'border-light'} focus:shadow-outline w-full rounded px-4 py-3 leading-tight text-gray-700 shadow-md focus:border-light focus:outline-none focus:ring-0 ${innerClasses}`}
            />
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    autoComplete: PropTypes.bool,
    error: PropTypes.bool.isRequired,
}

export default TextField
