import React from 'react'
import useForm from '../../../hooks/useForm'

const TextField = ({
    label,
    id,
    type,
    placeholder,
    pattern,
    disableAutoUpdate,
    value,
    wrapperClasses,
    innerClasses,
    onChange,
}) => {
    const { returnFormField, inputChangeHandler, errorIds } = useForm()
    return (
        <div key={label} className={`mb-8 flex-1 ${wrapperClasses}`}>
            <label className="block text-base font-bold text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={disableAutoUpdate ? value : (returnFormField(id) || '')}
                pattern={pattern || '^(?!\\s*$).+'}
                onChange={disableAutoUpdate ? onChange : (e) => inputChangeHandler(id, e.target.value)}
                className={`appearance-none shadow ${errorIds.includes(id) ? 'border-red-600' : 'border-light'} focus:shadow-outline w-full rounded px-4 py-3 leading-tight text-gray-700 shadow-md focus:border-light focus:outline-none focus:ring-0 ${innerClasses}`}
            />
        </div>
    )
}
export default TextField
