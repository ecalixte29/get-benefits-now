import React from 'react'

const Button = ({
    text,
    classNames = '',
    fullWidth,
    onClick,
    loading,
    style,
    disabled,
    type
}) => {
    return (
        <button
            type={type ? type : 'button'}
            style={{ ...style }}
            className={`${disabled || loading ? 'cursor-not-allowed' : ''} ${type ==='SECONDARY' ? 'bg-secondary' : 'bg-blue-500'} focus:shadow-outline flex ${fullWidth ? 'w-full':'w-1/2'} items-center justify-center rounded px-6 py-4 font-bold uppercase text-white hover:text-white focus:outline-none ${classNames}`}
            onClick={onClick ? onClick : undefined}
            disabled={loading || disabled}
        >
            {!loading && text}
            {loading && <div>Loading...</div>}
        </button>
    )
}

export default Button
