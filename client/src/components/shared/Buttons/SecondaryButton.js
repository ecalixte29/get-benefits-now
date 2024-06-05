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
            'border-green-500 text-green-500 hover:bg-green-100': invert,
            'border-green-500 bg-green-500 text-white hover:bg-green-600':
                !invert,
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
