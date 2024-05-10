import PropTypes from 'prop-types'
import { useState } from 'react'
import RadioButton from './RadioButton'

const RadioGroup = ({
    data,
    onChange,
    id,
    error,
    label,
    value,
    required,
    conditionalComponent,
}) => {
    const [showConditionalComponent, setShowConditionalComponent] =
        useState(false)
    return (
        <div key={id} className={`${label ? 'relative mb-5 shadow-sm' : ''} `}>
            {label && (
                <label
                    htmlFor={label}
                    className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'animate-fadein text-error' : 'text-dark'} capitalize`}
                >
                    {error
                        ? `Please select a valid ${label.toLowerCase()}`
                        : `${label.toLowerCase()} ${required ? '*' : ''}`}
                </label>
            )}
            <ul
                className={`mb-5 w-full border bg-white text-sm font-medium text-gray-600 ${error ? 'ring-2 ring-error' : 'border-light'}`}
            >
                {data.map((item, index) => (
                    <RadioButton
                        key={id + index}
                        id={id + index}
                        label={item}
                        value={value}
                        setShowConditionalComponent={
                            setShowConditionalComponent
                        }
                        onChange={onChange}
                        isFirst={index === 0}
                    />
                ))}
            </ul>
            {showConditionalComponent && conditionalComponent && (
                <div>{conditionalComponent}</div>
            )}
        </div>
    )
}

RadioGroup.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default RadioGroup
