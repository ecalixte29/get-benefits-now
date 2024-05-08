import PropTypes from 'prop-types'

const TextField = ({
    label,
    type,
    value,
    error,
    onChange,
    id,
    required,
    wrapperClasses = '',
    innerClasses = '',
    ...additional_options
}) => {
    return (
        <div key={id} className={`relative mb-5 ${wrapperClasses}`}>
            <label
                htmlFor={id}
                className={`absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium ${error ? 'animate-fadein text-error' : 'text-dark'} capitalize`}
            >
                {error
                    ? `Please enter a valid ${label.toLowerCase()}`
                    : `${label} ${required ? '*' : ''}`}
            </label>
            <input
                key={id}
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                min={0}
                {...additional_options}
                className={`block w-full border border-light py-3 text-gray-900 shadow-sm outline-0 ring-0 focus:ring-0 ${error ? 'border-error' : 'border-light'} placeholder:text-gray-400 ${error ? 'focus:border-error' : 'focus:border-primary'} sm:text-sm sm:leading-6 ${innerClasses}`}
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
