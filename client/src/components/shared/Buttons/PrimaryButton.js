import classNames from 'classnames'
import React from 'react'

const PrimaryButton = ({
    text,
    invert = false,
    type = 'button',
    classNames: additionalClasses = '',
    onClick,
    loading = false,
    style,
    disabled = false,
}) => {
    const buttonClasses = classNames(
        'flex items-center justify-center rounded border px-4 py-2 text-lg capitalize md:px-8',
        {
            'border-blue-600 text-blue-600 hover:bg-blue-100': invert,
            'border-blue-600 bg-blue-600 text-white hover:bg-blue-700': !invert,
            'cursor-not-allowed': disabled || loading,
        },
        additionalClasses
    )

    return (
        <button
            type={type}
            style={style}
            className={buttonClasses}
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading ? <div>Loading...</div> : text}
        </button>
    )
}

export default PrimaryButton
