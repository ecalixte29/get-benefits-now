import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import useForm from '../../../hooks/useForm'

const Select = ({ label, options, id, onChange, value, disableAutoUpdate }) => {
    const { returnFormField, inputChangeHandler, errorIds } = useForm()
    useEffect(() => {
        //sets a default value on first render
        if (!returnFormField(id) && !disableAutoUpdate)
            inputChangeHandler(id, options[0])
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div kev={id} className="relative mb-5">
            <label className="block text-base font-bold text-gray-700">
                {label}
            </label>
            <select
                className={`block w-full appearance-none bg-white ${errorIds.includes(id) ? 'border-red-600' : 'border-light'} focus:shadow-outline rounded px-4 py-3 pr-8 leading-tight shadow shadow-md ring-0 hover:border-gray-500 focus:border-light focus:outline-none focus:ring-0`}
                id="year"
                onChange={
                    disableAutoUpdate
                        ? onChange
                        : e => inputChangeHandler(id, e.target.value)
                }
                value={disableAutoUpdate ? value : returnFormField(id)}
            >
                {options.map((option, index) => (
                    <option key={option + index}>{option}</option>
                ))}
            </select>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default Select
