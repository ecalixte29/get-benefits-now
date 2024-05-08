import PropTypes from 'prop-types'

const RadioButton = ({
    id,
    label,
    onChange,
    value,
    isFirst,
    setShowConditionalComponent,
}) => {
    return (
        <li className={`w-full border-b border-gray-200`}>
            <div className="flex items-center ps-3">
                <input
                    id={id}
                    type="radio"
                    value={label}
                    name={id}
                    checked={label === value}
                    onChange={() => {
                        onChange(label)
                        setShowConditionalComponent(label)
                    }}
                    className="h-4 w-4 border-light bg-light text-secondary focus:ring-secondary"
                />
                <label
                    htmlFor={id}
                    className="ms-2 w-full py-4 text-sm font-normal capitalize"
                >
                    {label}
                </label>
            </div>
        </li>
    )
}

RadioButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    isFirst: PropTypes.bool.isRequired,
}

export default RadioButton
